// Import Vue
import Vue from 'vue';
// import VueRouter from 'vue-router';
import multiLanguage from 'vue-multilanguage';

// import vueConfig from 'vue-config;

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle';
// import Framework7 from 'framework7';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle';
// import Framework7Vue from 'framework7-vue';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import routes from './routes';
// Import Vuex store
import store from './store';
// Apollo
import apolloProvider from './apollo/apollo-provider';

// Import Languages
import languages from './languages';

// Import App config
// import appConfigs from './app-config';

// Import App Component
import App from './App.vue';

// Init App config Vue Plugin
// Vue.use(vueConfig, appConfigs);

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);

// Init Multi-Language plugin for Vue.js
Vue.use(multiLanguage, languages);

// const router = new VueRouter({
//   mode: 'history',
//   routes
// });

// Init App
const FitLead = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'FitLead', // App name
    theme: 'md', // Automatic theme detection
    // root: '#app',
    // animateNavBackIcon: true,
    swipePanel: 'left',
    view: {
      // main: true,
      // pushState: true
    },
    // App routes
    routes
  },
  // router,
  store,
  apolloProvider,
  // Register App Component
  components: {
    app: App
  }
});


export { FitLead, Framework7 };
