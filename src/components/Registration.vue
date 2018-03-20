<template lang="pug">
  f7-page
    f7-navbar(title='Back', back-link='Back')
    f7-block-title Registration

    f7-list#registration__form(form='')
      f7-list-item
        f7-label Name
        f7-input(
          type='text', 
          placeholder='Name', 
          name='username', 
          :value='username', 
          @input="onChange($event)"
          minlength=2,
          maxlength=25,
          required='', 
          validate='',
          clear-button=''
        )

      f7-list-item
        f7-label E-mail
        f7-input(type='email', placeholder='E-mail', name='email', :value='email', 
        @input="onChange($event)",
        required='', 
        validate='',
        clear-button=''
        data-error-message="Invalid email"
      )
         
      f7-list-item
        f7-label Password
        f7-input(
          type='password', 
          placeholder='Password', 
          name='password', 
          :value='password',
          minlength=3,
          required='', 
          validate='',
          @input="onChange($event)"
        )
      
      f7-button.col(fill='', raised='', color='green', @click='onSubmit') Registration
      

    

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { register } from '../api';

import ValidationHelper from '../libs/ValidationHelper';

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
      username: '',
      email: '',
      password: ''
      // serverValidationErrors: []
      // phone: '',
      // gender: '',
      // isTrainer: '',
      // birthDate: ''
    };
  },
  computed: {
    ...mapGetters({
      registerResponse: 'registerResponse'
    })
  },
  mounted() {
    // setValidationErrorForF7(this, 'input[name=username]', '!!!!!!!!!!!!!');
  },
  methods: {
    async onSubmit() {
      // const $$ = this.$$;
      const regFormVH = new ValidationHelper(this, '#registration__form');

      console.log('onSubmit', app);

      const validateStatus = regFormVH.validation();

      console.log('validateStatus: ', validateStatus);

      if (validateStatus) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password
        };

        try {
          const { data: { register: { status, errors } } } = await register(
            user
          );

          if (status) {
            // if all ok
            this.$f7router.navigate('/');
          } else {
            // if something is wrong with server-side validation
            console.log('registerResponse.status: ', status);
            // console.log('registerResponse.errors: ', errors);

            regFormVH.setAllMessages(errors);
          }
        } catch (err) {
          console.log('register.err: ', err);
        }
      }

      // TODO
    },
    onChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    }
  }
};
</script>
