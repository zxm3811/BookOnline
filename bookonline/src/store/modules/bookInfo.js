const state = {
  bookInfo: {
    id: null,
    uid: null,
    type: null,
    name: '',
    cover: '',
    author: '',
    publishDate: '',
    binding: '',
    publishHouse: '',
    format: null,
    isbn: '',
    sellingPrice: null,
    sale: null,
    fixedPrice: null,
    appearance: '',
    address: '',
    putOnDate: '',
    stock: null
  }
}
const getters = {
  getBookInfo: state => {
    return state.bookInfo
  }
}

const actions = {
  saveBook({
    commit
  }, bookInfo) {
    commit("SAVE_BOOK", bookInfo);
  },

  clearAllBooks({
    commit
  }) {
    commit("CLEAR_ALL_BOOKS")
  }
}

const mutations = {
  SAVE_BOOK: (state, bookInfo) => {
    state.bookInfo.id = bookInfo.id
    state.bookInfo.uid = bookInfo.uid
    state.bookInfo.type = bookInfo.type
    state.bookInfo.name = bookInfo.name
    state.bookInfo.cover = bookInfo.cover
    state.bookInfo.author = bookInfo.author
    state.bookInfo.publishDate = bookInfo.publishDate
    state.bookInfo.binding = bookInfo.binding
    state.bookInfo.publishHouse = bookInfo.publishHouse
    state.bookInfo.format = bookInfo.format
    state.bookInfo.isbn = bookInfo.isbn
    state.bookInfo.sellingPrice = bookInfo.sellingPrice
    state.bookInfo.sale = bookInfo.sale
    state.bookInfo.fixedPrice = bookInfo.fixedPrice
    state.bookInfo.appearance = bookInfo.appearance
    state.bookInfo.address = bookInfo.address
    state.bookInfo.putOnDate = bookInfo.putOnDate
    state.bookInfo.stock = bookInfo.stock
  },
  CLEAR_ALL_BOOKS: (state) => {
    state.bookInfo.id = null
    state.bookInfo.uid = null
    state.bookInfo.type = null
    state.bookInfo.name = ''
    state.bookInfo.cover = ''
    state.bookInfo.author = ''
    state.bookInfo.publishDate = ''
    state.bookInfo.binding = ''
    state.bookInfo.publishHouse = ''
    state.bookInfo.format = null
    state.bookInfo.isbn = ''
    state.bookInfo.sellingPrice = null
    state.bookInfo.sale = null
    state.bookInfo.fixedPrice = null
    state.bookInfo.appearance = ''
    state.bookInfo.address = ''
    state.bookInfo.putOnDate = ''
    state.bookInfo.stock = null
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
