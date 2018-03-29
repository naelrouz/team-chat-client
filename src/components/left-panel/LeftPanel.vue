<template lang="pug">
  f7-page(v-if="teams")
    f7-navbar(title='')
      f7-link(href='/', view='#main-view', panel-close='', title="Go to main") 
        //- f7-icon.team_channels__add_icon(f7="person")
        | / {{ username }} /
    f7-block-title Current Team
    f7-list
        f7-list-item(link='/teams/', :title='currentTeamName')
   
    team-channels
    members

    f7-block-title Load page in main view
    f7-list
      f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
      f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')

    //- Popups
    channel-create-modal
    add-team-member-modal


</template>
<script>
// import components
import TeamChannels from './TeamChannels';
import ChannelCreateModal from './ChannelCreateModal';
import Members from './Members';
import AddTeamMemberModal from './AddTeamMemberModal';

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
    Members,
    AddTeamMemberModal,
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
