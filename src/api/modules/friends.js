import axios from 'axios';
// 添加好友的时候 搜索用户
const searchFriend = (formData) => axios.post('http://47.111.225.202/Api/FriendsApi/searchUser', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
// 添加好友的时候
const addFriend = (formData) => axios.post('http://47.111.225.202/Api/FriendsApi/submitApply', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
// 获取新朋友列表
const newsList = (formData) => axios.post('http://47.111.225.202/Api/FriendsApi/getNewFriendList', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
// 朋友处理 同意 或者是拒绝
const friendsHandle = (formData) => axios.post('http://47.111.225.202/Api/FriendsApi/doWebHandleApply',formData,{
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
//好友列表
const friendsList = (formData) => axios.post('http://47.111.225.202/Api/FriendsApi/getUserFriendList', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default {
  searchFriend,
  addFriend,
  newsList,
  friendsHandle,
  friendsList
}
