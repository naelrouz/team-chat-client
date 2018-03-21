export default {
  firstLoad({ dispatch }) {
    dispatch('allUsers');
    dispatch('allTeams');
  }
};
