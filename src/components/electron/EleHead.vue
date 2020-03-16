<template>
  <div id="mytitle" :style="{'background':style?'#00C300':'#434648'}">
    <span style=" position: absolute;
    left: 0px;
    margin-top: 12px;
    color: white;
    margin-left: 30px;
    font-size: 21px;">晴聊</span>
    <div class="minbtn" v-on:click="click('min')">
      <a-icon type="minus" style="color:white; font-size: 21px;" />
    </div>
    <div class="closebtn" v-on:click="click('close')">
      <a-icon type="close" style="color:white; font-size: 21px;" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "EleHead",
    components: {},
    data() {
      return {
        style: true,
        ipcRenderer: ""
      };
    },
    created() {
      if (window.require) {
        this.ipcRenderer = window.require("electron").ipcRenderer;
        console.log("33");
        console.log(this.ipcRenderer);
      }
      console.log("22");
      // if (localStorage.getItem("userInfo") != null) {
      //   this.style = false;
      // }
    },
    computed: {},
    methods: {
      change() {
        console.log("进来了");
         this.style = false;
      },
      click: function (type) {
        if (window.require) {
          console.log("8888");
          console.log(type);
          this.ipcRenderer.send(type);
        }
      }
    }
  };

</script>

<style>
  #mytitle {
    width: 100%;
    height: 55px;
    background-color: #00C300;
    -webkit-app-region: drag;
  }

  .minbtn {
    position: absolute;
    top: 15px;
    margin: auto 0;
    -webkit-app-region: no-drag;
    right: 56px;
    cursor: pointer;
  }

  .closebtn {
    position: absolute;
    top: 15px;
    margin: auto 0;
    -webkit-app-region: no-drag;
    right: 20px;
    cursor: pointer;
  }

</style>
