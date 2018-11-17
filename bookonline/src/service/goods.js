import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeGoodsService } from "./fake/goodsService.js";

const API = {
  purchase: {
    url: "/goods/purchase",
    useFake: true
  }
}

export const GoodsService = {
  confirmPurchase: async (purchaseGoods) => {
    let response = await purchase(purchaseGoods);
    if (!response || response.hr != 0) {
      return;
    }
    return response;
  },

  saveGoods: (goods) => {
    store.dispatch('goods/saveGoods', goods);
  },

  updateGoods: (goods) => {
    store.dispatch('goods/updateGoods', goods);
  },

  deleteGoodsById: (id) => {
    store.dispatch('goods/deleteGoodsById', id);
  },

  getAllGoods: () => {
    return JSON.parse(JSON.stringify(store.getters['goods/getAllGoods']));
  },
}

const purchase = (purchaseGoods) => {
  if (API.purchase.useFake) {
    return FakeGoodsService.purchase();
  } else {
    return request(API.purchase.url, {
      purchaseGoods: purchaseGoods
    }, 'POST')
  }
}