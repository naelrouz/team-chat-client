import _ from 'lodash';

import { allTeams } from '../../api/';

const state = {
  teams: [],
  currentTeamId: -1
};

const getters = {
  teams: ({ teams }) => teams,
  // currentTeamId: ({ currentTeam }) => currentTeam.id,
  // currentTeamName: ({ currentTeam }) => currentTeam.name,
  // currentTeamChannels: ({ currentTeam }) => currentTeam.channels
  //
  //
  //
  currentTeamId: ({ currentTeamId }) => currentTeamId,
  currentTeam: ({ teams, currentTeamId }) =>
    currentTeamId >= 0
      ? teams.filter(team => team.id === currentTeamId)[0]
      : teams[0],
  currentTeamName: ({ teams, currentTeamId }) => {
    console.log('getters.currentTeamName.currentTeamId: ', currentTeamId);
    console.log('getters.currentTeamName.teams: ', teams);

    // let currentTeamName = [];

    // if (currentTeamId >= 0) {
    //   currentTeamName = teams.find(el => el.id === parseInt(currentTeamId, 10))
    //     .name;
    //   console.log('getters.currentTeamName: ', currentTeamName);
    //   return currentTeamName;
    // }

    // currentTeamName = teams[0].name;

    // console.log(
    //   'getters.currentTeamChannels.currentTeamChannels: ',
    //   currentTeamName
    // );

    // return currentTeamName;

    // if (teams.length) {
    //   return 'Select team';
    // }

    return currentTeamId >= 0
      ? teams.find(el => el.id === parseInt(currentTeamId, 10)).name
      : teams[0].name;
  },
  currentTeamChannels: ({ teams, currentTeamId }) => {
    console.log('getters.currentTeamChannels.currentTeamId: ', currentTeamId);

    // let currentTeamChannels = [];

    // if (currentTeamId >= 0) {
    //   currentTeamChannels = teams.find(
    //     el => el.id === parseInt(currentTeamId, 10)
    //   ).channels;
    //   console.log(
    //     'getters.currentTeamChannels.currentTeamChannels: ',
    //     currentTeamChannels
    //   );
    //   return currentTeamChannels;
    // }

    // currentTeamChannels = teams[0].channels;

    // console.log(
    //   'getters.currentTeamChannels.currentTeamChannels: ',
    //   currentTeamChannels
    // );

    // return currentTeamChannels;

    return currentTeamId >= 0
      ? teams.filter(team => team.id === parseInt(currentTeamId, 10))[0]
          .channels
      : teams[0].channels;
  }
};

const mutations = {
  SET_TEAMS(state, allTeams) {
    state.teams = allTeams;
  },
  // async SET_CURRENT_TEAM(state, id) {
  //   state.currentTeam = await state.teams.filter(el => el.id === id)[0];
  // },
  SET_CURRENT_TEAM_ID(state, id) {
    console.log('SET_CURRENT_TEAM_ID.id:', id);

    state.currentTeamId = id;
  }
};

const actions = {
  async allTeams({ commit }) {
    console.log('actions.allTeams');
    await allTeams({ commit });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
