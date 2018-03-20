import decode from "jwt-decode";
import gql from "graphql-tag";

import apolloClient from "../../apollo/apollo-client";

const state = {
  allUsersList: [],
  token: "",
  refreshToken: ""
};

const getters = {
  username: ({ token }) => {
    try {
      const { user: { username } } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      return username;
    } catch (err) {
      return false
    }
  },
  allUsersList: ({ allUsersList }) => allUsersList,
  token: ({ token }) => token,
  refreshToken: ({ refreshToken }) => refreshToken,
  getTokens: ({ token, refreshToken }) => ({ token, refreshToken })
};

const mutations = {
  SET_USERS_LIST(state, allUsersList) {
    state.allUsersList = allUsersList;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken;
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
        // console.log('actions.allUsers.result', allUsers);
        commit("SET_USERS_LIST", allUsers);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
