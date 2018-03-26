// Pages
import Home from './components/Home.vue';
import About from './components/About.vue';
import Form from './components/Form.vue';
import DynamicRoute from './components/DynamicRoute.vue';
import NotFound from './components/NotFound.vue';
import Registration from './components/Registration.vue';
import Login from './components/Login.vue';
import TeamCreate from './components/TeamCreate.vue';
import Messages from './components/Messages.vue';

// LeftPanel
import LeftPanel from './components/left-panel/LeftPanel.vue';
import Teams from './components/left-panel/Teams.vue';

import RightPanel from './components/RightPanel.vue';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/panel-left/',
    component: LeftPanel
  },
  {
    path: '/teams/',
    component: Teams
  },
  {
    path: '/panel-right/',
    component: RightPanel
  },
  {
    path: '/registration/',
    component: Registration
  },
  {
    path: '/login/',
    component: Login
  },
  {
    path: '/team-create/',
    component: TeamCreate
    // on: {

    //   pageAfterIn(e, page) {
    //     // do something after page gets into the view
    //     console.log('pageAfterIn.e', e);
    //     console.log('pageAfterIn.page', page);

    //     const clientAuthStatus = isAuth();
    //     console.log('clientAuthStatus: ', clientAuthStatus);

    //     if (!clientAuthStatus) {
    //       console.log('GOTO: login');
    //       page.router.navigate('/login/');
    //     }
    //   }
    // }
  },

  {
    path: '/messages/:teamId/:channelId',
    component: Messages
  },
  {
    path: '/about/',
    component: About
  },
  {
    path: '/form/',
    component: Form
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoute
  },
  {
    path: '(.*)',
    component: NotFound
  }
];
