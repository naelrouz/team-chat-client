// import { allTeams } from '../api';

export default {
  firstLoad({ dispatch }) {
    dispatch('allUsers');
    dispatch('allTeams');
  }
};
