import {
  Message
} from "element-ui";
// 引入User的api 接口
import {
  User
} from "@/api/index.js"

const Login = {
  state: {
    isRegister: false,
    username: "",
    password: "",
    token: "",
  },
  mutations: {
    setUserName(state, username) {
      state.username = username;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRegisterFlag(state, flag) {
      state.isRegister = flag;
    }
  },
  actions: {
    // 获取短信验证码
    onSmsCode: async (context, payload) => {
      let params = {
        mobile: payload.mobile,
        type: 1
      }
      let {
        data
      } = await User.smsCode(params);

      Vue.$message.info(data.info);
    },
    onLogin: async function(context, payload) {
      // context.commit("setUserName", payload.username);
      let params = {
        mobile: payload.mobile,
        user_pwd: payload.password
      }
      let {
        data
      } = await User.login(params);
      Vue.$message.info(data.info);
      if (data.status == 1) {
        let username = data.data.user_emchat_name;
        let password = data.data.user_emchat_password;
        //修改仓库中的用户名和密码
        context.commit('setUserName', username);
        context.commit('setPassword', password);
        context.commit('setToken', data.data.token);
        // 將信息存儲到本地 环信的
        localStorage.setItem("userInfo", JSON.stringify({
          userId: username,
          password: password,
          token: data.data.token
        }));
        // 将信息存储到本地 真实的
        localStorage.setItem("userData", JSON.stringify({
          mobile: payload.mobile,
          user_pwd: payload.password,
          token: data.data.token,
          user_logo: data.data.user_logo,
          user_name: data.data.nickname
        }))
      }
      var options = {
        apiUrl: WebIM.config.apiURL,
        user: context.state.username,
        pwd: context.state.password,
        appKey: WebIM.config.appkey
      };
      WebIM.conn.open(options);
    },
    onLogout: function(context) {
      context.commit("setUserName", "");
      localStorage.removeItem("userInfo", "");
      localStorage.removeItem("userData", "");
      WebIM.conn.close();
      // Vue.$router.push("/login");
    },
    onRegister: async function(context, payload) {
      const _this = this;
      let params = {
        nickname: payload.nickname,
        country_code: "86",
        mobile: payload.mobile,
        phone_code: payload.sms_code,
        user_pwd: payload.password
      }
      // 发送注册请求
      let {
        data
      } = await User.register(params);
      Vue.$message.info(data.info);
      if (data.status == 1) {
        let username = data.data.user_emchat_name;
        let password = data.data.user_emchat_password;
        //修改仓库中的用户名和密码
        context.commit('setUserName', username);
        context.commit('setPassword', password);
        // 將信息存儲到本地
        localStorage.setItem("userInfo", JSON.stringify({
          userId: username,
          password: password
        }));
        // 跳转到登录页面
        Vue.$router.push("/login");
      }
      // context.commit('setUserName', payload.username)
      // var options = {
      //   apiUrl: WebIM.config.apiURL,
      //   username: payload.username,
      //   password: payload.password,
      //   nickname: payload.nickname,
      //   appKey: WebIM.config.appkey,
      //   success: () => {
      //     Message({
      //       type: "success",
      //       message: "注册成功"
      //     });
      //     context.commit("setRegisterFlag", false);
      //   },
      //   error: (err) => {
      //     if (JSON.parse(err.data).error == "duplicate_unique_property_exists") {
      //       Message.error("用户已存在！")
      //     } else if (JSON.parse(err.data).error == "illegal_argument") {
      //       Message.error("用户名不合法！")
      //     } else if (JSON.parse(err.data).error == "unauthorized") {
      //       Message.error("注册失败，无权限！")
      //     } else if (JSON.parse(err.data).error == "resource_limited") {
      //       Message.error("您的App用户注册数量已达上限,请升级至企业版！")
      //     }
      //   }
      // };
      // WebIM.conn.registerUser(options);
    },
    setRegisterFlag: function(context, flag) {
      const path = flag ? "/register" : "/login";
      Vue.$router.push(path);
      context.commit("setRegisterFlag", flag);
    }


  },
  getters: {

  }
};
export default Login;
