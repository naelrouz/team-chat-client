// // import _ from 'lodash';

import { directMessages, createDirectMessage } from '../../api/';
import apolloClient from '../../api/apollo/apollo-client';

import DIRECT_MESSAGES from '../../api/graphql/queries/DIRECT_MESSAGES.gql';
import NEW_DIRECT_MESSAGE from '../../api/graphql/subscriptions/NEW_DIRECT_MESSAGE.gql';

const state = {
  //   status: false,
  //   errors: [],
  //   messages: [],
  directMessagesSubscriptionObserversList: {}
};

const getters = {
  // messages: ({ messages }) => messages
  // directMessagesMembers: (state, getters) => {
  //   try {
  //     return getters.currentTeam.directMessagesMembers;
  //   } catch (err) {
  //     console.error('getters.directMessagesMembers.err: ', err);
  //   }
  // }
  //   isSubscribeToMessages: ({ messagesSubscriptionObserver }) =>
  //     !!messagesSubscriptionObserver.subscribe
};
const mutations = {
  SET_DIRECT_MESSAGES_SUBSCRIPTION_OBSERVER(
    state,
    { directMessagesSubscriptionObserver, teamId }
  ) {
    state.directMessagesSubscriptionObserversList[
      teamId
    ] = directMessagesSubscriptionObserver;
  }
};

const actions = {
  loadDirectMessages({ commit }, payload) {
    // load all Teams and set current Teams and Channel
    const { teamId, receiverId } = payload;
    directMessages(payload);
  },
  createDirectMessage({ commit }, newMessage) {
    console.log('actions.createDirectMessage.newMessage:', newMessage);
    // load all Teams and set current Teams and Channel
    createDirectMessage(newMessage);
  },
  async subscribeToNewDirectMessages({ state, commit, dispatch }, payload) {
    try {
      console.log(
        'state.directMessagesMembersSubscriptionObservers: ',
        state.directMessagesMembersSubscriptionObservers
      );

      if (state.directMessagesSubscriptionObserversList[payload.teamId]) {
        console.log(
          `- directMessagesSubscriptionObservers[${payload.teamId}] is isset`
        );
        return;
      }
    } catch (err) {
      console.error(
        'actions.subscribeToNewDirectMessages.err:',
        err.toString()
      );
    }

    try {
      const directMessagesSubscriptionObserver = await apolloClient.subscribe({
        query: NEW_DIRECT_MESSAGE,
        variables: payload
      });

      await directMessagesSubscriptionObserver.subscribe({
        next({ data: { newDirectMessage } }) {
          // console.log('>>>> data: ', data);

          console.log(
            'actions.subscribeTonewDirectMessages.newDirectMessage: ',
            newDirectMessage
          );
          if (!newDirectMessage.user) {
            throw Error('New Channel Message not contain User data');
          }
          dispatch('addNewDirectMessage', newDirectMessage);
        },
        error(error) {
          console.error(error);
        }
      });

      commit('SET_DIRECT_MESSAGES_SUBSCRIPTION_OBSERVER', {
        directMessagesSubscriptionObserver,
        teamId: payload.teamId
      });

      console.log(
        `+ directMessagesSubscriptionObserver[${payload.teamId}] added`
      );
    } catch (err) {
      console.error('actions.subscribeTonewDirectMessages.err: ', err);
    }
  },
  async addNewDirectMessage({ state, commit, dispatch }, newDirectMessage) {
    console.log('addNewDirectMessage.newDirectMessage: ', newDirectMessage);

    // const { messages } = state;
    const { teamId, receiverId } = newDirectMessage;
    const directMessagesQuery = {
      query: DIRECT_MESSAGES,
      variables: { teamId, receiverId }
    };
    const data = await apolloClient.readQuery(directMessagesQuery);

    data.directMessages.push({
      ...newDirectMessage
    });

    console.log('addnewDirectMessage.data: ', data);

    apolloClient.writeQuery({
      ...directMessagesQuery,
      data
    });
    dispatch('loadDirectMessages', { teamId, receiverId });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
