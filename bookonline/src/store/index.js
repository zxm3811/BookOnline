import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import bookInfo from './modules/bookInfo'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		auth,
		bookInfo
	},
	actions: {
		clearAll() {
			this.dispatch('auth/clearAllUserState');
			this.dispatch('bookInfo/clearAllBook')
		}
	},
	strict: debug,
	plugins: [createPersistedState()],
})
