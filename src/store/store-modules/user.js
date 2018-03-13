// import Vue from 'vue';

import gql from 'graphql-tag';

import apolloClient from '../../apollo/apollo-client';

const state = {
  allUsersList: []
  // registerResponse: {}
};

const getters = {
  allUsersList(state) {
    return state.allUsersList;
  }
  // registerResponse(state) {
  //   return state.registerResponse;
  // }
};

const mutations = {
  SET_USERS_LIST(state, allUsersList) {
    state.allUsersList = allUsersList;
  }
  // SET_REGISTER_RESPONSE(state, registerResponse) {
  //   state.registerResponse = registerResponse;
  // }
};
const actions = {
  allUsers({ commit }) {
    apolloClient
      .query({
        query: gql`
          {
            allUsers {
              id
              username
              email
            }
          }
        `
      })
      .then(({ data: { allUsers } }) => {
        // const {  } = data;
        console.log('actions.allUsers.result', allUsers);
        commit('SET_USERS_LIST', allUsers);
      });
  }
  // register({ commit }, user) {
  //   // console.log('actions.register.user: ', user);

  //   apolloClient
  //     .mutate({
  //       mutation: gql`
  //         mutation {
  //           register(username: "${user.name}", password: "${
  //         user.password
  //       }", email: "${user.email}") {
  //             status
  //             errors{
  //               path,
  //               message
  //             }
  //           }
  //         }
  //       `
  //     })
  //     .then(({ data }) => {
  //       const { register } = data;
  //       // console.log('actions.register.response: ', data);
  //       commit('SET_REGISTER_RESPONSE', register);
  //     })
  //     .catch(err => console.log('actions.register.err: ', err));
  // }
};

export default {
  state,
  getters,
  mutations,
  actions
};
