import apolloClient from '../apollo/apollo-client';
import ALL_TEAMS from '../graphql/queries/ALL_TEAMS.gql';

// import vueStore from "../store";

export default ({ commit, channel }) => {
  apolloClient
    .query({
      query: ALL_TEAMS
    })
    .then(({ data: { allTeams } }) => {
      console.log('actions.channelMessages.channel:', channel);

      commit('SET_CURRENT_TEAM_ID', channel.teamId);
      // commit('SET_CURRENT_CHANNEL_ID', channel.id);
    });
};

// apolloClient
//   .query({
//     query: ALL_USERS,
//     update: (store, { data: { allTeams } }) => {
//       console.log("allTeams: ", allTeams);
//
//       vueStore.commit("SET_TEAMS", allTeams);
//
//       // // Read the data from our cache for this query.
//       // const data = store.readQuery({ query: TAGS_QUERY });
//       // // Add our tag from the mutation to the end
//       // data.tags.push(newTag);
//       // // Write our data back to the cache.
//       // store.writeQuery({ query: TAGS_QUERY, data });
//     }
//   })
//   .catch(err => console.log("alollo.err: ", err));
