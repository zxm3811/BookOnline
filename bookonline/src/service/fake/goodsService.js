export const FakeGoodsService = {
  purchase: (params) => {
    return Promise.resolve({
      hr: 0,
      message: "成功",
      data: null
    });
  }
}