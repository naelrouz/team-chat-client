import _ from 'lodash';

import { directMessages, createDirectMessage } from '../../api/';
import apolloClient from '../../api/apollo/apollo-client';

import NEW_DIRECT_MESSAGES_MEMBER from '../../api/graphql/subscriptions/NEW_DIRECT_MESSAGES_MEMBER.gql';
import ME from '../../api/graphql/queries/ME.gql';

const state = {
  //   status: false,
  //   errors: [],
  //   messages: [],
  directMessagesMembersSubscriptionObserversList: []
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
const mutations = {
  //   SET_MESSAGES(state, channelMessages) {
  //     state.messages = channelMessages;
  //   },
  SET_DIRECT_MESSAGES_MEMBER_SUBSCRIPTION_OBSERVER(
    state,
    { directMessagesMemberSubscriptionObserver, teamId }
  ) {
    state.directMessagesMembersSubscriptionObserversList[
      teamId
    ] = directMessagesMemberSubscriptionObserver;
  }
};

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
  },
  // Subscriptions
  async subscribeToNewDirectMessagesMembers(
    { state, commit, dispatch },
    payload
  ) {
    try {
      console.log(
        'state.directMessagesMembersSubscriptionObservers: ',
        state.directMessagesMembersSubscriptionObservers
      );

      if (
        state.directMessagesMembersSubscriptionObserversList[payload.teamId]
      ) {
        console.log(
          `- directMessagesMembersSubscriptionObservers[${
            payload.teamId
          }] is isset`
        );
        return;
      }
    } catch (err) {
      console.error(
        'directMessagesMembersSubscriptionObservers.err:',
        err.toString()
      );
    }
    try {
      const directMessagesMemberSubscriptionObserver = await apolloClient.subscribe(
        {
          query: NEW_DIRECT_MESSAGES_MEMBER,
          variables: payload
        }
      );
      console.log(
        '>>>>>>>>> messagesSubscriptionObserver: ',
        directMessagesMemberSubscriptionObserver
      );
      await directMessagesMemberSubscriptionObserver.subscribe({
        next({ data: { newDirectMessagesMember } }) {
          // console.log('>>>> data: ', data);

          console.log(
            'api.channelMessages.apolloClient.subscribe.newChannelMessage: ',
            newDirectMessagesMember
          );
          // if (!newDirectMessagesMember.user) {
          //   throw Error('New Channel Message not contain User data');
          // }
          dispatch('addNewDirectMessagesMember', newDirectMessagesMember);
        },
        error(error) {
          console.log(error);
        }
      });

      commit('SET_DIRECT_MESSAGES_MEMBER_SUBSCRIPTION_OBSERVER', {
        directMessagesMemberSubscriptionObserver,
        teamId: payload.teamId
      });

      console.log(
        `+ directMessagesMemberSubscriptionObserver[${payload.teamId}] added`
      );
    } catch (err) {
      console.error('actions.subscribeToNewDirectMessagesMembers.err: ', err);
    }
  },
  async addNewDirectMessagesMember(
    { state, commit, dispatch },
    newDirectMessagesMember
  ) {
    console.log(
      'addNewDirectMessagesMember.newDirectMessagesMember: ',
      newDirectMessagesMember
    );

    // const { messages } = state;
    // const { channelId } = newMessage;
    const meQuery = {
      query: ME
    };
    const data = await apolloClient.readQuery(meQuery);
    const teamIndex = _.findIndex(data.me.teams, { id: 1 });
    data.me.teams[teamIndex].directMessagesMembers.push({
      ...newDirectMessagesMember
    });
    console.log('addNewDirectMessagesMember', data);
    // apolloClient.writeQuery(
    //   ...channelMessagesQuery,
    //   (data: channelMessagesData)
    // );
    apolloClient.writeQuery({
      ...meQuery,
      data
    });
    dispatch('me');
  }
};

// if (status) {
//   // Read the data from our cache for this query.
//   const data = proxy.readQuery({ query: ME });

//   // Add element from the mutation
//   const teamIndex = _.findIndex(data.me.teams, { id: channel.teamId });
//   data.me.teams[teamIndex].channels.push(channel);

//   // // // Write our data back to the cache.
//   await proxy.writeQuery({ query: ME, data });
//   await store.dispatch('me');
//   store.commit('SET_CURRENT_CHANNEL_ID', channel.id);
// }

export default {
  state,
  getters,
  mutations,
  actions
};
