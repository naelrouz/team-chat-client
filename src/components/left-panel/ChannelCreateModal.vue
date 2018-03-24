<template lang="pug">
  f7-popup#add_channel_modal
      f7-view
        f7-page
          f7-navbar(title='Channel create')
            f7-nav-right
              f7-link(popup-close='') Close
          f7-block
            //- f7-block-title Channel create
            f7-list#channel_create__form(form='')
              f7-list-item
                f7-label Channel name
                f7-input(
                  type='text', 
                  placeholder='', 
                  name='name', 
                  :value='name', 
                  @input="onChange($event)"
                  minlength=2,
                  maxlength=25,
                  required='', 
                  validate='',
                  clear-button=''
                )
              f7-button.col(fill='', raised='', color='green', @click='onSubmit') Create
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

import { createChannel } from '../../api';
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
      name: ''
    };
  },
  computed: {
    ...mapGetters({
      selectedTeamId: 'selectedTeamId'
    })
  },
  mounted() {},
  methods: {
    async onSubmit() {
      // const $$ = this.$$;
      const teamCreateFormVH = new ValidationHelper(
        this,
        '#channel_create__form'
      );

      console.log('onSubmit', app);

      const clientValidateStatus = teamCreateFormVH.validation();

      console.log('clientValidateStatus: ', clientValidateStatus);

      if (clientValidateStatus) {
        const newChannel = {
          name: this.name,
          teamId: this.selectedTeamId
        };

        try {
          const {
            data: { createChannel: { status, errors } }
          } = await createChannel(newChannel);

          if (status) {
            console.log('createChannel.status: ', status);

            this.$f7.popup.close();
            // this.$f7router.navigate('/');
          } else {
            // if something is wrong with server-side validation
            console.log('createChannel.status: ', status);
            // console.log('registerResponse.errors: ', errors);

            teamCreateFormVH.setAllMessages(errors);
          }
        } catch (err) {
          console.log('createTeam.err: ', err);
        }
      }
    },
    onChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    }
  },
  beforeCreate() {
    // if (!isAuth()) {
    //   console.log('GOTO: login');
    //   this.$f7router.navigate('/login/');
    // }
  }
};
</script>