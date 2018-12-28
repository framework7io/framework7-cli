import HomePage from '../pages/home.vue';
import CreatePage from '../pages/create.vue';
import GenerateAssetsPage from '../pages/generate-assets.vue';

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
    path: '/generate-assets/',
    component: GenerateAssetsPage,
  },
];

export default routes;
