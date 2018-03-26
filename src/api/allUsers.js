import apolloClient from '../apollo/apollo-client';
import ALL_USERS from '../graphql/que/a';

export default () =>
  apolloClient.mutate({
    query: ALL_USERS,
    update: (store, { data: { allUsers } }) => {
      console.log('login: ', allUsers);

      // // Read the data from our cache for this query.
      // const data = store.readQuery({ query: TAGS_QUERY });
      // // Add our tag from the mutation to the end
      // data.tags.push(newTag);
      // // Write our data back to the cache.
      // store.writeQuery({ query: TAGS_QUERY, data });
    }
  });
