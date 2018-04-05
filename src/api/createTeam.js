// import gql from "graphql-tag";

import apolloClient from './apollo/apollo-client';
import CREATE_TEAM from './graphql/mutations/CREATE_TEAM.gql';
import ME from './graphql/queries//ME.gql';

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
        const data = proxy.readQuery({ query: ME });
        // // Add our tag from the mutation to the end

        data.me.teams.push(team);
        console.log('data', data);

        // // // Write our data back to the cache.
        await proxy.writeQuery({ query: ME, data });

        await store.dispatch('me');
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
