<template lang="pug">
    div.team_channels
        f7-block-title.team_channels_title
            | Team Channels      
            f7-link.team_channels__add_channel_modal_open(popup-open='#add_channel_modal')
                f7-icon.team_channels__add_icon(f7="add_round")
                //- f7-icon.team_channels__add_icon(material="add")
        f7-list
            f7-list-item(
                v-for='(channel, index) in currentTeamChannels', 
                :link="`/messages/${channel.teamId}/${channel.id}`", 
                :title='channel.name', 
                :key="channel.id", 
                view='#main-view', 
                panel-close='')

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      currentTeamChannels: 'currentTeamChannels'
    })
  },
  methods: {}
};
</script>

<style lang="stylus">
.team_channels {
}

.team_channels_title {
    padding: 0 0 4px 0;
    font-size: 21px;
    font-weight: 600;
}

.team_channels__add_channel_modal_open {
    margin: 0 0 0 10px;
}

.team_channels__add_icon {
    top: 2px;
    color: #fff;
    font-size: 21px;
}
</style>