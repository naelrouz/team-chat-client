import apolloClient from './apollo/apollo-client';
import apolloProvider from './apollo/apollo-provider';

import CHANNEL_MESSAGES from './graphql/queries/CHANNEL_MESSAGES.gql';
import NEW_CHANNEL_MESSAGE from './graphql/subscriptions/NEW_CHANNEL_MESSAGE.gql';

import store from '../store';

export default async channel => {
  console.log('api.channelMessages.channel:', channel);

  // apolloClient
  //   .query({
  //     query: CHANNEL_MESSAGES,
  //     variables: channel

  //   })
  //   .then(({ data: { channelMessages } }) => {
  //     console.log('api.channelMessages:', channelMessages);

  //     store.commit('SET_MESSAGES', channelMessages);
  //   });

  try {
    const { data: { channelMessages } } = await apolloClient.query({
      query: CHANNEL_MESSAGES,
      variables: channel
    });

    // await apolloProvider.subscribeToMore({
    //   document: NEW_CHANNEL_MESSAGE,
    //   // Variables passed to the subscription. Since we're using a function,
    //   // they are reactive
    //   variables: channel,
    //   // Mutate the previous result
    //   updateQuery: (previousResult, { subscriptionData }) => {
    //     // Here, return the new result from the previous with the new data
    //     console.log('>>>>> previousResult:', previousResult);
    //     console.log('>>>>> subscriptionData:', subscriptionData);
    //   }
    // });

    console.log('api.channelMessages: ', channelMessages);

    const observer = await apolloClient.subscribe({
      query: NEW_CHANNEL_MESSAGE,
      variables: channel
    });

    observer.subscribe({
      next({ data: { newChannelMessage } }) {
        console.log(
          'api.channelMessages.apolloClient.subscribe.newChannelMessage: ',
          newChannelMessage
        );

        if (!newChannelMessage.user) {
          throw Error('New Channel Message not contain User data');
        }

        store.commit('ADD_NEW_MESSAGES', newChannelMessage);
      }
    });

    store.commit('SET_MESSAGES', channelMessages);
  } catch (err) {
    console.error('api.channelMessages.err:', err);
  }
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
