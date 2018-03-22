import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { ApolloLink, concat, from } from 'apollo-link';
import { onError } from 'apollo-link-error';

// import { setContext } from 'apollo-link-context';

import store from '../store';

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const { token, refreshToken } = store.getters;
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       'x-token': token,
//       'x-refresh-token': refreshToken
//       // authorization: token ? `Bearer ${token}` : ''
//     }
//   };
// });

// networkInterface.use([
//   {
//     applyMiddleware(req, next) {
//       if (!req.options.headers) {
//         req.options.headers = {};
//       }

//       req.options.headers['x-token'] = localStorage.getItem('token');
//       req.options.headers['x-refresh-token'] = localStorage.getItem(
//         'refreshToken'
//       );
//       next();
//     }
//   }
// ]);

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token, refreshToken } = store.getters;

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-token': token || null,
      'x-refresh-token': refreshToken || null
    }
  }));

  return forward(operation);
});

// TODO concat afterwares ????

// const logoutLink = onError(({ networkError }) => {
//   if (networkError.statusCode === 401) logout();
// })

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const { response: { headers } } = operation.getContext();

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        console.log('afterwareLink.token:', token);

        // store.commit('SET_TOKEN', token);
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        console.log('afterwareLink.refreshToken:', refreshToken);

        // store.commit('SET_REFRESH_TOKEN', refreshToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    return response;
  })
);

// // use with apollo-client
// const link = afterwareLink.concat(httpLink);

const link = afterwareLink.concat(from([authMiddleware, httpLink]));

// const link = from([authMiddleware, httpLink]);

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Install the vue plugin
Vue.use(VueApollo);

export default apolloClient;
