<template lang="pug">
  f7-page
    f7-navbar(title='Back', back-link='Back')
    f7-block-title 
      h3 Your teams
    
    f7-list
      f7-list-item(v-for='(team, index) in teams', @click="onClick(team.id)", :title='team.name', :key="team.id")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      teams: 'teams'
    })
  },
  mounted() {},
  methods: {
    onClick(id) {
      console.log('id: ', id);
      this.$store.commit('SET_SELECTED_TEAM', id);
      this.$f7router.navigate('/panel-left/');
    }
  }
};
</script>
