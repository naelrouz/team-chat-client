import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// import getters from './getters';

import actions from './actions';

import user from './store-modules/user';
import teams from './store-modules/teams';

Vue.use(Vuex);

export default new Vuex.Store({
  // getters,
  actions,
  modules: {
    user,
    teams
  },
  plugins: [createPersistedState()]
});
