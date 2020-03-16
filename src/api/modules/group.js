import axios from 'axios';

// 创建群组
const createGroup = (formData) => axios.post('http://47.111.225.202/Api/Group/post_update', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
// 群组列表
const groupList = (formData) => axios.post('http://47.111.225.202/Api/Group/webMyGroups', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
// 群组信息
const groupInfo = (formData) => axios.post('http://47.111.225.202/Api/Group/get_group_info', formData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
export default {
  createGroup,
  groupList,
  groupInfo
}
