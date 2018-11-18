export const FakeAccountService = {
  login: (account, password) => {
    if(account === "admin" && password === "admin") {
      return Promise.resolve({
        code: 0,
        message: "成功",
        data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
      });
    } else {
      return Promise.resolve({
        code: -1,
        message: "帐号或密码错误",
        data: null
      });
    }
  },

  createUser: (account, password) => {
    if(account === "admin" && password === "admin") {
      return Promise.resolve({
        code: 0,
        message: "成功",
        data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
      });
    } else {
      return Promise.resolve({
        code: -1,
        message: "帐号已注册",
        data: null
      });
    }
  },

  getUserInfomation: (account) => {
    if(account === "admin") {
      return Promise.resolve({
        code: 0,
        message: "成功",
        data: {
          id: 100,
          account: "admin",
          password: "admin",
          name: "戴坤恩",
          email: "328472983@qq.com",
          phone: "13823540252",
          receiveAddress: {
            receiverName: "戴坤恩",
            receiverPhone: "13823540252",
            address: "江苏省 南京市 江宁区 秣陵街道 胜太西路169号南京航空航天大学"
          },
          bankNo: "8374983274",
          balance: "0.00",
          gender: "男",
          age: 20,
          avatar: "",
          userType: "系统管理员"
        }
      });
    } else {
      return Promise.resolve({
        code: -1,
        message: "帐号不存在",
        data: null
      });
    }
  },
  updateUserInfo: () => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
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

  getUserBooks: (account) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: 
      [
        {
          id: 1001,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1002,
          type: 1,
          name: "古典风格：海顿、莫扎特、贝多芬（修订版）",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/f61e/f61e759a60e7359245e347124f9404b7_0_0_0_0.jpg",
          author: "查尔斯·罗森 著; 杨燕迪 译",
          publishDate: "2016-01",
          binding: "精装",
          publishHouse: "华东师范大学出版社",
          format: 16,
          isbn: "9787567543546",
          sellingPrice: 103.50,
          sale: 7.5,
          fixedPrice: 138.00,
          appearance: "全新",
          address: "北京市丰台区",
          putOnDate: "2018-11-07",
          stock: 33
        },
        {
          id: 1003,
          type: 1,
          name: "乐迷闲话",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1004,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1005,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1006,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1007,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 1,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        },
        {
          id: 1001,
          type: 2,
          name: "乐迷闲话-雅众·辛丰年音乐文集",
          cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
          author: "辛丰年",
          publishDate: "2018-08",
          binding: "精装",
          publishHouse: "上海音乐出版社",
          format: 32,
          isbn: "9787552315707",
          sellingPrice: 39.00,
          sale: 8.0,
          fixedPrice: 49.00,
          appearance: "全新",
          uid: null,
          address: "北京市朝阳区",
          putOnDate: "2018-11-03",
          stock: 20
        }
      ]
    });
  }
};
