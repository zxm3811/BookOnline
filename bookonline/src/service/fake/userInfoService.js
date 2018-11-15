export const FakeUserInfoService = {
  userInfo: () => {
    return Promise.resolve({
      hr: 0,
      message: "成功",
      data: {
        name: "戴坤恩",
        email: "328472983@qq.com",
        phone: "13823540252",
        address: [
          {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
            default: "1"
          },
          {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
            default: "0"
          }
        ],
        accountno: "8374983274",
        balance: "0.00"
      }
    });
  }
}
