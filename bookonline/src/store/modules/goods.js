const state = {
  goods: []
}

const getters = {
  getAllGoods: state => {
    return state.goods;
  },
}

const actions = {
  saveGoods({
    commit
  }, goods) {
    commit("SAVE_GOODS", goods);
  },

  updateGoods({
    commit
  }, goods) {
    commit("UPDATE_GOODS", goods);
  },

  deleteGoodsById({
    commit
  }, id) {
    commit("DELETE_GOODS_BY_ID", id);
  },

  clearAllGoods({ commit }) {
    commit("CLEAR_ALL_GOODS")
  }
}

const mutations = {
  SAVE_GOODS: (state, goods) => {
    let i = 0;
    for (; i < state.goods.length; i++) {
      if (state.goods[i].id == goods.id) {
        state.goods[i].amount += goods.amount;
        break;
      }
    }
    if (i == state.goods.length) {
      state.goods.push(goods);
    }
  },

  UPDATE_GOODS: (state, goods) => {
    let i = 0;
    for (; i < state.goods.length; i++) {
      if (state.goods[i].id == goods.id) {
        state.goods[i].amount = goods.amount;
        break;
      }
    }
  },

  DELETE_GOODS_BY_ID: (state, id) => {
    let i = 0;
    for (; i < state.goods.length; i++) {
      if (state.goods[i].id == id) {
        state.goods.splice(i, 1);
        break;
      }
    }
  },

  CLEAR_ALL_GOODS: (state) => {
    state.goods = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}