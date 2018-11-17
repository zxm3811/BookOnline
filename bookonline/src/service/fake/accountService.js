export const FakeAccountService = {
  login: (account, password) => {
    if(account === "admin" && password === "admin") {
      return Promise.resolve({
        hr: 0,
        message: "成功",
        data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
      });
    } else {
      return Promise.resolve({
        hr: -1,
        message: "帐号或密码错误",
        data: null
      });
    }
  },
  createUser: (account, password) => {
    if(account === "admin" && password === "admin") {
      return Promise.resolve({
        hr: 0,
        message: "成功",
        data: "eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJuaWNrIjoi5Y-25a2QMStwcGUiLCJhcHBUeXBlIjoyLCJuYW1lIjoicHhfeWV6aSIsImV4cCI6MTUzMzQzMjQwMCwianRpIjoiMTIwMTcxNSJ9.N-C7Gz_RCNyXEgdQZ1r6uDzPHSJwLI0qpjxBqVr4rug"
      });
    } else {
      return Promise.resolve({
        hr: -1,
        message: "帐号已注册",
        data: null
      });
    }
  },
  getUserInfomation: (account) => {
    if(account === "admin") {
      return Promise.resolve({
        hr: 0,
        message: "成功",
        data: {
          account: "admin",
          password: "admin",
          name: "戴坤恩",
          email: "328472983@qq.com",
          phone: "13823540252",
          receiveAddress: {
            receiverName: "戴坤恩",
            receiverPhone: "13823540252",
            address: "中国 江苏省 南京市 江宁区/镇 秣陵街道街道 胜太西路169号南京航空航天大学"
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
        hr: -1,
        message: "帐号不存在",
        data: null
      });
    }
  }
}
