<template lang="pug">

  f7-page
    //- f7-navbar(title='Back', back-link='Back')
    f7-block-title Login

    f7-list.login__form(form='')

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
        minlength=6,
        required='',
        validate='',
        @input="onChange($event)"
        )

      f7-button.col(fill='', raised='', color='green', @click='onSubmit') Login
      p Not register? 
        f7-link(href='/registration/') Create an account.

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { login } from '../api';
import ValidationHelper from '../libs/ValidationHelper';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters({
      token: 'token',
      refreshToken: 'refreshToken'
    })
  },
  mounted() {
    const app = this.$f7;
    console.log(app);
  },
  methods: {
    async onSubmit() {
      const loginFormVH = new ValidationHelper(this, '.login__form');
      const $$ = this.$$;

      const clientValidateStatus = loginFormVH.validation();

      console.log('validateStatus: ', clientValidateStatus);

      if (clientValidateStatus) {
        var { email, password } = this;
        const user = {
          email,
          password
        };

        try {
          const { data: { login: { status, errors } } } = await login(user);

          console.log('login.this.token: ', this.token);

          // console.log("login.status: ", status);
          // console.log("login.errors: ", errors);

          if (status) {
            // if all ok
            this.$f7router.navigate('/');
          } else {
            // if something is wrong with server-side validation
            loginFormVH.setAllMessages(errors);
          }
        } catch (err) {
          console.log('register.err: ', err);
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
