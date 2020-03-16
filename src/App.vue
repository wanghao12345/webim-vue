<template>
  <div id="app">
    <EleHead ref="bb" />
    <router-view @aa="aa" />
  </div>
</template>

<script>
  import WebIM from "./utils/WebIM";
  import {
    mapState,
    mapActions
  } from "vuex";
  import EleHead from "./components/electron/EleHead";
  export default {
    name: "App",
    components: {
      EleHead
    },
    beforeMount() {
      // const userInfo = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"));
      // if (userInfo) {
      //   const userName = userInfo.userId;
      //   const password = userInfo.password;
      //   var options = {
      //     apiUrl: WebIM.config.apiURL,
      //     user: userName,
      //     pwd: password,
      //     appKey: WebIM.config.appkey
      //   };
      //   WebIM.conn.open(options);
      // }
    },
    ///换头的颜色
    methods: {
      aa(val) {
        console.log(val);
        this.$refs.bb.change();
      }
    }
  };

</script>

<style>
  @import url('./utils/theme/base.css');

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .el-message-box {
    width: 50%;
    max-width: 400px;
  }

</style>
