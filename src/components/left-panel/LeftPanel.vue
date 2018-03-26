<template lang="pug">
  f7-page
    f7-navbar(title='Left Panel')
    f7-block(strong='')
        h2 / {{ username }} /
    f7-block-title Current Team
    f7-list
        f7-list-item(link='/teams/', :title='currentTeamName')


    f7-block-title.team_channels_title
      | Team Channels      
      f7-link.team_channels__add_channel_modal_open(popup-open='#add_channel_modal')
        f7-icon.team_channels__add_icon(f7="add_round")
        //- f7-icon.team_channels__add_icon(material="add")
    f7-list
      f7-list-item(v-for='(channel, index) in currentTeamChannels', :link="`/messages/${channel.teamId}/${channel.id}`", :title='channel.name', :key="channel.id", view='#main-view', panel-close='')




    f7-block-title Load page in main view
    f7-list
      f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
      f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')

    //- Popup
    channel-create-modal


</template>
<script>
// import components
import ChannelCreateModal from './ChannelCreateModal';

import store from '../../store/index';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      name: 'name',
      currentTeamName: 'currentTeamName',
      currentTeamChannels: 'currentTeamChannels',
      username: 'username'
    })
  },
  methods: {
    onClickAddChannelModal() {}
  },
  components: {
    ChannelCreateModal
  }
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
