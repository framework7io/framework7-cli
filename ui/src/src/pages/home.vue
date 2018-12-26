<template>
  <f7-page name="home">
    <f7-navbar :sliding="false" large title="Create Framework7 App"></f7-navbar>

    <div class="center-content">
      <f7-block-title medium>Destination</f7-block-title>
      <f7-block-header>New Framework7 app will be created in following directory:</f7-block-header>
      <f7-block strong inset theme-dark>
        <pre>{{cwd}}</pre>
      </f7-block>
      <f7-block-title medium>App Type</f7-block-title>
      <f7-block-header>What types of the app are you targeting? (multiple allowed)</f7-block-header>
      <f7-list inset>
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
          title="Cordova app (target native iOS and Android)"
          @change="toggleType('cordova', $event.target.checked)"
          :checked="type.indexOf('cordova') >= 0"
        ></f7-list-item>
      </f7-list>

      <f7-block-title medium>App (project) name</f7-block-title>
      <f7-list inset>
        <f7-list-input
          type="text"
          required
          validate
          validate-on-blur
          :value="name"
          @input="name = $event.target.value"
        ></f7-list-input>
      </f7-list>

      <template v-if="type.indexOf('cordova') >= 0">
        <f7-block-title medium>App package (Bundle ID)</f7-block-title>
        <f7-list inset>
          <f7-list-input
            type="text"
            required
            validate
            validate-on-blur
            :value="pkg"
            @input="pkg = $event.target.value"
          ></f7-list-input>
        </f7-list>

        <f7-block-title medium>Target Cordova platform</f7-block-title>
        <f7-list inset>
          <f7-list-item
            checkbox
            title="iOS"
            @change="togglePlatform('ios', $event.target.checked)"
            :checked="platform.indexOf('ios') >= 0"
          ></f7-list-item>
          <f7-list-item
            checkbox
            title="Android"
            @change="togglePlatform('android', $event.target.checked)"
            :checked="platform.indexOf('android') >= 0"
          ></f7-list-item>

        </f7-list>
      </template>

      <f7-block-title medium>What type of framework do you prefer?</f7-block-title>
      <f7-list inset>
        <f7-list-item
          radio
          title="Framework7 Core"
          @change="(e) => { if (e.target.checked) framework = 'core' }"
          :checked="framework === 'core'"
        ></f7-list-item>
        <f7-list-item
          radio
          title="Framework7 with Vue.js"
          @change="(e) => { if (e.target.checked) { framework = 'vue'; bundler = 'webpack' } }"
          :checked="framework === 'vue'"
        ></f7-list-item>
        <f7-list-item
          radio
          title="Framework7 with React"
          @change="(e) => { if (e.target.checked) { framework = 'react'; bundler = 'webpack' } }"
          :checked="framework === 'react'"
        ></f7-list-item>
      </f7-list>

      <f7-block-title medium>Choose starter template</f7-block-title>
      <f7-list inset>
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
      </f7-list>

      <f7-block-title medium>Should we setup project with bundler?</f7-block-title>
      <f7-list inset>
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
      <f7-block-title medium>Do you want to specify custom theme color?</f7-block-title>
      <f7-list inset>
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
          label="Enter custom theme color in HEX format"
          placeholder="e.g. #ff0000"
          :value="color"
          @input="color = $event.target.value"
          required
          validate
        ></f7-list-input>
      </f7-list>
      <f7-block strong inset theme-dark v-if="log && log.length">
        <pre v-html="logText()"></pre>
      </f7-block>
      <f7-block inset class="display-flex justify-content-center">
        <f7-button v-if="!done && !error" :class="{loading: loading}" class="display-inline-flex align-items-center justify-content-center" style="width: 300px;" large fill round @click="createApp" icon-f7="gear_fill" :text="loading ? 'Creating app...' : 'Create App'"></f7-button>
        <f7-button v-if="done" class="display-inline-flex align-items-center justify-content-center" style="width: 300px;" large fill round icon-f7="check" text="Done" color="green"></f7-button>
        <f7-button v-if="error" class="display-inline-flex align-items-center justify-content-center" style="width: 300px;" large fill round icon-f7="close" text="Error" color="red"></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button } from 'framework7-vue';
  export default {
    components: {
      f7Page, f7Navbar, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button,
    },
    data() {
      return {
        cwd: this.$f7route.query.cwd,
        loading: false,
        log: [],
        done: false,
        error: false,

        name: 'My App',
        type: [],
        pkg: 'io.framework7.myapp',
        platform: ['ios', 'android'],
        framework: 'core',
        template: 'single-view',
        bundler: 'webpack',
        customColor: false,
        color: '',
      };
    },
    methods: {
      logText() {
        const self = this;
        return self.log
          .map((l) => {
            return l
              .replace(/\[1m/g, '')
              .replace(/\[22m/g, '')
              .replace(/\[32m/g, '')
              .replace(/\[34m/g, '')
              .replace(/\[36m/g, '')
              .replace(/\[39m/g, '')
              .replace(/\[90m/g, '')
              .replace(/↵/g, '\n')
              .trim();
          })
          .join('\n')
          .replace('https://patreon.com/vladimirkharlampidi', '<a href="https://patreon.com/vladimirkharlampidi" class="external" target="_blank">https://patreon.com/vladimirkharlampidi</a>')
      },
      toggleType(type, checked) {
        if (checked && this.type.indexOf(type) < 0) {
          this.type.push(type);
        } else if (!checked && this.type.indexOf(type) >= 0) {
          this.type.splice(this.type.indexOf(type), 1);
        }
      },
      togglePlatform(platform, checked) {
        if (checked && this.platform.indexOf(platform) < 0) {
          this.platform.push(platform);
        } else if (!checked && this.platform.indexOf(platform) >= 0) {
          this.platform.splice(this.platform.indexOf(platform), 1);
        }
      },
      getOptions() {
        const self = this;
        const {
          name,
          type,
          pkg,
          platform,
          framework,
          template,
          bundler,
          customColor,
          color,
        } = self;
        const options = {
          type,
          name,
          framework,
          template,
          bundler,
          customColor,
        };
        if (type.indexOf('cordova') >= 0) {
          options.pkg = pkg;
          options.platform = platform;
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
        self.$f7.request.json('/create/', (data) => {
          if (data.done) {
            self.done = true;
          }
          if (data.error) {
            self.error = true;
          }
          self.log = data.log;
          if (self.done || self.error) return;
          setTimeout(() => {
            self.getLog();
          }, 1000);
        });
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
          if (!options.platform.length) {
            self.showError('You must specify target cordova platform');
            return;
          }
        }
        if (!options.name) {
          self.showError('You must specify app name');
          return;
        }
        self.loading = true;
        self.$f7.request.postJSON('/create/', { options }, () => {
          self.getLog();
        });
      },
    }
  }
</script>