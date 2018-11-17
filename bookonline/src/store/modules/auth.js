const state = {
  userInfo: {
    token: '',
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
    bankNo: '',
    balance: '',
    gender: '',
    age: null,
    avatar: '',
    userType: null
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

  updateUserInfo({
    commit
  }, userInfo) {
    if (!userInfo) {
      return;
    }
    commit("UPDATE_USER_INFO", userInfo);
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
  UPDATE_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SAVE_USER_STATE: (state, userInfo) => {
    state.userInfo.account = userInfo.account
    state.userInfo.password = userInfo.password
    state.userInfo.name = userInfo.name
    state.userInfo.email = userInfo.email
    state.userInfo.phone = userInfo.phone
    state.userInfo.receiveAddress.receiverName = userInfo.receiveAddress.receiverName
    state.userInfo.receiveAddress.receiverPhone = userInfo.receiveAddress.receiverPhone
    state.userInfo.receiveAddress.address = userInfo.receiveAddress.address
    state.userInfo.bankNo = userInfo.bankNo
    state.userInfo.balance = userInfo.balance
    state.userInfo.gender = userInfo.gender
    state.userInfo.age = userInfo.age
    state.userInfo.avatar = userInfo.photoUrl
    state.userInfo.userType = userInfo.userType
  },
  CLEAR_ALL_USER_STATE: (state) => {
    state.userInfo.token = ''
    state.userInfo.account = ''
    state.userInfo.password = ''
    state.userInfo.name = ''
    state.userInfo.email = ''
    state.userInfo.phone = ''
    state.userInfo.receiveAddress.receiverName = ''
    state.userInfo.receiveAddress.receiverPhone = ''
    state.userInfo.receiveAddress.address = ''
    state.userInfo.bankNo = ''
    state.userInfo.balance = ''
    state.userInfo.gender = ''
    state.userInfo.age = null
    state.userInfo.avatar = ''
    state.userInfo.userType = null
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
