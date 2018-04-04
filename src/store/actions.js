// import { allTeams } from '../api';

export default {
  async firstLoad({ dispatch, commit }) {
    await dispatch('allUsers');
    // await dispatch('userTeams');
    await dispatch('me');

    commit('SET_FIRST_LOAD_STATUS', true);
  }
};
