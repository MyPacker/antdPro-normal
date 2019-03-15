/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { parse } from 'query-string';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
