import _ from 'lodash';

import { allTeams } from '../../api/';

const state = {
  teams: [],
  // currentTeam: { name: 'Select team', id: 0 }
  currentTeamId: null
};

const getters = {
  teams: ({ teams }) => teams,
  // currentTeamId: ({ currentTeam }) => currentTeam.id,
  // currentTeamName: ({ currentTeam }) => currentTeam.name,
  // currentTeamChannels: ({ currentTeam }) => currentTeam.channels
  currentTeamId: ({ currentTeamId }) => currentTeamId,
  //
  currentTeam: ({ teams, currentTeamId }) =>
    currentTeamId >= 0
      ? teams.filter(team => team.id === currentTeamId)[0]
      : teams[0],
  currentTeamName: ({ teams, currentTeamId }) =>
    currentTeamId >= 0
      ? teams.filter(team => team.id === currentTeamId)[0].name
      : teams[0].name,
  currentTeamChannels: ({ teams, currentTeamId }) =>
    currentTeamId >= 0
      ? teams.filter(team => team.id === currentTeamId)[0].channels
      : teams[0].channels
};

const mutations = {
  SET_TEAMS(state, allTeams) {
    state.teams = allTeams;
  },
  // async SET_CURRENT_TEAM(state, id) {
  //   state.currentTeam = await state.teams.filter(el => el.id === id)[0];
  // },
  SET_CURRENT_TEAM_ID(state, id) {
    state.currentTeamId = id;
  }
};

const actions = {
  async allTeams({ commit }) {
    console.log('actions.allTeams');
    await allTeams({ commit });
  }

  // TODO ?????

  // afterCreateTeam({ commit }, id) {
  //   console.log('actions.createTeam');
  //   createTeam({ commit });
  // }
};

export default {
  state,
  getters,
  mutations,
  actions
};
