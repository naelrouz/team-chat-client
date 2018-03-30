import apolloClient from './apollo/apollo-client';
import CHANNEL_MESSAGES from './graphql/queries/CHANNEL_MESSAGES.gql';

import store from '../store';

export default channel => {
  console.log('api.channelMessages.channel:', channel);

  apolloClient
    .query({
      query: CHANNEL_MESSAGES,
      variables: channel
    })
    .then(({ data: { channelMessages } }) => {
      console.log('api.channelMessages:', channelMessages);

      store.commit('SET_MESSAGES', channelMessages);
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
