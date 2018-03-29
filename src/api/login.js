// import gql from "graphql-tag";

import apolloClient from './apollo/apollo-client';
import LOGIN from './graphql/mutations/Login.gql';

import store from '../store';

export default user => {
  const { email, password } = user;
  return apolloClient.mutate({
    mutation: LOGIN,
    variables: {
      email,
      password
    },
    update: (proxy, { data: { login } }) => {
      console.log('login: ', login);
      const { token, refreshToken } = login;

      store.commit('SET_TOKEN', token);
      store.commit('SET_REFRESH_TOKEN', refreshToken);

      //

      // // Read the data from our cache for this query.
      // const data = store.readQuery({ query: TAGS_QUERY });
      // // Add our tag from the mutation to the end
      // data.tags.push(newTag);
      // // Write our data back to the cache.
      // store.writeQuery({ query: TAGS_QUERY, data });
    }
  });
};
