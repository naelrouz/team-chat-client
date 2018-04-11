// // import _ from 'lodash';

import { directMessages, createDirectMessage } from '../../api/';
// import apolloClient from '../../api/apollo/apollo-client';

// import CHANNEL_MESSAGES from '../../api/graphql/queries/CHANNEL_MESSAGES.gql';
// import NEW_CHANNEL_MESSAGE from '../../api/graphql/subscriptions/NEW_CHANNEL_MESSAGE.gql';

const state = {
  //   status: false,
  //   errors: [],
  //   messages: [],
  directMessagesSubscriptionObservers: []
};

const getters = {
  // messages: ({ messages }) => messages
  directMessagesMembers: (state, getters) => {
    try {
      return getters.currentTeam.directMessagesMembers;
    } catch (err) {
      console.error('getters.directMessagesMembers.err: ', err);
    }
  }

  //   isSubscribeToMessages: ({ messagesSubscriptionObserver }) =>
  //     !!messagesSubscriptionObserver.subscribe
};
// const mutations = {
//   SET_MESSAGES(state, channelMessages) {
//     state.messages = channelMessages;
//   },
//   SET_MESSAGES_SUBSCRIPTION_OBSERVER(
//     state,
//     { messagesSubscriptionObserver, channelId }
//   ) {
//     state.messagesSubscriptionObservers[
//       channelId
//     ] = messagesSubscriptionObserver;
//   }
// };

const actions = {
  loadDirectMessages({ commit }, receiver) {
    // load all Teams and set current Teams and Channel
    const { teamId, receiverId } = receiver;
    directMessages(receiver);
    // ???
    // commit('SET_CURRENT_TEAM_ID', teamId);
    // commit('SET_CURRENT_CHANNEL_ID', receiverId);
  },
  createDirectMessage({ commit }, newMessage) {
    console.log('actions.createDirectMessage.newMessage:', newMessage);
    // load all Teams and set current Teams and Channel
    createDirectMessage(newMessage);
  }
  // Subscriptions
  // async subscribeToMessages({ state, commit, dispatch }, channel) {
  //   try {
  //     if (state.messagesSubscriptionObservers[channel.channelId]) {
  //       console.log(
  //         `- messagesSubscriptionObservers[${channel.channelId}] is isset`
  //       );
  //       return;
  //     }
  //   } catch (err) {
  //     console.log('subscribeToMessages.err:', err);
  //   }
  //   try {
  //     const messagesSubscriptionObserver = await apolloClient.subscribe({
  //       query: NEW_CHANNEL_MESSAGE,
  //       variables: channel
  //     });
  //     console.log(
  //       '>>>>>>>>> messagesSubscriptionObserver: ',
  //       messagesSubscriptionObserver
  //     );
  //     await messagesSubscriptionObserver.subscribe({
  //       next({ data: { newChannelMessage } }) {
  //         console.log(
  //           'api.channelMessages.apolloClient.subscribe.newChannelMessage: ',
  //           newChannelMessage
  //         );
  //         if (!newChannelMessage.user) {
  //           throw Error('New Channel Message not contain User data');
  //         }
  //         dispatch('addNewMessage', newChannelMessage);
  //       },
  //       error(error) {
  //         console.log(error);
  //       }
  //     });
  //     commit('SET_MESSAGES_SUBSCRIPTION_OBSERVER', {
  //       messagesSubscriptionObserver,
  //       channelId: channel.channelId
  //     });
  //     console.log(
  //       `+ messagesSubscriptionObservers[${channel.channelId}] added`
  //     );
  //   } catch (err) {
  //     console.error('subscribeToMessages.err: ', err);
  //   }
  // },
  // async addNewMessage({ state, commit }, newMessage) {
  //   const { messages } = state;
  //   const { channelId } = newMessage;
  //   const channelMessagesQuery = {
  //     query: CHANNEL_MESSAGES,
  //     variables: { channelId },
  //     kind: 'Document'
  //   };
  //   const data = await apolloClient.readQuery(channelMessagesQuery);
  //   data.channelMessages.push({ ...newMessage });
  //   console.log('>>> channelMessagesData', data);
  //   // apolloClient.writeQuery(
  //   //   ...channelMessagesQuery,
  //   //   (data: channelMessagesData)
  //   // );
  //   apolloClient.writeQuery({
  //     ...channelMessagesQuery,
  //     data
  //   });
  //   commit('SET_MESSAGES', [...messages, newMessage]);
  // }
};

export default {
  state,
  getters,
  // mutations,
  actions
};
