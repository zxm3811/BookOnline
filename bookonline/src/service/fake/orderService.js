import store from "src/store";

export const FakeOrderService = {
  getOrder: () => {
    let orders = JSON.parse(JSON.stringify(store.getters['order/getAllOrders']))
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: orders
    })
  },

  saveOrder: (order) => {
    store.dispatch('order/saveOrder', order);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  updateOrder: (order) => {
    store.dispatch('order/updateOrder', order);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  deleteOrderById: (id) => {
    store.dispatch('order/deleteOrderById', id);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  getSellerOrder: () => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: null
    })
  },
}
