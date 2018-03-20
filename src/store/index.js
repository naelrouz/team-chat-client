import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// import getters from './getters';
import user from './store-modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  // getters,
  modules: {
    user
  },
  plugins: [createPersistedState()]
});
