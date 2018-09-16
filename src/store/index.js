import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    updateToken (state, arg) {
      if( !arg || arg.length != 32) {
        console.log(arg, '格式不对！');
      } else {
        state.token = arg;
      }
    },
    updateUser (state, arg) {
      state.user = arg;
    },
  },
  actions: {
    updateToken ({commit}, arg) {
      commit('updateToken', arg);
    },
    updateUser ({commit}, arg) {
      commit('updateUser', arg);
    }
  },
  getters: {

  }
});
