import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import bookInfo from './modules/bookInfo'
import goods from './modules/goods'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		auth,
		bookInfo,
		goods
	},
	actions: {
		clearAll() {
			this.dispatch('auth/clearAllUserState');
			this.dispatch('bookInfo/clearAllBooks')
			this.dispatch('goods/clearAllGoods')
		}
	},
	strict: debug,
	plugins: [createPersistedState()],
})
