import apolloClient from './apollo/apollo-client';
import USER_TEAMS from './graphql/queries/USER_TEAMS.gql';

// import vueStore from "../store";

export default ({ commit }) => {
  apolloClient
    .query({
      query: USER_TEAMS
    })
    .then(({ data: { allTeams } }) => {
      // const {  } = data;
      console.log('actions.allTeams.result', allTeams);
      commit('SET_TEAMS', allTeams);
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
