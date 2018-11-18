export const FakeGoodsService = {
  purchase: (purchaseGoods) => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    });
  }
}