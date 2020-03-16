<template>
<!--  <div>
    <el-dialog title="请求添加好友">
      <div  v-for="(item,index) in newFriendList" :key= "index" style="display: flex; justify-content: space-around;margin-bottom: 30px;">
        &lt;!&ndash; <img :src="this.$store.state.friendModule.newFriendList[0].user_logo_thumb" alt=""> &ndash;&gt;
        &lt;!&ndash; {{this.isShowFriendRequest}} &ndash;&gt;
        <span>{{item.msg}}</span>
        <div>
          <el-button @click="refusedClick(index)">拒绝</el-button>
          <el-button type="primary" @click="acceptSubmit(index)">接受</el-button>
        </div>
      </div>
    </el-dialog>
  </div>-->

  <!--<el-dialog
    title="请求添加好友"
    :visible.sync="isShowFriendRequest"
    width="30%"
    :before-close="handleClose">
    <div  v-for="(item,index) in newFriendList" :key= "index" style="display: flex; justify-content: space-around;margin-bottom: 30px;">
      <span>{{item.msg}}</span>
    </div>
    <span slot="footer" class="dialog-footer">
     <el-button @click="refusedClick(index)">拒绝</el-button>
        <el-button type="primary" @click="acceptSubmit(index)">接受</el-button>
    </span>
  </el-dialog>-->

  <a-modal
    title="请求添加好友"
    v-model="isShowFriendRequest"
    @ok="acceptSubmit(0)"
    @cancel="refusedClick(0)"
  >
    <div style="display: flex; justify-content: space-around;margin-bottom: 30px;">
      <span>{{newFriendList[0].msg}}</span>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="refusedClick(0)">拒绝</el-button>
      <el-button type="primary" @click="acceptSubmit(0)">接受</el-button>
    </div>
  </a-modal>


</template>

<script>
	import {
		mapActions,
		mapGetters,
    mapState
	} from "vuex";
	import Vue from "vue";

	export default {
		data() {
			return {
				showRequestFriendModal: this.$store.state.friendModule.friendRequest.isShow
			};
		},
		created() {
			this.getNewSumit();
		},
		computed: {
			isShowFriendRequest() {
        console.log(this.$store);

        return this.$store.state.friendModule.friendRequest.isShow;
			},
			newFriendList(){
				return this.$store.state.friendModule.newFriendList
			}
		},
		methods: {
			...mapActions(["acceptSubscribe", "declineSubscribe", "getFriendsList"]),
			changeModal() {
				this.$store.state.friendModule.friendRequest.isShow = !this.$store.state
					.friendModule.friendRequest.isShow;
			},
			// 获取新朋友列表
			getNewSumit() {
				console.log(this);
				console.log(Vue);
				this.getFriendsList();
			},
			acceptSubmit(index) {
				// 从localstorage中拿出token
				let token = JSON.parse(localStorage.getItem("userData")).token;
				// console.log(token);
				let id = "";
				let user_id;
				let user_emchat_name;
				// 从仓库中拿出数据
				this.$store.state.friendModule.newFriendList.forEach(function(item,i){
					if(index == i){
						id = Number(item.id);
						user_id = item.user_id;
						user_emchat_name = item.user_emchat_name;
					}
				})
				// 添加好友的参数
				let params = {
					token,
					state: 1,
					id,
					user_id,
					user_emchat_name
				}
				// 调用添加好友的action 方法
				this.acceptSubscribe(params);
			},
			refusedClick(index) {
				// 从localstorage中拿出token
				let token = JSON.parse(localStorage.getItem("userData")).token;
				let id ;
				let user_id;
				let user_emchat_name;
				// 	console.log(this.$store.state.friendModule.newFriendList);
				// 从仓库中拿出数据
				this.$store.state.friendModule.newFriendList.forEach(function(item,i){
					if(index == i){
						id = Number(item.id);
						user_id = item.user_id;
						user_emchat_name = item.user_emchat_name;
					}
				})
				// 添加好友的参数
				let params = {
					token,
					state: 2,
					id,
					user_id,
					user_emchat_name
				}
				// 调用 拒绝好友的action 方法
				this.declineSubscribe(params);
				//关闭弹出框
				// this.changeModal();
			}
		}
	};
</script>
