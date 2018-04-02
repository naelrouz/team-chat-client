import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { ApolloLink, concat, split, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// import { setContext } from 'apollo-link-context';

import store from '../../store/index';

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: true
  }
});

const onErr = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

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

// TODO logout

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
        // console.log('afterwareLink.token:', token);

        // store.commit('SET_TOKEN', token);
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        // console.log('afterwareLink.refreshToken:', refreshToken);

        // store.commit('SET_REFRESH_TOKEN', refreshToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
    return response;
  })
);

// // use with apollo-client
// const link = afterwareLink.concat(httpLink);

const httpLinkWithMiddlewars = afterwareLink.concat(
  from([authMiddleware, httpLink])
);

// const httpLinkWithMiddlewars =from([
//   onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.map(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//         ),
//       );
//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   }),
//   new HttpLink({
//     uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
//     credentials: 'same-origin'
//   })
// ])

const link = split(
  // split based on operation type
  ({ query }) => {
    console.log('Split based on operation type. Query: ', query);

    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddlewars
);

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
