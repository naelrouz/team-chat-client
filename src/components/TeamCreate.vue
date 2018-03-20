<template lang="pug">
  f7-page
    f7-navbar(title='Back', back-link='Back')
    f7-block-title Team create

    f7-list.team_create__form(form='')
      f7-list-item
        f7-label Team name
        f7-input(
          type='text', 
          placeholder='Team name', 
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

import { createTeam } from '../api';
import ValidationHelper from '../libs/ValidationHelper';
import isAuth from '../libs/isAuth';

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
      // registerResponse: 'registerResponse'
    })
  },
  mounted() {},
  methods: {
    async onSubmit() {
      // const $$ = this.$$;
      const teamCreateFormVH = new ValidationHelper(this, '.team_create__form');

      console.log('onSubmit', app);

      const clientValidateStatus = teamCreateFormVH.validation();

      console.log('clientValidateStatus: ', clientValidateStatus);

      if (clientValidateStatus) {
        const team = {
          name: this.name
        };

        try {
          const { data: { createTeam: { status, errors } } } = await createTeam(
            team
          );

          if (status) {
            // if all ok
            // this.$f7router.navigate('/');
          } else {
            // if something is wrong with server-side validation
            console.log('createTeam.status: ', status);
            // console.log('registerResponse.errors: ', errors);

            teamCreateFormVH.setAllMessages(errors);
          }
        } catch (err) {
          console.log('createTeam.err: ', err.toString());
          if (err.toString() === 'Error: GraphQL error: Not authenticated') {
            console.log('GOTO: login');
            this.$f7router.navigate('/login/');
          }
        }
      }

      // TODO
    },
    onChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    }
  },
  beforeCreate() {
    if (!isAuth()) {
      console.log('GOTO: login');
      this.$f7router.navigate('/login/');
    }
  }
};
</script>
