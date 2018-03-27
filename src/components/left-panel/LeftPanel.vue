<template lang="pug">
  f7-page(v-if="teams")
    f7-navbar(title='Left Panel')
    f7-block(strong='')
        h2 / {{ username }} /
    f7-block-title Current Team
    f7-list
        f7-list-item(link='/teams/', :title='currentTeamName')
   
    team-channels

    f7-block-title Load page in main view
    f7-list
      f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
      f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')

    //- Popup
    channel-create-modal


</template>
<script>
// import components
import TeamChannels from './TeamChannels';

import ChannelCreateModal from './ChannelCreateModal';

// import store from '../../store/index';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      name: 'name',
      teams: 'teams',
      currentTeamName: 'currentTeamName',
      currentTeamChannels: 'currentTeamChannels',
      username: 'username'
    })
  },
  methods: {
    onClickAddChannelModal() {}
  },
  components: {
    ChannelCreateModal,
    TeamChannels
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
