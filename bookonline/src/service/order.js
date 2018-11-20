import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeOrderService } from "./fake/orderService";

const API = {
  getOrder: {
    url: '/order/getOrder',
    useFake: true
  },
  getSellerOrder: {
    url: '/order/getSellerOrder',
    useFake: true
  },
  saveOrder: {
    url: '/order/saveOrder',
    useFake: true
  },
  updateOrder: {
    url: '/order/updateOrder',
    useFake: true
  },
  deleteOrderById: {
    url: '/order/deleteOrderById',
    useFake: true
  },
}

export const OrderService = {
  getOrderList: async () => {
    let response = await getOrder();
    if (!response || response.code !== 0 || !response.data) {
      return;
    }
    return response.data;
  },

  getSellerOrderList: async () => {
    let response = await getSellerOrder();
    if (!response || response.code !== 0 || !response.data) {
      return;
    }
    return response.data;
  },

  saveUserOrder: async (order) => {
    let response = await saveOrder(order);
    if (!response || response.code !== 0) {
      return;
    }
    return response;
  },

  updateUserOrder: async (order) => {
    let response = await updateOrder(order);
    if (!response || response.code !== 0) {
      return;
    }
    return response;
  },

  deleteUserOrderById: async (id) => {
    let response = await deleteOrderById(id);
    if (!response || response.code !== 0) {
      return;
    }
    return response;
  },
}

/**
 * 获取买家订单信息
 */
const getOrder = () => {
  if (API.getOrder.useFake) {
    return FakeOrderService.getOrder();
  } else {
    return request(API.getOrder.url, {}, 'POST');
  }
};

const getSellerOrder = () => {
  if (API.getSellerOrder.useFake) {
    return FakeOrderService.getSellerOrder();
  } else {
    return request(API.getSellerOrder.url, {}, 'POST');
  }
};

const saveOrder = (order) => {
  if (API.saveOrder.useFake) {
    return FakeOrderService.saveOrder(order);
  } else {
    return request(API.saveOrder.url, {
      order
    }, 'GET');
  }
};

const updateOrder = (order) => {
  if (API.updateOrder.useFake) {
    return FakeOrderService.updateOrder(order);
  } else {
    return request(API.updateOrder.url, {
      order
    }, 'GET');
  }
};

const deleteOrderById = (id) => {
  if (API.deleteOrderById.useFake) {
    return FakeOrderService.deleteOrderById(id);
  } else {
    return request(API.deleteOrderById.url, {
      id
    }, 'GET');
  }
};
