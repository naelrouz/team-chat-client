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
          minlength=3,
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
          minlength=6,
          required='', 
          validate='',
          @input="onChange($event)"
        )
      
      f7-button.col(fill='', raised='', color='green', @click='onSubmit') Registration
      

      //- f7-list-item
      //-   f7-label Phone
      //-   f7-input(type='tel', placeholder='Phone', :value='phone', @input="phone = $event.target.value") 
      
      //- f7-list-item
      //-   f7-label U is trainer
      //-   f7-input(type='select', :value='isTrainer', @input="isTrainer = $event.target.value")
      //-     option(selected='') no
      //-     option yes  
      //- f7-list-item
      //-   f7-label Gender
      //-   f7-input(type='select', :value='gender', @input="gender = $event.target.value")
      //-     option(selected='') Male
      //-     option Female
      //- f7-list-item
      //-   f7-label Birth date
      //-   f7-input(type='date', placeholder='Birth date', :value='birthDate', @input="birthDate = $event.target.value") 

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import api from '../api';

// helpers functions
const setValidationMessage = (_this, inputEl, validationMessage) => {
  const $ = _this.$$;

  const $inputEl = $(inputEl);
  if (!$inputEl.length) return;
  const $itemInputEl = $inputEl.parents('.item-input');
  // const validity = $inputEl[0].validity;

  // const validationMessage =
  //   $inputEl.dataset().errorMessage || $inputEl[0].validationMessage || '';

  // if (!validity) return;

  if (true) {
    let $errorEl = $inputEl.nextAll('.item-input-error-message');
    if (validationMessage) {
      if ($errorEl.length === 0) {
        $errorEl = $('<div class="item-input-error-message"></div>');
        $errorEl.insertAfter($inputEl);
      }
      $errorEl.text(validationMessage);
    }
    if ($errorEl.length > 0) {
      $itemInputEl.addClass('item-input-with-error-message');
    }
    $itemInputEl.addClass('item-input-invalid');
    $inputEl.addClass('input-invalid');
  } else {
    $itemInputEl.removeClass(
      'item-input-invalid item-input-with-error-message'
    );
    $inputEl.removeClass('input-invalid');
  }
};

const formValidate = (_this, form) => {
  const app = _this.$f7;
  const $$ = _this.$$;

  // app.input.validateInputs(form);

  $$(form)
    .find('input, textarea, select')
    .each((index, inputEl) => {
      app.input.validate(inputEl);

      // validate(_this, inputEl);
    });

  return $$(form)
    .find('input')
    .filter((index, el) => {
      return $$(el).hasClass('input-invalid');
    }).length > 0
    ? false
    : true;
};

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
      const $$ = this.$$;

      console.log('onSubmit', app);

      const validateStatus = formValidate(this, '#registration__form');

      console.log('validateStatus: ', validateStatus);

      if (validateStatus) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password
        };

        try {
          const { data: { register: { status, errors } } } = await api.register(
            user
          );

          if (status) {
            // if all ok
            this.$f7router.navigate('/');
          } else {
            // if something is wrong with server-side validation
            console.log('registerResponse.status: ', status);
            // console.log('registerResponse.errors: ', errors);

            // this.serverValidationErrors = errors;

            //

            // const errors = [
            //   { path: 'username', message: 'uername ERRRRRRRRRRR' },
            //   { path: 'email', message: 'email ERRRRRRRRRRR' }
            // ];

            errors.forEach(err => {
              const { path, message } = err;

              console.log('registerResponse.errors: ', `${path}: ${message}`);

              setValidationMessage(this, $$(`input[name="${path}"]`), message);
            });
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
