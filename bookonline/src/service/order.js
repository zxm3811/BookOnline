import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeOrderService } from "./fake/orderService";

const API = {
  getUserOrder: {
    url: '/order/getUserOrder',
    useFake: true
  },
  getSellerOrder: {
    url: '/order/getSellerOrder',
    useFake: true
  },
  confirmOrder: {
    url: '/order/confirmOrder',
    useFake: true
  },
  deliver: {
    url: '/order/deliver',
    useFake: true
  }
};

export const OrderService = {
  getUserOrder: async (account) => {
    let response = await getUserOrder(account);
    if (!response || response.code !== 0 || !response.data) {
      return;
    }

    return response.data;
  },

  getSellerOrder: async (account) => {
    let response = await getSellerOrder(account);
    if (!response || response.code !== 0 || !response.data) {
      return;
    }

    return response.data;
  },

  confirmSeletedOrder: async (orderNo) => {
    let response = await confirmOrder(orderNo);
    if (!response || response.code !== 0 || !response.data) {
      return;
    }
    console.log(orderNo);
    return response;
  },

  deliver: async (orderNo) => {
    let response = await deliver(orderNo);
    if (!response || response.code !== 0 || !response.data) {
      return;
    }
    console.log(orderNo);
    return response;
  }
};

/**
 * 获取买家订单信息
 */
const getUserOrder = (account) => {
  if (API.getUserOrder.useFake) {
    return FakeOrderService.order(account);
  } else {
    return request(API.getOrder.url, {account}, 'GET');
  }
};

/**
 * 获取卖家订单信息
 */
const getSellerOrder = (account) => {
  if (API.getSellerOrder.useFake) {
    return FakeOrderService.order(account);
  } else {
    return request(API.getSellerOrder.url, {account}, 'GET');
  }
};

/**
 * 确认送达
 */
const confirmOrder = (orderNo) => {
  if (API.confirmOrder.useFake) {
    return FakeOrderService.confirmOrder(orderNo);
  } else {
    return request(API.confirmOrder.url, {
      orderNo
    }, 'POST');
  }
};

/**
 * 通知发货
 */
const deliver = (orderNo) => {
  if (API.deliver.useFake) {
    return FakeOrderService.deliver(orderNo);
  } else {
    return request(API.deliver.url, {
      orderNo
    }, 'POST');
  }
};
