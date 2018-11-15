import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeOrderService } from "./fake/orderService";

const API = {
  getOrder: {
    url: '',
    useFake: true
  }
}

export const OrderService = {
  getOrderList: async () => {
    let response = await getOrder();
    if (!response || response.hr !== 0 || !response.data) {
      return;
    }

    return response.data;
  }
}

/**
 * 获取买家订单信息
 */
const getOrder = () => {
  if (API.getOrder.useFake) {
    return FakeOrderService.order();
  } else {
    return request(API.getOrder.url, {}, 'GET');
  }
};
