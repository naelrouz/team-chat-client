// import gql from "graphql-tag";

import apolloClient from './apollo/apollo-client';
import CREATE_TEAM from './graphql/mutations/CREATE_TEAM.gql';
import USER_TEAMS from './graphql/queries//USER_TEAMS.gql';

import store from '../store';

export default newTeam => {
  const { name } = newTeam;
  return apolloClient.mutate({
    mutation: CREATE_TEAM,
    variables: {
      name
    },
    update: async (proxy, { data: { createTeam: { team, status } } }) => {
      console.log('createTeam.update: ', team);

      if (status) {
        // // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: USER_TEAMS });
        // // Add our tag from the mutation to the end
        console.log('data', data);

        data.userTeams.push(team);
        // // // Write our data back to the cache.
        await proxy.writeQuery({ query: USER_TEAMS, data });

        await store.dispatch('userTeams');
        store.commit('SET_CURRENT_TEAM_ID', team.id);
      }
    }
  });
};

// const query = gql`{ todos { ... } }`

// export default graphql(gql`
//   mutation ($text: String!) {
//     createTodo(text: $text) { ... }
//   }
// `, {
//   options: {
//     update: (proxy, { data: { createTodo } }) => {
//       const data = proxy.readQuery({ query });
//       data.todos.push(createTodo);
//       proxy.writeQuery({ query, data });
//     },
//   },
// })(MyComponent);
