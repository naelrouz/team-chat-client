import VueApollo from 'vue-apollo';

import apolloClient from './apollo-client'

export default new VueApollo({
  defaultClient: apolloClient,
})


