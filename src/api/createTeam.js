// import gql from "graphql-tag";

import apolloClient from '../apollo/apollo-client';
import CREATE_TEAM from '../graphql/mutations/CREATE_TEAM.gql';

// import vueStore from '../store';

export default team => {
  const { name } = team;
  return apolloClient.mutate({
    mutation: CREATE_TEAM,
    variables: {
      name
    },
    update: (store, { data: { createTeam } }) => {
      console.log('createTeam: ', createTeam);

      // // Read the data from our cache for this query.
      // const data = store.readQuery({ query: TAGS_QUERY });
      // // Add our tag from the mutation to the end
      // data.tags.push(newTag);
      // // Write our data back to the cache.
      // store.writeQuery({ query: TAGS_QUERY, data });
    }
  });
};
