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
    if(currentUser.account) {
      return true;
    }
    return false;
  },
  logout: () => {
    store.dispatch("clearAll");
  },

  userlogin: async (params) => {
    let response = await login(params.account, params.password);
    if (!response || response.code != 0 || !response.data) {
      return;
    }

    store.dispatch("clearAll");

    store.dispatch('auth/saveToken', response.data);

    return AccountService.saveUserInfo(params.account, params.password);
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

    return AccountService.saveUserInfo(params.account, params.password);
  },

  getSellerBooks: async (id) => {
    return JSON.parse(JSON.stringify(store.getters['myBook/getAllMyBooks']));
  },

  saveUserInfo: async (account, password) => {
    let response = await getUserInfomation(account, password)
    if (!response || response.code != 0) {
      return;
    }
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
    return true;
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
const getUserInfomation = (account, password) => {
  if (API.getUserInfomation.useFake) {
    return FakeAccountService.getUserInfomation(account, password);
  } else {
    return request(API.getUserInfomation.url, {
      account,
      password
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
