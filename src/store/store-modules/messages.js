import _ from 'lodash';

import { channelMessages, createMessage } from '../../api/';

const state = {
  status: false,
  errors: [],
  messages: []
};

const getters = {
  messages: ({ messages }) => messages
};

const mutations = {
  SET_MESSAGES(state, SET_CHANNEL_MESSAGES) {
    state.messages = SET_CHANNEL_MESSAGES;
  }
};

const actions = {
  loadChannelMessages({ commit }, channel) {
    // load all Teams and set current Teams and Channel
    const { teamId, channelId } = channel;
    channelMessages(channel);
    commit('SET_CURRENT_TEAM_ID', teamId);
    commit('SET_CURRENT_CHANNEL_ID', channelId);
  },
  createMessage({ commit }, newMessage) {
    console.log('actions.createMessage.channel:', newMessage);

    // load all Teams and set current Teams and Channel
    createMessage(newMessage);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
