<template lang="pug">
  f7-page
    navbar
    //- f7-toolbar
    //-   f7-link Left Link
    //-   f7-link Right Link
    //- f7-block(strong='')
    //-   p Here is your blank Framework7 app. Let's see what we have here.

    div.users_list
      f7-block-title.users_list__title Users
      f7-list
        f7-list-item(
        v-for='(user, i) in allUsersList',
        :key='user.id',
        :title='user.email'
        )


    f7-block-title Navigation


    f7-list
      //- f7-list-item(link='/trainings/', :title='TRAININGS', view='#main-view', panel-close='')

      f7-list-item(link='/login/', title='Login')
      f7-list-item(link='/registration/', title='Registration')
      f7-list-item(link='/team-create/', title='Team create')
      f7-list-item(link='/messages/', title='Messages')

      f7-list-item(link='/about/', title='About')
      f7-list-item(link='/form/', title='Form')


      f7-button(fill='', raised='', @click="testClick") testClick

    f7-block-title Modals
    f7-block(strong='')
      f7-row
        f7-col(width='50')
          f7-button(fill='', raised='', popup-open='#popup') Popup
        f7-col(width='50')
          f7-button(fill='', raised='', login-screen-open='#login-screen') Login Screen
    f7-block-title Panels
    f7-block(strong='')
      f7-row
        f7-col(width='50')
          f7-button(fill='', raised='', panel-open='left') Left Panel
        f7-col(width='50')
          f7-button(fill='', raised='', panel-open='right') Right Panel
    f7-list
      f7-list-item(link='/dynamic-route/blog/45/post/125/?foo=bar#about', title='Dynamic Route')
      f7-list-item(link='/load-something-that-doesnt-exist/', title='Default Route (404)')



</template>
<script>
import { f7Page, f7BlockTitle, f7List, f7ListItem } from 'framework7-vue';

import Navbar from './navbar/Navbar';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      allUsersList: 'allUsersList'
    }),
    TRAININGS() {
      return this.translate('TRAININGS');
    }
  },
  methods: {
    testClick() {
      this.$store.commit('addCustomer', {
        id: 99999,
        name: 'Team-!!!!!'
      });
    }
  },
  components: {
    Navbar
  }
};
</script>
