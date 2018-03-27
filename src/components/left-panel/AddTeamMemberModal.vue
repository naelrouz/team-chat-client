<template lang="pug">
  f7-popup#add_member_modal
      f7-view
        f7-page
          f7-navbar(title='Add team member')
            f7-nav-right
              f7-link(popup-close='') Close
          f7-block
            //- f7-block-title Channel create
            f7-list#add_team_member__form(form='')
              f7-list-item
                f7-label Member email
                f7-input(
                  type='email', 
                  placeholder='E-mail', 
                  name='email', 
                  :value='email',
                  @input="onChange($event)",
                  required='',
                  validate='',
                  clear-button=''
                  data-error-message="Invalid email"
                  )
              f7-button.col(fill='', raised='', color='green', @click='onSubmit') Create
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import { addTeamMember } from '../../api';
import ValidationHelper from '../../libs/ValidationHelper';
// import isAuth from '../../libs/isAuth';

//  ====================

// const validateInputs(el) {
//   const app = this;
//   $(el).find('input, textarea, select').each((index, inputEl) => {
//     app.input.validate(inputEl);
//   });
// }

// =====================

// TODO validation on Submit

export default {
  data() {
    return {
      email: ''
    };
  },
  computed: {
    ...mapGetters({
      currentTeamId: 'currentTeamId'
    })
  },
  mounted() {},
  methods: {
    async onSubmit() {
      // const $$ = this.$$;
      const teamCreateFormVH = new ValidationHelper(
        this,
        '#add_team_member__form'
      );

      console.log('onSubmit', app);

      const clientValidateStatus = teamCreateFormVH.validation();

      console.log('clientValidateStatus: ', clientValidateStatus);

      if (clientValidateStatus) {
        const newMember = {
          email: this.email,
          teamId: this.currentTeamId
        };

        try {
          const {
            data: { addTeamMember: { status, errors } }
          } = await addTeamMember(newMember);

          if (status) {
            this.$f7.popup.close();
          } else {
            // if something is wrong with server-side validation
            teamCreateFormVH.setAllMessages(errors);
            // console.log('registerResponse.errors: ', errors);
          }
          console.log('addTeamMember.status: ', status);
        } catch (err) {
          console.log('addTeamMember.err: ', err);
        }
      }
    },
    onChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    }
  }
};
</script>