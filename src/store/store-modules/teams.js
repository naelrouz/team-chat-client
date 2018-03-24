import _ from 'lodash';

import { allTeams } from '../../api/';

const state = {
  teams: [],
  selectedTeam: { name: 'Select team', id: 0 },
  customers: [{ id: '1', name: 'user 1' }]
};

const getters = {
  teams: ({ teams }) => teams,
  selectedTeamId: ({ selectedTeam }) => selectedTeam.id,
  selectedTeamName: ({ selectedTeam }) => selectedTeam.name,
  selectedTeamChannels: ({ selectedTeam }) => selectedTeam.channels
};

const mutations = {
  SET_TEAMS(state, allTeams) {
    state.teams = allTeams;
  },
  SET_SELECTED_TEAM(state, id) {
    state.selectedTeam = state.teams.filter(el => el.id === id)[0];
  },
  // DELETE
  // ADD_NEW_TEAM(state, team) {
  //   state.teams.push({ name: 'tt', id: 343242 });
  // },
  addCustomer(state, customer) {
    // mutate state
    state.teams.push(customer);
  }
};

const actions = {
  allTeams({ commit }) {
    console.log('actions.allTeams');
    allTeams({ commit });
  },

  // TODO ?????

  afterCreateTeam({ commit }, id) {
    console.log('actions.createTeam');
    createTeam({ commit });
    this.$store.commit('SET_SELECTED_TEAM', id);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
