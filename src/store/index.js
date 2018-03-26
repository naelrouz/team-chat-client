import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// import getters from './getters';

import actions from './actions';

import user from './store-modules/user';
import teams from './store-modules/teams';
import messages from './store-modules/messages';

Vue.use(Vuex);

export default new Vuex.Store({
  // getters,
  actions,
  modules: {
    user,
    teams,
    messages
  }
  // plugins: [createPersistedState()]
});
