// import gql from "graphql-tag";

import apolloClient from '../apollo/apollo-client';
import LOGIN from '../graphql/mutations/Login.gql';

import vueStore from '../store';

export default user => {
  const { email, password } = user;
  return apolloClient.mutate({
    mutation: LOGIN,
    variables: {
      email,
      password
    },
    update: (store, { data: { login } }) => {
      console.log('login: ', login);
      const { token, refreshToken } = login;

      vueStore.commit('SET_TOKEN', token);
      vueStore.commit('SET_REFRESH_TOKEN', refreshToken);

      // localStorage.setItem('token', token);
      // localStorage.setItem('refreshToken', refreshToken);

      // // Read the data from our cache for this query.
      // const data = store.readQuery({ query: TAGS_QUERY });
      // // Add our tag from the mutation to the end
      // data.tags.push(newTag);
      // // Write our data back to the cache.
      // store.writeQuery({ query: TAGS_QUERY, data });
    }
  });
};
