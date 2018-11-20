import { BookService } from "src/service/book.js";
import { AccountService } from "src/service/account";
import store from "src/store"

export const FakeAccountService = {
  login: (account, password) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
    });
  },

  createUser: (account, password) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
    });
  },

  getUserInfomation: async (account, password) => {
    let userInfo = await AccountService.getUserInfo();
    userInfo.account = account;
    userInfo.password = password;
    store.dispatch('auth/saveUserState', userInfo);
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

  pullOffBook: (id) => {
    store.dispatch('myBook/deleteMyBookById', id);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    });
  }
};
