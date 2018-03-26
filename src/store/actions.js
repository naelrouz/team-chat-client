import { allTeams } from '../api';

export default {
  firstLoad({ commit, dispatch }) {
    // dispatch('allUsers');
    // dispatch('allTeams');

    allTeams({ commit }).then(data => {
      console.log('data: ', data);
    });
  }
};
