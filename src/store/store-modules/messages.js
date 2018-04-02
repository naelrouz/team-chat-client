import _ from 'lodash';

import { channelMessages, createMessage } from '../../api/';

const state = {
  status: false,
  errors: [],
  messages: []
};

const getters = {
  // messages: ({ messages }) => messages
  messages: ({ messages }, { userId }) =>
    messages.map(message => ({
      ...message,
      type: message.user.id === userId ? 'sent' : 'received'
    }))
};

const mutations = {
  SET_MESSAGES(state, channelMessages) {
    state.messages = channelMessages;
  },
  ADD_NEW_MESSAGES(state, newMessage) {
    const { messages } = state;

    state.messages = [...messages, newMessage];
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
