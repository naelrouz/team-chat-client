// import _ from 'lodash';

import { userTeams } from '../../api/';

const state = {
  teams: [],
  currentTeamId: -1,
  currentChannelId: -1
};

const getters = {
  // Teams
  teams: ({ teams }) => {
    try {
      return teams;
    } catch (err) {
      console.log('getters.teams.err: ', err);
    }
  },
  isTeamOwner(state, getters) {
    try {
      return getters.currentTeam.owner === getters.userId;
    } catch (err) {
      console.error('getters.isTeamOwner.err: ', err.toString());
      return false;
    }
  },
  currentTeamId: ({ teams, currentTeamId }) => {
    try {
      return currentTeamId >= 0 ? currentTeamId : teams[0].id;
    } catch (err) {
      console.error('err: ', err.toString());
      return null;
    }
  },
  //
  currentTeam: ({ teams, currentTeamId }) =>
    currentTeamId >= 0
      ? teams.find(team => team.id === currentTeamId)
      : teams[0],
  //
  currentTeamName: (state, getters) => {
    console.log(
      'getters.currentTeamName.currentTeamId: ',
      getters.currentTeamId
    );
    console.log('getters.currentTeamName.teams: ', getters.teams);

    try {
      return getters.currentTeam.name;
    } catch (err) {
      console.error('err: ', err.toString());
      return null;
    }
  },
  // Channels
  currentChannelId: ({ currentChannelId }, getters) => {
    try {
      return currentChannelId >= 0
        ? currentChannelId
        : getters.currentTeamChannels[0].id;
    } catch (err) {
      console.error('currentChannelId.err: ', err.toString());
      return null;
    }
  },
  currentTeamChannels(state, getters) {
    console.log(
      'getters.currentTeamChannels.currentTeamId: ',
      getters.currentTeamId
    );
    try {
      return getters.currentTeam.channels;
    } catch (err) {
      if (getters.teams.length) {
        console.error('getters.currentTeamChannels.err: ', err.toString());
      }
      return null;
    }
  },
  currentChannel(state, getters) {
    console.log('state.currentChannelId: ', state.currentChannelId);
    try {
      return state.currentChannelId >= 0
        ? getters.currentTeamChannels.find(
            channel => channel.id === state.currentChannelId
          )
        : getters.currentTeamChannels[0];
    } catch (err) {
      console.error('getters.currentTeamChannels.err: ', err.toString());
      return null;
    }
  },
  currentChannelName: (state, getters) => {
    console.log(
      'getters.currentTeamChannels.currentTeamId: ',
      getters.currentTeamId
    );
    // console.log('>>> getters.currentChannel: ', getters.currentChannel);

    try {
      return getters.currentChannel.name;
    } catch (err) {
      console.error('err: ', err.toString());
      return null;
    }
  }
};

const mutations = {
  // SET_IS_T(state, param) {
  //   state.isT = !param;
  // },
  SET_TEAMS(state, userTeams) {
    state.teams = userTeams;
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
  // get data
  userTeams({ commit }) {
    console.log('actions.userTeams');
    return userTeams({ commit });
  },
  // Async functions
  isOwner({ getters }) {
    // console.log('>>>> getters.currentTeam: ',  getters.teams);

    return getters.currentTeam.owner === getters.userId;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
