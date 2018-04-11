<template lang="pug">
  div.direct_messages
        f7-block-title.direct_messages_title
            | Direct Messages      
            f7-link.direct_messages__add_user_modal_open(popup-open='#add_user_to_direct_messages__modal')
                f7-icon.direct_messages__add_icon(f7="add_round")
                //- f7-icon.direct_messages__add_icon(material="add")
        f7-list
            f7-list-item(
                v-for='(user, index) in directMessagesMembers', 
                :link="`/messages/direct/${currentTeamId}/${user.id}`", 
                :title='user.username', 
                :key="user.id", 
                view='#main-view', 
                panel-close='')


</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      // directMessagesMembers: [{ username: 'U1', id: 2, teamId: 1 }]
    };
  },
  computed: {
    ...mapGetters({
      currentTeamId: 'currentTeamId',
      directMessagesMembers: 'directMessagesMembers'
    })
  },
  methods: {}
};
</script>

<style lang="stylus">
.direct_messages {
}

.direct_messages_title {
  padding: 0 0 4px 0;
  font-size: 21px;
  font-weight: 600;
}

.direct_messages__add_channel_modal_open {
  margin: 0 0 0 10px;
}

.direct_messages__add_icon {
  top: 2px;
  color: #fff;
  font-size: 21px;
}
</style>