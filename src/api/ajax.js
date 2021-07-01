import axios from '@/axios';

/**
 * 用户登录
 * @param {*} email
 * @param {*} password
 */
const login = (email, password) => axios.post('/passport/login', { email, password });
/**
 * 获取验证码
 * @param {*} email
 * @returns
 */
const getCode = (email) => axios.post('/passport/getCode', { email });
/**
 * 用户注册
 * @param {*} email
 * @param {*} password
 * @param {*} code
 * @param {*} username
 * @param {*} role
 * @returns
 */
const logon = (email, password, code, username, role) => axios.post('/passport/logon', {
  email,
  password,
  code,
  username,
  role,
});

export default {
  login,
  getCode,
  logon,
};
