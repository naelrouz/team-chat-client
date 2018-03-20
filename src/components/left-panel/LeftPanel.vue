<template lang="pug">
  f7-page
    f7-navbar(title='Left Panel')
    f7-block(strong='')
        p Left panel content goes here
    f7-block-title Current Team
    f7-list
        f7-list-item(link='/teams/', :title='selectedTeamName')



    f7-block-title Team Channels
    f7-list
      f7-list-item(v-for='(channel, index) in selectedTeamChannels', link='/about/', :title='channel.name', :key="channel.id", view='#main-view', panel-close='')




    f7-block-title Load page in main view
    f7-list
      f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
      f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')

</template>
<script>
import store from "../../store/index";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      name: "name",
      selectedTeamName: 'selectedTeamName',
      selectedTeamChannels: 'selectedTeamChannels'
    }),
    channels() {
      return [{ id: 1, name: "Channal-1" }, { id: 2, name: "Channal-2" }];
    },
    TRAINING() {
      return this.translate("TRAINING");
    },
    TRAININGS() {
      return this.translate("TRAININGS");
    },
    HOME() {
      return this.translate("HOME");
    },
    CALENDAR() {
      return this.translate("CALENDAR");
    }
  }
};
</script>
