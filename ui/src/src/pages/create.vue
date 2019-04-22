<template>
  <f7-page name="create">
    <f7-navbar :sliding="false" large>
      <f7-nav-title>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </f7-nav-title>
      <f7-nav-title-large>
        <i class="f7-navbar-logo"></i>
        <span>Create App</span>
      </f7-nav-title-large>
    </f7-navbar>

    <div class="center-content">
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">info_round</i>
          <span>General</span>
        </f7-block-title>

        <f7-block-title medium>Destination</f7-block-title>
        <f7-block-header>New Framework7 app will be created in the following directory:</f7-block-header>
        <f7-block class="no-padding">
          <pre class="round">{{cwd}}</pre>
        </f7-block>

        <f7-block-title medium>App Type</f7-block-title>
        <f7-block-header>What types of the app are you targeting? (multiple allowed)</f7-block-header>
        <f7-list no-hairlines-between>
          <f7-list-item
            checkbox
            title="Simple web app"
            @change="toggleType('web', $event.target.checked)"
            :checked="type.indexOf('web') >= 0"
          ></f7-list-item>
          <f7-list-item
            checkbox
            title="PWA (Progressive Web App)"
            @change="toggleType('pwa', $event.target.checked)"
            :checked="type.indexOf('pwa') >= 0"
          ></f7-list-item>
          <f7-list-item
            checkbox
            title="Cordova app (targets native iOS and Android apps, or native desktop app with Electron)"
            @change="toggleType('cordova', $event.target.checked)"
            :checked="type.indexOf('cordova') >= 0"
          ></f7-list-item>
        </f7-list>

        <f7-block-title medium>Meta</f7-block-title>
        <f7-list>
          <ul class="row">
            <f7-list-input
              class="col-100 tablet-50"
              type="text"
              label="App (project) name"
              clear-button
              required
              validate
              validate-on-blur
              :value="name"
              @input="name = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              class="col-100 tablet-50"
              v-if="type.indexOf('cordova') >= 0"
              type="text"
              label="App package (Bundle ID)"
              clear-button
              required
              validate
              validate-on-blur
              :value="pkg"
              @input="pkg = $event.target.value"
            ></f7-list-input>
            <li></li>
          </ul>
        </f7-list>
      </f7-block>


      <!-- CORDOVA -->
      <f7-block v-if="type.indexOf('cordova') >= 0" tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-cordova"></i>
          <span>Cordova</span>
          <div class="right">
            <span class="toggle-label disabled">Pro mode</span>
            <f7-toggle color="green" />
          </div>
        </f7-block-title>

        <f7-block-title>Target Cordova platform</f7-block-title>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col" :class="{checked: cordovaPlatform.indexOf('ios') >= 0}">
            <div class="col-icon" @click="togglePlatform('ios')">
              <i class="icon f7-icons">logo_apple</i>
            </div>
            <div class="col-label">iOS</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: cordovaPlatform.indexOf('android') >= 0}">
            <div class="col-icon" @click="togglePlatform('android')">
              <i class="icon f7-icons">logo_android</i>
            </div>
            <div class="col-label">Android</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: cordovaPlatform.indexOf('electron') >= 0}">
            <div class="col-icon" @click="togglePlatform('electron')">
              <i class="icon f7-icons">device_desktop</i>
            </div>
            <div class="col-label">Electron</div>
          </div>
        </div>
      </f7-block>


      <!-- FRAMEWORK -->
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">settings_fill</i>
          <span>Framework</span>
        </f7-block-title>

        <f7-block-title>What type of framework do you prefer?</f7-block-title>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col" :class="{checked: framework === 'core'}">
            <div class="col-icon" @click="framework = 'core'">
              <img src="../assets/logo.svg">
            </div>
            <div class="col-label">Framework7 Core</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: framework === 'vue'}">
            <div class="col-icon" @click="framework = 'vue'; bundler = 'webpack'">
              <img src="../assets/logo.svg">
              <img src="../assets/vuejs-logo.svg">
            </div>
            <div class="col-label">Framework7 with Vue.js</div>
          </div>
          <div class="col-33 checkbox-col" :class="{checked: framework === 'react'}">
            <div class="col-icon" @click="framework = 'react'; bundler = 'webpack'">
              <img src="../assets/logo.svg">
              <img src="../assets/react-logo.svg">
            </div>
            <div class="col-label">Framework7 with React</div>
          </div>
        </div>
      </f7-block>


      <!-- TEMPLATE -->
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">rocket_fill</i>
          <span>Starter template</span>
        </f7-block-title>

        <f7-block-title>Choose starter template</f7-block-title>
        <div class="row checkbox-row">
          <div class="col-33 checkbox-col checkbox-template-col" :class="{checked: template === 'single-view'}">
            <div class="col-icon" @click="template = 'single-view'">
              <img src="../assets/t-single-view.svg">
            </div>
            <div class="col-label">Single View</div>
          </div>
          <div class="col-33 checkbox-col checkbox-template-col" :class="{checked: template === 'tabs'}">
            <div class="col-icon" @click="template = 'tabs'">
              <img src="../assets/t-tabs.svg">
            </div>
            <div class="col-label">Tabbed Views (Tabs)</div>
          </div>
          <div class="col-33 checkbox-col checkbox-template-col" :class="{checked: template === 'split-view'}">
            <div class="col-icon" @click="template = 'split-view'">
              <img src="../assets/t-split-view.svg">
            </div>
            <div class="col-label">Split View (Split Panel)</div>
          </div>
        </div>
        <!-- <f7-list inset no-hairlines-between>
          <f7-list-item
            radio
            title="Single View"
            @change="(e) => { if (e.target.checked) template = 'single-view' }"
            :checked="template === 'single-view'"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Tabbed Views (Tabs)"
            @change="(e) => { if (e.target.checked) template = 'tabs' }"
            :checked="template === 'tabs'"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Split View (Split Panel)"
            @change="(e) => { if (e.target.checked) template = 'split-view' }"
            :checked="template === 'split-view'"
          ></f7-list-item>
        </f7-list> -->
      </f7-block>

      <!-- BUNDLER -->
      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="block-icon block-icon-webpack"></i>
          <span>Bundler</span>
          <div class="right">
            <span class="toggle-label disabled">Pro mode</span>
            <f7-toggle color="green" />
          </div>
        </f7-block-title>

        <f7-block-title>Should we setup project with bundler?</f7-block-title>
        <f7-list tablet-inset no-hairlines-between>
          <f7-list-item
            :class="{disabled: framework !== 'core'}"
            radio
            title="No bundler"
            @change="(e) => { if (e.target.checked) bundler = false }"
            :checked="bundler === false && framework === 'core'"
            :disabled="framework !== 'core'"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Webpack (recommended)"
            @change="(e) => { if (e.target.checked) bundler = 'webpack' }"
            :checked="bundler === 'webpack' || framework !== 'core'"
            :disabled="framework !== 'core'"
          ></f7-list-item>
        </f7-list>

        <template v-if="bundler ==='webpack'">
          <f7-block-title>Do you want to setup CSS Pre-Processor?</f7-block-title>
          <f7-list no-hairlines-between>
            <f7-list-item
              radio
              title="No, i am good with CSS"
              @change="(e) => { if (e.target.checked) cssPreProcessor = false }"
              :checked="cssPreProcessor === false"
            ></f7-list-item>
            <f7-list-item
              radio
              title="Less"
              @change="(e) => { if (e.target.checked) cssPreProcessor = 'less' }"
              :checked="cssPreProcessor === 'less'"
            ></f7-list-item>
            <f7-list-item
              radio
              title="Stylus"
              @change="(e) => { if (e.target.checked) cssPreProcessor = 'stylus' }"
              :checked="cssPreProcessor === 'stylus'"
            ></f7-list-item>
            <f7-list-item
              radio
              title="SCSS (SASS)"
              @change="(e) => { if (e.target.checked) cssPreProcessor = 'scss' }"
              :checked="cssPreProcessor === 'scss'"
            ></f7-list-item>

          </f7-list>
        </template>
      </f7-block>


      <f7-block tablet-inset strong class="content-block">
        <f7-block-title large>
          <i class="f7-icons block-icon">color_filter</i>
          <span>Color Themes</span>
        </f7-block-title>

        <f7-block-title>Do you want to specify custom theme color?</f7-block-title>
        <f7-list inset no-hairlines-between>
          <f7-list-item
            radio
            title="No, use default color theme"
            @change="(e) => { if (e.target.checked) customColor = false }"
            :checked="customColor === false"
          ></f7-list-item>
          <f7-list-item
            radio
            title="Yes, i want to specify my brand color"
            @change="(e) => { if (e.target.checked) customColor = true }"
            :checked="customColor === true"
          ></f7-list-item>
          <f7-list-input
            v-if="customColor"
            type="colorpicker"
            label="Enter custom theme color"
            placeholder="e.g. #ff0000"
            required
            validate
            :value="{ hex:color }"
            :colorPickerParams="{
              backdrop: false,
              targetEl: '.color-picker-target',
              targetElSetBackgroundColor: true,
              routableModals: false,
              modules: ['sb-spectrum', 'hue-slider', 'hex'],
              hexLabel: true,
              hexValueEditable: true,
              cssClass: 'theme-dark',
            }"
            @colorpicker:change="(v) => color = v.hex"
          >
            <i
              slot="media"
              class="icon color-picker-target"
              :style="{
                'border-radius': '4px',
                width: '18px',
                height: '18px',
              }"

            ></i>
          </f7-list-input>
        </f7-list>
      </f7-block>


      <f7-block-title>Include Icon Fonts?</f7-block-title>
      <f7-block-header>Do you want to include Framework7 Icons and Material Icons icon fonts?</f7-block-header>
      <f7-list tablet-inset>
        <f7-list-item
          radio
          title="Yes, include icon fonts"
          @change="(e) => { if (e.target.checked) iconFonts = true }"
          :checked="iconFonts === true"
        ></f7-list-item>
        <f7-list-item
          radio
          title="No, i want to use my own custom icons"
          @change="(e) => { if (e.target.checked) iconFonts = false }"
          :checked="iconFonts === false"
        ></f7-list-item>
      </f7-list>

      <f7-block tablet-inset class="no-padding" v-if="log && log.length">
        <pre class="round" v-html="logText(log)"></pre>
      </f7-block>
      <f7-block tablet-inset class="no-padding button-block">
        <f7-button v-if="!done && !error" :class="{loading: loading}" class="button-center-content" style="width: 300px;" large fill round @click="createApp" icon-f7="gear_fill" :text="loading ? 'Creating app...' : 'Create App'"></f7-button>
        <f7-button v-if="done" class="button-center-content" style="width: 300px;" large fill round icon-f7="check" text="Done" color="green"></f7-button>
        <f7-button v-if="error" class="button-center-content" style="width: 300px;" large fill round icon-f7="close" text="Error" color="red"></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button, f7Toggle, f7Checkbox, f7Radio } from 'framework7-vue';
  import logText from '../utils/log-text';
  import getLog from '../utils/get-log';

  export default {
    components: {
      f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button, f7Toggle, f7Checkbox, f7Radio
    },
    data() {
      return {
        loading: false,
        log: [],
        done: false,
        error: false,

        cwd: '',
        name: 'My App',
        type: [],
        pkg: 'io.framework7.myapp',
        cordovaPlatform: ['ios', 'android'],
        cordovaFolder: 'cordova',
        framework: 'core',
        template: 'single-view',
        bundler: 'webpack',
        cssPreProcessor: false,
        customColor: false,
        color: '#007aff',
        iconFonts: true,
      };
    },
    mounted() {
      const self = this;
      self.$request.json('/api/cwd/', ( { cwd } ) => {
        self.cwd = cwd;
      });
    },
    methods: {
      logText,
      toggleType(type, checked) {
        if (checked && this.type.indexOf(type) < 0) {
          this.type.push(type);
        } else if (!checked && this.type.indexOf(type) >= 0) {
          this.type.splice(this.type.indexOf(type), 1);
        }
      },
      togglePlatform(platform) {
        const self = this;
        if (self.cordovaPlatform.indexOf(platform) < 0) {
          self.cordovaPlatform.push(platform);
        } else if (self.cordovaPlatform.indexOf(platform) >= 0) {
          self.cordovaPlatform.splice(self.cordovaPlatform.indexOf(platform), 1);
        }
      },
      getOptions() {
        const self = this;
        const {
          name,
          type,
          pkg,
          cordovaPlatform,
          framework,
          template,
          bundler,
          cssPreProcessor,
          customColor,
          color,
          cordovaFolder,
          iconFonts,
        } = self;
        const options = {
          type,
          name,
          framework,
          template,
          bundler,
          cssPreProcessor,
          customColor,
          iconFonts,
        };
        if (options.bundler !== 'webpack') {
          options.cssPreProcessor = false;
        }
        if (type.indexOf('cordova') >= 0) {
          options.pkg = pkg;
          options.cordovaPlatform = cordovaPlatform;
          options.cordovaFolder = cordovaFolder;
        }
        if (customColor) {
          if (color.replace(/#/g, '').trim()) {
            options.color = color.replace(/#/g, '').trim();
          }
        }
        return options;
      },
      showError(message) {
        const self = this;
        self.$f7.dialog.alert(message);
      },
      getLog() {
        const self = this;
        getLog(self, '/api/create/');
      },
      createApp() {
        const self = this;
        if (self.loading) return;
        const options = self.getOptions();
        if (!options.type.length) {
          self.showError('You must specify app type (Web app, PWA or Cordova app)');
          return;
        }
        if (options.type.indexOf('cordova') >= 0) {
          if (!options.pkg.trim()) {
            self.showError('You must specify app package (bundle ID)');
            return;
          }
          if (!options.cordovaPlatform.length) {
            self.showError('You must specify target cordova platform');
            return;
          }
        }
        if (!options.name) {
          self.showError('You must specify app name');
          return;
        }
        self.loading = true;
        self.$f7.request.postJSON('/api/create/', { options }, () => {
          self.getLog();
        });
      },
    }
  }
</script>