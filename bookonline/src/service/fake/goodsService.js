import { AccountService } from "src/service/account.js";
import { OrderService } from "src/service/order.js";

export const FakeGoodsService = {
  purchase: async (purchaseGoods) => {
    let userInfo = await AccountService.getCurrentUserInfo();
    if(userInfo.balance < purchaseGoods.totalPrice) {
      return Promise.resolve({
        code: -1,
        message: "余额不足",
        data: ""
      });
    }
    userInfo.balance -= purchaseGoods.totalPrice;
    AccountService.updateUser(userInfo);
    OrderService.saveUserOrder(purchaseGoods);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    });
  }
}