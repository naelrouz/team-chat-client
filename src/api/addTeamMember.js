// import gql from "graphql-tag";

import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import ADD_TEAM_MEMBER from './graphql/mutations/ADD_TEAM_MEMBER.gql';

import store from '../store';

export default newMember =>
  // const { name } = channel;
  apolloClient.mutate({
    mutation: ADD_TEAM_MEMBER,
    variables: newMember,
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   createChannel: {
    //     __typename: 'CreateChannelResponse',
    //     status: true,
    //     errors: null,
    //     channel: {
    //       id: -1,
    //       name: newChannel.name,
    //       teamId: newChannel.teamId,
    //       __typename: 'Channel'
    //     }
    //   }
    // },
    // edcvwe
    update: async (proxy, { data: { addTeamMember: { status } } }) => {
      console.log('api.addTeamMember.update.status: ', status);

      if (status) {
        // // Read the data from our cache for this query.
        // const data = proxy.readQuery({ query: ALL_TEAMS });
        // // Add element from the mutation
        // const teamIndex = _.findIndex(data.allTeams, { id: channel.teamId });
        // data.allTeams[teamIndex].channels.push(channel);
        // // // // Write our data back to the cache.
        // await proxy.writeQuery({ query: ALL_TEAMS, data });
        // await store.dispatch('allTeams');
        // store.commit('SET_SELECTED_TEAM', channel.teamId);
      }
    }
  });
