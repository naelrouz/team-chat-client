import apolloClient from './apollo/apollo-client';
// import apolloProvider from './apollo/apollo-provider';

import TEAM_MEMBERS from './graphql/queries/TEAM_MEMBERS.gql';
// import NEW_CHANNEL_MESSAGE from './graphql/subscriptions.gql';

import store from '../store';

export default async team => {
  try {
    console.log('api.teamMembers.team:', team);

    const { data: { teamMembers } } = await apolloClient.query({
      query: TEAM_MEMBERS,
      variables: team,
      forceFetch: true
    });

    // const teamMembersObserv = await apolloClient.watchQuery({
    //   query: CHANNEL_MESSAGES,
    //   variables: channel
    // });

    // teamMembersObserv.subscribeToMore({
    //   document: NEW_CHANNEL_MESSAGE,
    //   variables: channel,
    //   // Mutate the previous result
    //   updateQuery: (previousResult, { subscriptionData }) => {
    //     // Here, return the new result from the previous with the new data
    //     console.log('>>>>>>>> subscriptionData: ', subscriptionData);
    //   }
    // });

    // console.log('api.teamMembersObserv: ', teamMembersObserv);

    console.log('api.teamMembers: ', teamMembers);
    store.commit('SET_CURRENT_TEAM_MEMBERS', teamMembers);
    return teamMembers;
  } catch (err) {
    console.error('api.teamMembers.err:', err);
    return null;
  }
};
