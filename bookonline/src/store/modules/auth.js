const state = {
  userInfo: {
    token: '',
    account: '',
    password: '',
    address: '',
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
  address: state => {
    return state.userInfo.address
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
    state.userInfo.address = userInfo.address
    state.userInfo.gender = userInfo.gender
    state.userInfo.age = userInfo.age
    state.userInfo.avatar = userInfo.photoUrl
    state.userInfo.userType = userInfo.userType
  },
  CLEAR_ALL_USER_STATE: (state) => {
    state.userInfo.token = ''
    state.userInfo.account = ''
    state.userInfo.password = ''
    state.userInfo.address = ''
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
