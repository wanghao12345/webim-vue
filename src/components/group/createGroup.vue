<template>
  <a-modal
    title="创建群组"
      v-model="showCreateGroupModel"
      :footer="null"
    >
      <el-form :model="form" v-if="showCreateModel == true">
      <div>
        <el-input v-model="form.groName" placeholder="群组名称"></el-input>
      </div>
      <div class="groDesc">
        <el-input type="textarea" :rows="2" placeholder="简介" v-model="form.desc"></el-input>
      </div>
     <div class="groPub" style="display: none">
        <p>群组类型</p>
        <el-radio v-model="form.radio" label="1">私有群</el-radio>
        <el-radio v-model="form.radio" label="2">公有群</el-radio>
      </div>
      <div class="groPub" style="display: none">
        <p>加群权限</p>
        <el-radio v-model="form.radiopom" label="1">审批</el-radio>
        <el-radio v-model="form.radiopom" label="2">随便加</el-radio>
      </div>
      <div class="groPost" style="margin-top: 20px">
        <el-button type="success" @click="chenageCreateModel">下一步</el-button>
      </div>
    </el-form>
    <div v-if="showFriendListModel == true">
      <div class="groPub">
        <el-checkbox-group v-model="form.membersList">
          <li v-for="item in firendList" :key="item.uid" class="friendItem">
            <el-checkbox  :key="item.uid" :label="item.name" :value="item.uid" >
            </el-checkbox>
          </li>
        </el-checkbox-group>
      </div>
      <div>
        <div class="groBack" @click="chenageCreateModel">
          <i class="el-icon-back"></i>
          <i>返回</i>
        </div>
        <div class="groCreate">
          <el-button type="success" @click="postCreateGroup">创建群组</el-button>
        </div>
      </div>
    </div>
    </a-modal>
</template>
<script>
import "./group.less";
import { mapActions } from "vuex";
import axios from 'axios'
export default{
	data(){
		return {
			showCreateGroupModel: false,
			showCreateModel: true,
			showFriendListModel: false,

			form: {
				groName: "",
				desc: "",
				radio: "2",
				radiopom: "2",
				membersList: []
			}
		};
	},
	computed: {
		firendList(){
			return this.$store.state.chat.userList.contactUserList || [];
		}
	},
	methods: {
		...mapActions(["onCreateGroup"]),
		changeCreateModel(){
			this.$data.showCreateGroupModel = !this.$data.showCreateGroupModel;
			if(!this.$data.showCreateModel){
				this.chenageCreateModel();
			}
			this.$data.form.groName = "";
			this.$data.form.desc = "";
		},
		chenageCreateModel(){
			this.$data.showCreateModel = !this.$data.showCreateModel;
			this.$data.showFriendListModel = !this.$data.showFriendListModel;
		},
		postCreateGroup(){
		  console.log('创建群组')

      // axios.post('https://a1.easemob.com/easemob-demo/chatdemoui/chatgroups', {
      //   groupname: this.$data.form.groName ,
      //   desc: this.$data.form.desc,
      //   members: this.$data.form.membersList,
      //   public: true,
      //   approval: false,
      //   owner: "17384087448",
      //   invite_need_confirm: false
      // }).then(res => {
      //   console.log('创建群组', res);
      // })




			this.onCreateGroup({
				groupname: this.$data.form.groName ,
				desc: this.$data.form.desc,
				members: this.$data.form.membersList,
				approval: this.$data.form.radiopom != 2,
				pub: this.$data.form.radio == 2
			});
			this.changeCreateModel();
		}
	}
};
</script>
<style scoped>
</style>
