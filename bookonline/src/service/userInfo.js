import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeUserInfoService } from './fake/userInfoService'

const API = {
  getUserInfo: {
    url: '',
    useFake: true
  }
}

export const UserInfoService = {
  getInfo: async () => {
    let response = await getUserInfo();
    if (!response || response.hr !== 0 || !response.data) {
      return;
    }

    return response.data;
  }
}

/**
 * 获取个人信息
 */
const getUserInfo = () => {
  if (API.getUserInfo.useFake) {
    return FakeUserInfoService.userInfo();
  } else {
    return request(API.getUserInfo.url, {}, 'GET');
  }
};
