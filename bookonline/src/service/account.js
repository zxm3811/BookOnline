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
  hasLogin: async () => {
    let allUser = AccountService.getAllUserInfo();
    for (let i = 0; i < allUser.length; i++) {
      if (allUser[i].login) {
        return true;
      }
    }
    return false;
  },

  logout: async () => {
    let userInfo = await AccountService.getCurrentUserInfo();
    userInfo.login = false;
    await AccountService.updateUser(userInfo);
  },

  userlogin: async (params) => {
    let response = await login(params.account, params.password);
    return response;
  },

  userRegister: async (params) => {
    let response = await createUser(params.account, params.password);
    return response;
  },

  getCurrentUserInfo: () => {
    return JSON.parse(JSON.stringify(store.getters["auth/getCurrentUserInfo"]));
  },

  getAllUserInfo: () => {
    return JSON.parse(JSON.stringify(store.getters["auth/getAllUserInfo"]));
  },

  updateUser: async (userInfo) => {
    let response = await updateUserInformation(userInfo);
    if (!response || response.code !== 0) {
      return;
    }
    store.commit('auth/UPDATE_USER_INFORMATION', userInfo);
    return response;
  },

  getSellerBooksByAccount: (account) => {
    return JSON.parse(JSON.stringify(store.getters['myBook/getMyBooksByAccount'](account)));
  },

  putOnMyBook: async (form) => {
    let response = await putOnBook(form);
    if (!response || response.code != 0) {
      return;
    }
    return response;
  },

  pullOffMyBook: async (bookId, account) => {
    let response = await pullOffBook(bookId, account);
    if (!response || response.code != 0) {
      return;
    }
    return response;
  }
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

const pullOffBook = (id, account) => {
  if (API.pullOffBook.useFake) {
    return FakeAccountService.pullOffBook(id, account);
  } else {
    return request(API.pullOffBook.url, {
      id,
      account
    }, 'POST')
  }
};
