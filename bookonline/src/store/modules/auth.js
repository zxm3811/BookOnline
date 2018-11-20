const state = {
  userInfo: {
    token: '',
    id: null,
    account: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    receiveAddress: {
      receiverName: '',
      receiverPhone: '',
      address: ''
    },
    balance: null,
  }
}
const getters = {
  userInfo: state => {
    return state.userInfo
  }
}

const actions = {
  saveToken({
    commit
  }, token) {
    commit('SAVE_TOKEN', token)
  },
  saveUserState({
    commit
  }, userInfo) {
    commit("SAVE_USER_STATE", userInfo);
  },

  clearAllUserState({
    commit
  }) {
    commit("CLEAR_ALL_USER_STATE")
  }
}

const mutations = {
  SAVE_TOKEN: (state, token) => {
    state.userInfo.token = token
  },
  SAVE_PASSWORD: (state, password) => {
    state.userInfo.password = password
  },
  UPDATE_USER_INFORMATION: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SAVE_USER_STATE: (state, userInfo) => {
    state.userInfo.id = userInfo.id
    state.userInfo.account = userInfo.account
    state.userInfo.password = userInfo.password
    state.userInfo.name = userInfo.name
    state.userInfo.email = userInfo.email
    state.userInfo.phone = userInfo.phone
    state.userInfo.receiveAddress.receiverName = userInfo.receiveAddress.receiverName
    state.userInfo.receiveAddress.receiverPhone = userInfo.receiveAddress.receiverPhone
    state.userInfo.receiveAddress.address = userInfo.receiveAddress.address
    state.userInfo.balance = userInfo.balance
  },
  CLEAR_ALL_USER_STATE: (state) => {
    state.userInfo.token = ''
    state.userInfo.id = null
    state.userInfo.account = ''
    state.userInfo.password = ''
    state.userInfo.name = ''
    state.userInfo.email = ''
    state.userInfo.phone = ''
    state.userInfo.receiveAddress.receiverName = ''
    state.userInfo.receiveAddress.receiverPhone = ''
    state.userInfo.receiveAddress.address = ''
    state.userInfo.balance = null
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
