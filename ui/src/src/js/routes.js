import HomePage from '../pages/home.vue';
import CreatePage from '../pages/create.vue';
import AssetsPage from '../pages/assets.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/create/',
    component: CreatePage,
  },
  {
    path: '/assets/',
    component: AssetsPage,
  },
];

export default routes;
