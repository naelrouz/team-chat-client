<template lang="pug">
  f7-navbar
      f7-nav-left
        f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
      //- TODO navbar title 
      f7-nav-title(v-if="currentTeamName")
        //- f7-icon(f7="person") 
        | {{username}} / {{currentTeamName}} / {{currentChannelName}}
      f7-nav-right
        f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      username: 'username',
      currentTeamName: 'currentTeamName',
      currentChannelName: 'currentChannelName'
    })
  },
  created() {
    console.log('Navbar.created.currentTeamName: ', this.currentTeamName);
  }
};
</script>
