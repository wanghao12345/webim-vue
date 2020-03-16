<template>
  <el-container>
    <div class="login">
      <div class="login-panel">
        <div class="title">
          <div :class="[{login_text:true}, {active:!isRegister}]" @click="changeType()">
            登录
          </div>
          <div :class="[{register_text:true}, {active:isRegister}]" @click="changeType()">
            注册
          </div>
        </div>
       <div :class="[{login_content:true},{hide:isRegister}]">
         <img width="116" height="116" round fit="cover" src="../../assets/logo1.png" />
         <van-cell-group>
           <van-field v-model="mobile" equired placeholder="手机号" />
           <van-field v-model="password" v-on:keyup.13="toLogin" type="password" placeholder="密码" required />
         </van-cell-group>
         <van-button type="default" @click="toLogin()" >登录</van-button>
       </div>
       <div :class="[{register_content:true},{hide:!isRegister}]">
          <van-cell-group>
            <van-field v-model="nickname" equired placeholder="手机号" />
            <van-field v-model="mobile" equired placeholder="昵称" />
            <!-- <span class="getCode" @click="toSmsCode()">获取验证码</span>
            <van-field v-model="sms_code" equired placeholder="手机验证码" /> -->
            <van-field v-model="password" v-on:keyup.13="toLogin" type="password" placeholder="密码" required />
          </van-cell-group>
          <van-button type="default" @click="toRegister()" >注册</van-button>
       </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import "./index.less";
import { mapState, mapActions } from "vuex";
export default{
	data(){
		return {
			mobile: "",
			password: "",
			nickname: "",
			sms_code: "",
		};
	},
	mounted: function(){
		const path = this.isRegister ? "/register" : "/login";

		if(path !== location.pathname){
			this.$router.push(path);
		}
	},
	components: {},
	computed: {
		isRegister(){
			return this.$store.state.login.isRegister;
		},
	},
	methods: {
		...mapActions(["onLogin", "setRegisterFlag", "onRegister", "onSmsCode"]),
		toLogin(){
			this.onLogin({
				 mobile: this.mobile,
				password: this.password
			});
		},
		toRegister(){
			this.onRegister({
				mobile: this.mobile.toLowerCase(),
				password: this.password,
				sms_code:this.sms_code,
				nickname: this.nickname.toLowerCase(),
			});
		},
    toSmsCode() {
      this.onSmsCode({
        mobile: this.mobile,
      })
    },
		changeType(){
			this.setRegisterFlag(!this.isRegister);
		}
	}
};
</script>
