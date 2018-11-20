const state = {
  orders: []
}

const getters = {
  getAllOrders: state => {
    return state.orders;
  },
}

const actions = {
  saveOrder({
    commit
  }, order) {
    commit("SAVE_ORDER", order);
  },

  updateOrder({
    commit
  }, order) {
    commit("UPDATE_ORDER", order);
  },

  deleteOrderById({
    commit
  }, id) {
    commit("DELETE_ORDER_BY_ID", id);
  },

  clearAllOrders({ commit }) {
    commit("CLEAR_ALL_ORDERS")
  }
}

const mutations = {
  SAVE_ORDER: (state, order) => {
    let i = 0;
    for (; i < state.orders.length; i++) {
      if (state.orders[i].orderId == order.orderId) {
        state.orders.splice(i, 1, order);
        return;
      }
    }
    if (i == state.orders.length) {
      state.orders.push(order);
    }
  },

  UPDATE_ORDER: (state, order) => {
    let i = 0;
    for (; i < state.orders.length; i++) {
      if (state.orders[i].orderId == order.orderId) {
        state.orders.splice(i, 1, order);
        return;
      }
    }
  },

  DELETE_ORDER_BY_ID: (state, orderId) => {
    let i = 0;
    for (; i < state.orders.length; i++) {
      if (state.orders[i].orderId == orderId) {
        state.orders.splice(i, 1);
        return;
      }
    }
  },

  CLEAR_ALL_ORDERS: (state) => {
    state.orders = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}