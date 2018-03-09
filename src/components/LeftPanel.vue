<template lang="pug">
  f7-page
    f7-navbar(title='Left Panel')
    f7-block(strong='')
        p Left panel content goes here
    f7-block-title Load page in panel
    f7-list
        f7-list-item(link='/', :title='HOME', view='#main-view', panel-close='')
        //- f7-list-item(link='/training/', :title='TRAINING', view='#main-view', panel-close='')
        f7-list-item(link='/trainings/', :title='TRAININGS', view='#main-view', panel-close='')        
        f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
        f7-list-item(link='/calendar/', :title='CALENDAR', view='#main-view', link-close-panel='')
                        
    f7-block-title Load page in main view
    f7-list
        f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
        f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')

</template>
<script>
import store from '../store/store';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      name: 'name'
    }),
    TRAINING() {
      return this.translate('TRAINING');
    },
    TRAININGS() {
      return this.translate('TRAININGS');
    },
    HOME() {
      return this.translate('HOME');
    },
    CALENDAR() {
      return this.translate('CALENDAR');
    }
  }
};
</script>