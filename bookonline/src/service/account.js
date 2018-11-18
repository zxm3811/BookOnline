import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeAccountService } from "./fake/accountService.js";

const API = {
  login: {
    url: "/account/login",
    useFake: true
  },
  createUser: {
    url: "/account/createUser",
    useFake: true
  },
  getUserInfomation: {
    url: "/account/getUserInfomation",
    useFake: true
  },
  updateUserInformation: {
    url: "/account/update",
    useFake: true
  }
}

export const AccountService = {
  hasLogin: () => {
    let currentUser = store.getters["auth/userInfo"];
    if(currentUser && currentUser.account) {
      return true;
    }
    return false;
  },
  logout: () => {
    store.dispatch("clearAll");
  },

  userlogin: async (params) => {
    let loginResponse = await login(params.account, params.password);
    if (!loginResponse || loginResponse.hr != 0 || !loginResponse.data) {
      return;
    }

    store.dispatch("clearAll");

    store.dispatch('auth/saveToken', loginResponse.data);

    return AccountService.saveUserInfo(params.account);
  },

  userRegister: async (params) => {
    let response = await createUser(params.account, params.password);
    if (!response || response.hr != 0) {
      return;
    }
    if (response.data == null) {
      return;
    }

    store.dispatch("clearAll");

    store.dispatch('auth/saveToken', response.data);

    return AccountService.saveUserInfo(params.account);
  },

  saveUserInfo: async (account) => {
    let response = await getUserInfomation(account)
    if (!response || response.hr != 0 || !response.data) {
      return response;
    }
    store.dispatch('auth/saveUserState', response.data);
    return response;
  },

  getUserInfo: () => {
    return JSON.parse(JSON.stringify(store.getters["auth/userInfo"]));
  },

  updateUser: async (name, email, phone, receiverName, receiverPhone, address) => {
    let response = await updateUserInformation();
    if (!response || response.hr !== 0) {
      return;
    }
    let params = {
      name,
      email,
      phone,
      receiverName,
      receiverPhone,
      address
    };
    store.commit('auth/UPDATE_USER_INFORMATION', params);
    console.log(AccountService.getUserInfo());
    return response;
  },

  setUserPassword: (newPassword) => {
    store.commit('auth/SAVE_PASSWORD', newPassword);
  },

  resetPassword: (account, password, oldPassword) => request('/account/resetPassword', {
    account,
    password,
    oldPassword
  }, 'POST'),
};

/**
 * 登录
 */
const login = (account, password) => {
  if (API.login.useFake) {
    return FakeAccountService.login(account, password);
  } else {
    return request(API.login.url, {
      account,
      password
    }, 'POST');
  }
};

/**
 * 注册用户
 */
const createUser = (account, password) => {
  if (API.createUser.useFake) {
    return FakeAccountService.createUser(account, password);
  } else {
    return request(API.createUser.url, {
      account,
      password
    }, 'POST');
  }
};

/**
 * 获取用户信息
 */
const getUserInfomation = (account) => {
  if (API.getUserInfomation.useFake) {
    return FakeAccountService.getUserInfomation(account);
  } else {
    return request(API.getUserInfomation.url, {
      account
    }, 'GET')
  }
};

const updateUserInformation = (userInfo) => {
  if (API.updateUserInformation.useFake) {
    return FakeAccountService.updateUserInfo();
  }else {
    return request(API.updateUserInformation.url, {
      account
    }, 'Post')
  }
};
