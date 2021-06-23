import cookie from 'js-cookie';

/**
 * 写入cookie
 * @param {*} obj 传入一个对象
 */
const setCookie = function (obj) {
  const arr = Object.entries(obj);
  for (let i = 0; i < arr.length; i += 1) {
    cookie.set(arr[i][0], arr[i][1]);
  }
};
/**
 * 获取cookie
 */
const getCookie = function () {
  return {
    email: cookie.get('email'),
    username: cookie.get('username'),
    appkey: cookie.get('appkey'),
    role: cookie.get('role'),
  };
};

/**
 * 删除cookie
 */
const removeCookie = function () {
  cookie.remove('email');
  cookie.remove('username');
  cookie.remove('role');
  cookie.remove('appkey');
};

export {
  setCookie,
  getCookie,
  removeCookie,
};
