const state = {
  goods: []
}

const getters = {
  getGoodsByAccount: state => (account) => {
    let result = [];
    if (!state.goods) {
      return result;
    }
    for (let i = 0; i < state.goods.length; i++) {
      if (state.goods[i].buyer == account) {
        result.push(state.goods[i])
      }
    }
    return result;
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
  }, goods) {
    commit("DELETE_GOODS_BY_ID", goods);
  },

  clearAllGoods({ commit }) {
    commit("CLEAR_ALL_GOODS")
  }
}

const mutations = {
  SAVE_GOODS: (state, goods) => {
    let i = 0;
    for (; i < state.goods.length; i++) {
      if(state.goods[i].id == goods.id && state.goods[i].buyer != goods.buyer) {
        state.goods.push(goods);
        break;
      } else if (state.goods[i].id == goods.id && state.goods[i].buyer == goods.buyer) {
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
      if (state.goods[i].id == goods.id && state.goods[i].buyer == goods.buyer) {
        state.goods[i].amount = goods.amount;
        break;
      }
    }
  },

  DELETE_GOODS_BY_ID: (state, goods) => {
    let i = 0;
    for (; i < state.goods.length; i++) {
      if (state.goods[i].id == goods.id && state.goods[i].buyer == goods.buyer) {
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