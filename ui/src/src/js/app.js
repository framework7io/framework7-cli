// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.js';
import Input from 'framework7/components/input/input';
import Dialog from 'framework7/components/dialog/dialog';
import ColorPicker from 'framework7/components/color-picker/color-picker';
import Popover from 'framework7/components/popover/popover';
import Range from 'framework7/components/range/range';
import Toggle from 'framework7/components/toggle/toggle';
import Popup from 'framework7/components/popup/popup';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

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
]);

// Init App
const app = new Vue({
  el: '#app',
  render: h => h(App),
  // Register App Component
  components: {
    app: App,
  },
});

export default app;
