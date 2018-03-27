import _ from 'lodash';

import { allTeams } from '../../api/';

const state = {
  teams: [],
  currentTeamId: -1,
  currentChannelId: -1
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

    try {
      return currentTeamId >= 0
        ? teams.find(el => el.id === currentTeamId).name
        : teams[0].name;
    } catch (err) {
      if (teams.length) {
        console.error('err: ', err);
      }
    }
  },
  currentTeamChannels: ({ teams, currentTeamId }) => {
    console.log('getters.currentTeamChannels.currentTeamId: ', currentTeamId);
    try {
      return currentTeamId >= 0
        ? teams.find(team => team.id === currentTeamId).channels
        : teams[0].channels;
    } catch (err) {
      if (teams.length) {
        console.error('err: ', err);
      }
    }
  },
  currentChannelName: ({ teams, currentTeamId, currentChannelId }) => {
    console.log('getters.currentTeamChannels.currentTeamId: ', currentTeamId);
    try {
      return currentTeamId >= 0
        ? teams
            .find(team => team.id === currentTeamId)
            .channels.find(channel => channel.id === currentChannelId).name
        : teams[0].channels[0].name;
    } catch (err) {
      if (teams.length && currentChannelId) {
        console.error('err: ', err);
      }
    }
  }
};

const mutations = {
  SET_TEAMS(state, allTeams) {
    state.teams = allTeams;
  },
  SET_CURRENT_TEAM_ID(state, teamId) {
    console.log('SET_CURRENT_TEAM_ID.id:', teamId);

    state.currentTeamId = teamId;
  },
  SET_CURRENT_CHANNEL_ID(state, channelId) {
    console.log('SET_CURRENT_TEAM_ID.id:', channelId);

    state.currentChannelId = channelId;
  }
};

const actions = {
  allTeams({ commit }) {
    console.log('actions.allTeams');
    allTeams({ commit });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
