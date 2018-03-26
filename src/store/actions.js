import { allTeams } from '../api';

export default {
  firstLoad({ commit, dispatch }) {
    dispatch('allUsers');
    dispatch('allTeams');
  }
};
