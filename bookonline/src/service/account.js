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
  },
  getUserBooks: {
    url: "/account/getUserBooks",
    useFake: true
  },
  putOnBook: {
    url: "/account/putOnBook",
    useFake: true
  },
  pullOffBook: {
    url: "/account/pullOffBook",
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
    if (!loginResponse || loginResponse.code != 0 || !loginResponse.data) {
      return;
    }

    store.dispatch("clearAll");

    store.dispatch('auth/saveToken', loginResponse.data);

    return AccountService.saveUserInfo(params.account);
  },

  userRegister: async (params) => {
    let response = await createUser(params.account, params.password);
    if (!response || response.code != 0) {
      return;
    }
    if (response.data == null) {
      return;
    }

    store.dispatch("clearAll");

    store.dispatch('auth/saveToken', response.data);

    return AccountService.saveUserInfo(params.account);
  },

  getSellerBooks: async (account) => {
    let response = await getUserBooks(account);
    if (!response || response.code != 0 || !response.data) {
      return;
    }
    return response.data;
  },

  saveUserInfo: async (account) => {
    let response = await getUserInfomation(account)
    if (!response || response.code != 0 || !response.data) {
      return;
    }
    store.dispatch('auth/saveUserState', response.data);
    return response;
  },

  getUserInfo: () => {
    return JSON.parse(JSON.stringify(store.getters["auth/userInfo"]));
  },

  updateUser: async (userInfo) => {
    let response = await updateUserInformation(userInfo);
    if (!response || response.code !== 0) {
      return;
    }
    store.commit('auth/UPDATE_USER_INFORMATION', userInfo);
    return response;
  },

  setUserPassword: (newPassword) => {
    store.commit('auth/SAVE_PASSWORD', newPassword);

  },

  putOnMyBook: async (form) => {
    let response = await putOnBook(form);
    if (!response || response.code != 0) {
      return;
    }
    return response;
  },

  pullOffMyBook: async (bookId) => {
    let response = await pullOffBook(bookId);
    if (!response || response.code != 0) {
      return;
    }
    return response;
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

/**
 * 更改用户信息
 */
const updateUserInformation = (userInfo) => {
  if (API.updateUserInformation.useFake) {
    return FakeAccountService.updateUserInformation(userInfo);
  }else {
    return request(API.updateUserInformation.url, {
      userInfo
    }, 'POST')
  }
};
const getUserBooks = (account) => {
  if (API.getUserBooks.useFake) {
    return FakeAccountService.getUserBooks(account);
  } else {
    return request(API.getUserBooks.url, {
      account
    }, 'GET')
  }
};

const putOnBook = (form) => {
  if (API.putOnBook.useFake) {
    return FakeAccountService.putOnBook(form);
  } else {
    return request(API.putOnBook.url, form, 'POST')
  }
};

const pullOffBook = (id) => {
  if (API.pullOffBook.useFake) {
    return FakeAccountService.pullOffBook(id);
  } else {
    return request(API.pullOffBook.url, {
      id: id
    }, 'POST')
  }
};
