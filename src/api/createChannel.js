// import gql from "graphql-tag";

import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import CREATE_CHANNEL from './graphql/mutations/CREATE_CHANNEL.gql';
import USER_TEAMS from './graphql/queries//USER_TEAMS.gql';

import store from '../store';

export default newChannel =>
  // const { name } = channel;
  apolloClient.mutate({
    mutation: CREATE_CHANNEL,
    variables: newChannel,
    optimisticResponse: {
      __typename: 'Mutation',
      createChannel: {
        __typename: 'CreateChannelResponse',
        status: true,
        errors: null,
        channel: {
          id: -1,
          name: newChannel.name,
          teamId: newChannel.teamId,
          __typename: 'Channel'
        }
      }
    },
    // edcvwe
    update: async (proxy, { data: { createChannel: { channel, status } } }) => {
      console.log('createTeam.update.channel: ', channel);

      if (status) {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: USER_TEAMS });

        // Add element from the mutation
        const teamIndex = _.findIndex(data.allTeams, { id: channel.teamId });
        data.allTeams[teamIndex].channels.push(channel);

        // // // Write our data back to the cache.
        await proxy.writeQuery({ query: USER_TEAMS, data });
        await store.dispatch('allTeams');
        store.commit('SET_CURRENT_CHANNEL_ID', channel.id);
      }
    }
  });
