import { allTeams } from '../../api/';

const state = {
  teams: [],
  selectedTeam: { name: 'Select team', id: 0 }
};

const getters = {
  teams: ({ teams }) => teams,
  selectedTeamName: ({ selectedTeam }) => selectedTeam.name,
  selectedTeamChannels: ({ selectedTeam }) => selectedTeam.channels
};

const mutations = {
  SET_TEAMS(state, allTeams) {
    state.teams = allTeams;
  },
  SET_SELECTED_TEAM(state, id) {
    state.selectedTeam = state.teams.filter(el => el.id === id)[0];
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
