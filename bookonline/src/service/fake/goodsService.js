export const FakeGoodsService = {
  purchase: (params) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    });
  }
}