import {
	Message
} from "element-ui";
// 引入User的api 接口
import {
	Friends
} from "@/api/index.js"

const FriendModule = {
	state: {
		friendRequest: {
      isShow: false
    },
		blackList: {},
		newFriendList: []
	},
	mutations: {
		changeFriendRequestState(state, data) {
			state.friendRequest.isShow = data.isShow;
		},
		updateBlackList(state, blackList) {
			state.blackList = blackList;
		}
	},
	actions: {
		// 添加好友
		addfirend: async function(context, payload) {
			let username = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).mobile;
			const {
				id
			} = payload;
			//获取token
			let token = JSON.parse(localStorage.getItem("userInfo")).token;
			let params = {
				token,
				keyword: id,
			}
			let addPramas = {
				token
			}
			// 查询好友
			let {
				data
			} = await Friends.searchFriend(params);
			if (data.status == 1) {
				Vue.$message.success(data.info);
				Object.assign(addPramas, {
					msg: `我是${username}`,
					user_id: data.data.user_id,
					user_emchat_name: data.data.user_emchat_name,
				})
				// 添加好友
				let res = await Friends.addFriend(addPramas);
				if (res.data.status == 1) {
					Vue.$message.success(res.data.info);
				} else {
					Vue.$message.error(res.data.info);
				}
			} else {
				Vue.$message.error(data.info);
			}
		},
		// 获取新朋友列表
		getFriendsList: async function(context, payload) {
			//获取token
			let token = JSON.parse(localStorage.getItem("userInfo")).token;
			let {
				data
			} = await Friends.newsList({
				token: token
			});
      console.log('好友列表', data);
      if (data.status == 1) {
				// 将好友的数据添加到newFriendList 中
				data.data.forEach(function(item, index) {
					Vue.$set(context.state.newFriendList, index, item);
				})
				if (data.data.length == 0) {
					context.commit("changeFriendRequestState",{"isShow":false});
				} else {
					context.commit("changeFriendRequestState",{"isShow":true});
				}
			}
		},
		// 接受好友请求
		acceptSubscribe: async function(context, payload) {
			let {
				data
			} = await Friends.friendsHandle(payload);
			if (data.status == 1) {
				// 添加好友成功  重新获取新朋友列表
				context.dispatch("getFriendsList");
			}
		},

		// 拒绝好友请求
		declineSubscribe: async function(context, payload) {
			let {
				data
			} = await Friends.friendsHandle(payload);
			if (data.status == 1) {

				// 拒绝好友成功  重新获取新朋友列表
				context.dispatch("getFriendsList");
			}
			// const {
			//   id
			// } = payload;
			// WebIM.conn.unsubscribed({
			//   to: id,
			//   message: username + "拒绝您的好友请求"
			// });
		},
		// 添加黑名单-单人
		onAddBlack: function(context, payload) {
			let addName = payload.userId.name;
			WebIM.conn.addToBlackList({
				name: addName,
			});
			Vue.$store.dispatch("onGetContactUserList", {
				type: "addBlack",
				addName
			});
		},
		// 获取黑名单
		onGetFirendBlack: function(context, payload) {
			WebIM.conn.getBlacklist();
		},

		// 移除黑名单
		onRemoveBlack: function(context, payload) {
			let blackName = payload.removeName;
			WebIM.conn.removeFromBlackList({
				name: blackName,
				success: function() {
					console.log("Remove from black list success.");
				},
				error: function() {
					console.log("Remove from black list error.");
				}
			});
		},

		// 删除好友
		onDelteFirend: function(context, payload) {
			let deleteName = payload.userId.name;
			let option = {
				to: deleteName,
				success: function() { // 删除成功
					conn.unsubscribed({
						to: deleteName
					});
					console.log("删除好友成功");
				},
				error: function() { // 删除失败
				}
			}
			payload.callback();
			Vue.$router.push("/contact");
			WebIM.conn.removeRoster(option);
		}
	},
	getters: {
		addfirend(state) {
			return state.firendList.myFirendList;
		},
    friendRequest(state) {
      return state.friendRequest;
    }
	}

};
export default FriendModule;
