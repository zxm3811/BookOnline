const state = {
  myBooks: []
}

const getters = {
  getAllMyBooks: state => {
    return state.myBooks;
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
  }, id) {
    commit("DELETE_MY_BOOK_BY_ID", id);
  },

  clearAllMyBooks({ commit }) {
    commit("CLEAR_ALL_MY_BOOKS")
  }
}

const mutations = {
  SAVE_MY_BOOK: (state, book) => {
    let i = 0;
    for (; i < state.myBooks.length; i++) {
      if (state.myBooks[i].id == book.id) {
        state.myBooks.splice(i, 1, book);
        return;
      }
    }
    if (i == state.myBooks.length) {
      state.myBooks.push(book);
    }
  },

  DELETE_MY_BOOK_BY_ID: (state, id) => {
    let i = 0;
    for (; i < state.myBooks.length; i++) {
      if (state.myBooks[i].id == id) {
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