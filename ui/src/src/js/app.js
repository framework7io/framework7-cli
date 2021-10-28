// Import Vue
import { createApp } from 'vue';

// Import Framework7
import Framework7 from 'framework7/lite';
import Input from 'framework7/components/input';
import Dialog from 'framework7/components/dialog';
import ColorPicker from 'framework7/components/color-picker';
import Popover from 'framework7/components/popover';
import Range from 'framework7/components/range';
import Toggle from 'framework7/components/toggle';
import Popup from 'framework7/components/popup';
import Tooltip from 'framework7/components/tooltip';

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
Framework7.use([
  Input,
  Dialog,
  ColorPicker,
  Popover,
  Range,
  Toggle,
  Popup,
  Tooltip,
]);

const app = createApp(App);

registerComponents(app);

app.mount('#app');

export default app;
