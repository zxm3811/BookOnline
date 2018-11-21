const state = {
  userInfo: []
  // userInfo: {
  //   account: '',
  //   password: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   receiveAddress: {
  //     receiverName: '',
  //     receiverPhone: '',
  //     address: ''
  //   },
  //   balance: 10000,
  //   login: false
  // }
}
const getters = {
  getCurrentUserInfo: state => {
    for (let i = 0; i < state.userInfo.length; i++) {
      if (state.userInfo[i].login) {
        return state.userInfo[i];
      }
    }
    return null;
  },
  getAllUserInfo: state => {
    return state.userInfo
  }
}

const actions = {
  addUser({
    commit
  }, userInfo) {
    commit("ADD_USER", userInfo);
  },

  clearAllUserState({
    commit
  }) {
    commit("CLEAR_ALL_USER_STATE")
  }
}

const mutations = {
  ADD_USER: (state, userInfo) => {
    state.userInfo.push(userInfo);
  },

  UPDATE_USER_INFORMATION: (state, userInfo) => {
    for (let i = 0; i < state.userInfo.length; i++) {
      if (state.userInfo[i].account == userInfo.account) {
        state.userInfo.splice(i, 1, userInfo);
      }
    }
  },

  CLEAR_ALL_USER_STATE: (state) => {
    state.userInfo.account = ''
    state.userInfo.password = ''
    state.userInfo.name = ''
    state.userInfo.email = ''
    state.userInfo.phone = ''
    state.userInfo.receiveAddress.receiverName = ''
    state.userInfo.receiveAddress.receiverPhone = ''
    state.userInfo.receiveAddress.address = ''
    state.userInfo.balance = null
    state.userInfo.login = flase
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
