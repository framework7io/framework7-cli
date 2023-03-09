// Import Vue
import { createApp } from 'vue';

// Import Framework7
import Framework7 from 'framework7/lite/bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

const app = createApp(App);

registerComponents(app);

app.mount('#app');

export default app;
