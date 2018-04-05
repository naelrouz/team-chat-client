import apolloClient from './apollo/apollo-client';
import ME from './graphql/queries/ME.gql';

import store from '../store';

export default () => {
  apolloClient
    .query({
      query: ME
    })
    .then(({ data: { me } }) => {
      // const {  } = data;
      console.log('api.me: ', me);
      store.commit('SET_ME', me);
    });
};
