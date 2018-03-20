import { allTeams } from "../../api/";

const state = {
  teams: [],
  selectedTeam: {}
};

const getters = {
  teams: ({ teams }) => teams,
  selectedTeamName: ({ selectedTeam }) => selectedTeam.name,
  selectedTeamChannels: ({ selectedTeam }) => selectedTeam.channels,
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
    console.log("actions.allTeams");
    allTeams({ commit });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
