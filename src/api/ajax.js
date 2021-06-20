import axios from '@/axios';

/**
 * 登录
 * @param {*} email
 * @param {*} password
 */
const login = (email, password) => axios.post('/passport/login', { email, password });
const getCode = (email) => axios.post('/passport/getCode', { email });
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
