import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/advanced-form/forms', {
    method: 'POST',
    data: params,
  });
}
