import Home from './components/Home.vue';
import About from './components/About.vue';
import Form from './components/Form.vue';
import DynamicRoute from './components/DynamicRoute.vue';
import NotFound from './components/NotFound.vue';

import Registration from './components/Registration.vue';

import PanelLeft from './components/LeftPanel.vue';
import PanelRight from './components/RightPanel.vue';

// const a: number = 5;

// console.log(a);

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/panel-left/',
    component: PanelLeft
  },
  {
    path: '/panel-right/',
    component: PanelRight
  },
  {
    path: '/registration/',
    component: Registration
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
