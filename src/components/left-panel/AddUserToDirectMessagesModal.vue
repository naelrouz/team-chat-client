<template lang="pug">
  f7-popup#add_user_to_direct_messages__modal
      f7-view
        f7-page
          f7-navbar(title='Add user to DirectMessages')
            f7-nav-right
              f7-link(popup-close='') Close
          //- f7-block
            //- f7-block-title Channel create
          f7-list#add_direct_messages_member__form(form='', v-if="currentTeamMembers.length > 0")
              f7-list-item
                f7-label Username
                autocomplete-dropdown-all(
                  :currentTeamMembers="currentTeamMembers",
                  @inputEmail="inputEmail"
                  )
              h1 inputEmail: {{email}}    
          f7-block        
            f7-button.col(fill='', raised='', color='green', @click='onSubmit') Add
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import { teamMembers, addDirectMessagesMember } from '../../api';

import AutocompleteDropdownAll from './AutocompleteDropdownAll';

import ValidationHelper from '../../libs/ValidationHelper';

export default {
  data() {
    return {
      email: ''
    };
  },
  computed: {
    ...mapGetters({
      currentTeamId: 'currentTeamId',
      currentTeamMembers: 'currentTeamMembers'
    })
  },
  methods: {
    async onSubmit() {
      // const $$ = this.$$;
      const form = new ValidationHelper(
        this,
        '#add_direct_messages_member__form'
      );

      const clientValidateStatus = form.validation();
      console.log('clientValidateStatus: ', clientValidateStatus);
      if (clientValidateStatus) {
        const newDirectMessagesMember = {
          email: this.email,
          teamId: this.currentTeamId
        };
        try {
          const {
            data: { addDirectMessagesMember: { status, errors } }
          } = await addDirectMessagesMember(newDirectMessagesMember);
          if (status) {
            this.$f7.popup.close();
          } else {
            // if something is wrong with server-side validation
            form.setAllMessages(errors);
            // console.log('registerResponse.errors: ', errors);
          }
          console.log('addTeamMember.status: ', status);
        } catch (err) {
          console.log('addTeamMember.err: ', err);
        }
      }
    },
    inputEmail(value) {
      // const { value } = event.target;
      this.email = value;
      // console.log('>>> inputEmail.value: ', value);
    }
  },
  mounted() {
    teamMembers({ teamId: this.currentTeamId });
  },
  components: {
    AutocompleteDropdownAll
  }
};
</script>
