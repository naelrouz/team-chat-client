import _ from 'lodash';

import { allTeams } from '../../api/';

const state = {
  messages: []
};

const getters = {
  messages: ({ messages }) => messages
};

const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  }
};

const actions = {
  async loadChannelMessages({ commit, getters }, { teamId, channelId }) {
    console.log('actions.loadChannelMessages.channel:', { teamId, channelId });
    // load all Teams and set current Teams and Channel
    // await allTeams({ commit });
    // await commit('SET_CURRENT_TEAM', teamId);

    // const teams = await getters.teams;
    // console.log('getters.teams:', teams);

    allTeams({ commit }).then(() => {
      commit('SET_CURRENT_TEAM', teamId);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
