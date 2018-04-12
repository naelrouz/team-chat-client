// import gql from "graphql-tag";

// import _ from 'lodash';

import apolloClient from './apollo/apollo-client';
import ADD_TEAM_MEMBER from './graphql/mutations/ADD_TEAM_MEMBER.gql';

// import store from '../store';

export default newTeamMember =>
  // const { name } = channel;
  apolloClient.mutate({
    mutation: ADD_TEAM_MEMBER,
    variables: newTeamMember,
    update: async (proxy, { data: { addTeamMember } }) => {
      console.log('api.addTeamMember.update.addTeamMember: ', addTeamMember);

      // if (status) {
      // // Read the data from our cache for this query.
      // const data = proxy.readQuery({ query: ALL_TEAMS });
      // // Add element from the mutation
      // const teamIndex = _.findIndex(data.allTeams, { id: channel.teamId });
      // data.allTeams[teamIndex].channels.push(channel);
      // // // // Write our data back to the cache.
      // await proxy.writeQuery({ query: ALL_TEAMS, data });
      // await store.dispatch('allTeams');
      // store.commit('SET_SELECTED_TEAM', channel.teamId);
      // }
    }
  });
