<template lang="pug">
  div.team_members
        f7-block-title.team_members_title
            | Team Members      
            f7-link.channels__add_channel_modal_open(popup-open='#add_member_modal')
                f7-icon.team_members__add_icon(f7="add_round")
                //- f7-icon.team_members__add_icon(material="add")
        //- f7-list
        //-     f7-list-item(
        //-         v-for='(channel, index) in currentTeamChannels', 
        //-         :link="`/messages/${channel.teamId}/${channel.id}`", 
        //-         :title='channel.name', 
        //-         :key="channel.id", 
        //-         view='#main-view', 
        //-         panel-close='')


</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // teams: 'teams'
    })
  },
  methods: {}
};
</script>

<style lang="stylus">
.team_members {
}

.team_members_title {
  padding: 0 0 4px 0;
  font-size: 21px;
  font-weight: 600;
}

.team_members__add_channel_modal_open {
  margin: 0 0 0 10px;
}

.team_members__add_icon {
  top: 2px;
  color: #fff;
  font-size: 21px;
}
</style>