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
    direct-messages-members

    f7-link.team_channels__add_channel_modal_open(popup-open='#add_member_modal', v-if="isCanAddTeamMember")
      f7-block-title invite to team
      f7-icon.team_channels__add_icon(f7="add_round")

    f7-block-title Load page in main view
    f7-list
      f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
      f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')

    //- Popups
    channel-create-modal
    add-user-to-direct-messages-modal
    add-team-member-modal
    
</template>

<script>
// import components
import TeamChannels from './TeamChannels';
import ChannelCreateModal from './ChannelCreateModal';
import DirectMessagesMembers from './DirectMessagesMembers';
import AddTeamMemberModal from './AddTeamMemberModal';
import AddUserToDirectMessagesModal from './AddUserToDirectMessagesModal';

// import store from '../../store/index';
import { mapGetters } from 'vuex';
import { from } from 'apollo-link';
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
    onClickAddChannelModal() {},
    isCanAddTeamMember() {
      return true;
    }
  },
  components: {
    DirectMessagesMembers,
    AddTeamMemberModal,
    ChannelCreateModal,
    TeamChannels,
    AddUserToDirectMessagesModal
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
