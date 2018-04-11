// import gql from "graphql-tag";

import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import CREATE_CHANNEL from './graphql/mutations/CREATE_CHANNEL.gql';
import ME from './graphql/queries//ME.gql';

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
    update: async (proxy, { data: { createChannel: { channel, status } } }) => {
      console.log('createTeam.update.channel: ', channel);

      if (status) {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: ME });

        // Add element from the mutation
        const teamIndex = _.findIndex(data.me.teams, { id: channel.teamId });
        data.me.teams[teamIndex].channels.push(channel);

        // // // Write our data back to the cache.
        await proxy.writeQuery({ query: ME, data });
        await store.dispatch('me');
        store.commit('SET_CURRENT_CHANNEL_ID', channel.id);
      }
    }
  });
