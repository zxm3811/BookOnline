import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeGoodsService } from "./fake/goodsService.js";

const API = {
  purchaseBooks: {
    url: "/book/purchase",
    useFake: true
  }
}

export const GoodsService = {
  purchaseBooks: async (params) => {
    let response = await purchase(params);
    if (!response || response.hr != 0 || !response.data) {
      return;
    }
    return response.data;
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

const purchase = (params) => {
  if (API.purchase.useFake) {
    return FakeGoodsService.purchase();
  } else {
    return request(API.purchase.url, {
      params: params
    }, 'POST')
  }
}