import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import { Login } from 'ant-design-pro';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ userLogin, loading }) => ({
  userLogin,
  submitting: loading.effects['userLogin/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'userLogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userLogin/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName
              name="userName"
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码: ant.design"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage('验证码错误')}
            <Mobile
              name="mobile"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="秒"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <span>自动登录</span>
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <span>忘记密码</span>
            </a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          <div className={styles.other}>
            <span>其他登录方式</span>
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
