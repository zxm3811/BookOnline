import { BookService } from "src/service/book.js";

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

  getUserInfomation: (account, password) => {
    let id = parseInt((Math.random()*100000000));

    return Promise.resolve({
      code: 0,
      message: "成功",
      data: {
        id: id,
        account: account,
        password: password,
        name: "",
        email: "",
        phone: "",
        receiveAddress: {
          receiverName: "",
          receiverPhone: "",
          address: ""
        },
        balance: "10000.00",
      }
    });
  },
  updateUserInformation: (userInfo) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    })
  },

  putOnBook: (form) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    });
  },

  pullOffBook: (id) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    });
  },

  getUserBooks: async (id) => {
    let books = await BookService.getBooks();
    let result = [];
    books.forEach(book => {
      if(book.uid == id) {
        result.push(book);
      }
    });
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: result
    });
  }
};
