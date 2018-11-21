const state = {
  myBooks: []
}

const getters = {
  getMyBooksByAccount: state => (account) => {
    let result = [];
    if (!state.myBooks) {
      return result;
    }
    for (let i = 0; i < state.myBooks.length; i++) {
      if (state.myBooks[i].account == account) {
        result.push(state.myBooks[i])
      }
    }
    return result;
  },
}

const actions = {
  saveMyBook({
    commit
  }, book) {
    commit("SAVE_MY_BOOK", book);
  },

  deleteMyBookById({
    commit
  }, params) {
    commit("DELETE_MY_BOOK_BY_ID", params);
  },

  clearAllMyBooks({ commit }) {
    commit("CLEAR_ALL_MY_BOOKS")
  }
}

const mutations = {
  SAVE_MY_BOOK: (state, book) => {
    let i = 0;
    for (; i < state.myBooks.length; i++) {
      if (state.myBooks[i].id == book.id && state.myBooks[i].account == book.account) {
        state.myBooks.splice(i, 1, book);
        return;
      }
    }
    if (i == state.myBooks.length) {
      state.myBooks.push(book);
    }
  },

  DELETE_MY_BOOK_BY_ID: (state, params) => {
    let i = 0;
    for (; i < state.myBooks.length; i++) {
      if (state.myBooks[i].id == params.id && state.myBooks[i].account == params.account) {
        state.myBooks.splice(i, 1);
        return;
      }
    }
  },

  CLEAR_ALL_MY_BOOKS: (state) => {
    state.myBooks = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}