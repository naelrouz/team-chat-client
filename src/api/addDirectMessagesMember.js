// import gql from "graphql-tag";

// import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import ADD_DIRECT_MESSAGES_MEMBER from './graphql/mutations/ADD_DIRECT_MESSAGES_MEMBER.gql';

import store from '../store';

export default newDirectMessagesMember => {
  // const { name } = channel;
  console.log('newDirectMessagesMember: ', newDirectMessagesMember);

  apolloClient.mutate({
    mutation: ADD_DIRECT_MESSAGES_MEMBER,
    variables: newDirectMessagesMember,
    update: async (proxy, { data: { addDirectMessagesMember } }) => {
      console.log(
        'api.addDirectMessagesMember.update: ',
        addDirectMessagesMember
      );

      if (status) {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: ALL_TEAMS });
        // Add element from the mutation
        const teamIndex = _.findIndex(data.allTeams, { id: channel.teamId });
        data.allTeams[teamIndex].channels.push(channel);
        // // // Write our data back to the cache.
        await proxy.writeQuery({ query: ALL_TEAMS, data });
        await store.dispatch('allTeams');
        store.commit('SET_SELECTED_TEAM', channel.teamId);
      }
    }
  });
};
