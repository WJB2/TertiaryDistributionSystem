/**
 * 判定用户是否已经登入
 */
function isAuthenticated() {
  return localStorage.getItem('AUTHENTICATED');
}

export default {
  isAuthenticated,
};
