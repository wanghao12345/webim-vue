import axios from 'axios';
// 注册
const register = (formData) => axios.post('http://47.111.225.202/Api/PublicApi/web_register', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// 登录
const login = (formData) => axios.post("http://47.111.225.202/Api/PublicApi/webLogin", formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 验证码
const smsCode = (formData) => axios.post("http://47.111.225.202/Api/PublicApi/webSmsCode", formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default {
  register,
  smsCode,
  login
}
