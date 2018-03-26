import _ from 'lodash';

import { channelMessages } from '../../api/';

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
  async loadChannelMessages({ commit }, channel) {
    // load all Teams and set current Teams and Channel
    channelMessages({ commit, channel });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
