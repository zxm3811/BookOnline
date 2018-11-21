import { AccountService } from "src/service/account";
import store from "src/store"

export const FakeAccountService = {
  login: (account, password) => {
    let allUser = AccountService.getAllUserInfo();
    if (!allUser || !allUser.length) {
      return Promise.resolve({
        code: -1,
        message: "当前账号未注册，请先注册",
        data: ""
      });
    }
    let i = 0;
    for (; i < allUser.length; i++) {
      if (allUser[i].account == account) {
        if (allUser[i].password == password) {
          allUser[i].login = true;
          store.commit('auth/UPDATE_USER_INFORMATION', allUser[i]);
          return Promise.resolve({
            code: 0,
            message: "成功",
            data: ""
          });
        } else {
          return Promise.resolve({
            code: -1,
            message: "密码错误",
            data: ""
          });
        }
      }
    }
    if (i == allUser.length) {
      return Promise.resolve({
        code: -1,
        message: "当前账号未注册，请先注册",
        data: ""
      });
    }
  },

  createUser: (account, password) => {
    let allUser = AccountService.getAllUserInfo();
    let i = 0;
    for (; i < allUser.length; i++) {
      if (allUser[i].account == account) {
        return Promise.resolve({
          code: -1,
          message: "当前账号已注册",
          data: ""
        });
      }
    }
    let userInfo = {
      account: account,
      password: password,
      name: '',
      email: '',
      phone: '',
      receiveAddress: {
        receiverName: '',
        receiverPhone: '',
        address: ''
      },
      balance: 10000,
      login: true
    };
    store.dispatch('auth/addUser', userInfo);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    });
  },

  updateUserInformation: (userInfo) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  putOnBook: (book) => {
    store.dispatch('myBook/saveMyBook', book);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    });
  },

  pullOffBook: (id, account) => {
    store.dispatch('myBook/deleteMyBookById', {
      id,
      account
    });
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    });
  }
};
