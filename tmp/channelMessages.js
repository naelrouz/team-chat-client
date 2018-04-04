import apolloClient from './apollo/apollo-client';
// import apolloProvider from './apollo/apollo-provider';

import CHANNEL_MESSAGES from './graphql/queries/CHANNEL_MESSAGES.gql';
import NEW_CHANNEL_MESSAGE from './graphql/subscriptions/NEW_CHANNEL_MESSAGE.gql';

import store from '../store';

export default async channel => {
  try {
    console.log('api.channelMessages.channel:', channel);

    const { data: { channelMessages } } = await apolloClient.query({
      query: CHANNEL_MESSAGES,
      variables: channel,
      forceFetch: true
    });

    const channelMessagesObserv = await apolloClient.watchQuery({
      query: CHANNEL_MESSAGES,
      variables: channel
    });

    // channelMessagesObserv.subscribeToMore({
    //   document: NEW_CHANNEL_MESSAGE,
    //   variables: channel,
    //   // Mutate the previous result
    //   updateQuery: (previousResult, { subscriptionData }) => {
    //     // Here, return the new result from the previous with the new data
    //     console.log('>>>>>>>> subscriptionData: ', subscriptionData);
    //   }
    // });

    console.log('api.channelMessagesObserv: ', channelMessagesObserv);

    console.log('api.channelMessages: ', channelMessages);
    store.commit('SET_MESSAGES', channelMessages);
  } catch (err) {
    console.error('api.channelMessages.err:', err);
  }
};
