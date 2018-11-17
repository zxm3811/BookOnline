const state = {
  userInfo: {
    token: '',
    account: '',
    password: '',
    name: '',   //new start
    email: '',
    phone: '',
    address: {
      province: '',
      city: '',
      district: '',
      street: '',
      mark: '',
    },
    bankNo: '',
    balance: '',//new end
    gender: '',
    age: null,
    avatar: '',
    userType: null,
  }
}
const getters = {
  userInfo: state => {
    return state.userInfo
  },
  token: state => {
    return state.userInfo.token
  },
  account: state => {
    return state.userInfo.account
  },
  password: state => {
    return state.userInfo.password
  },
  name: state => {
    return state.userInfo.name
  },
  email: state => {
    return state.userInfo.email
  },
  phone: state => {
    return state.userInfo.state
  },
  addrProv: state => {
    return state.userInfo.address.province
  },
  addrCity: state => {
    return state.userInfo.address.city
  },
  addrDist: state => {
    return state.userInfo.address.district
  },
  addrStreet: state => {
    return state.userInfo.address.street
  },
  addrMark: state => {
    return state.userInfo.address.mark
  },
  bankNo: state => {
    return state.userInfo.bankNo
  },
  balance: state => {
    return state.userInfo.balance
  },
  gender: state => {
    return state.userInfo.gender
  },
  age: state => {
    return state.userInfo.age
  },
  avatar: state => {
    return state.userInfo.avatar
  },
  userType: state => {
    return state.userInfo.userType
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
  }, params) {
    if (!params) {
      return;
    }
    params.displayName = params.displayName.trim()
    commit("UPDATE_DISPLAY_NAME", params.displayName);
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
  SAVE_USER_STATE: (state, userInfo) => {
    state.userInfo.account = userInfo.account
    state.userInfo.password = userInfo.password
    state.userInfo.name = userInfo.name
    state.userInfo.email = userInfo.email
    state.userInfo.phone = userInfo.phone
    /*
    state.userInfo.address.province = userInfo.address.province
    state.userInfo.address.city = userInfo.address.city
    state.userInfo.address.district = userInfo.address.district
    state.userInfo.address.street = userInfo.address.street
    state.userInfo.address.mark = userInfo.address.mark
    */
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
    /*
    state.userInfo.address.province = ''
    state.userInfo.address.city = ''
    state.userInfo.address.district = ''
    state.userInfo.address.street = ''
    state.userInfo.address.mark = ''
    */
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
