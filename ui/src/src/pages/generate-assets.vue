<template>
  <f7-page name="generate-assets">
    <f7-navbar :sliding="false" large>
      <f7-nav-title>
        <i class="f7-navbar-logo"></i>
        <span>Generate Assets</span>
      </f7-nav-title>
      <f7-nav-title-large>
        <i class="f7-navbar-logo"></i>
        <span>Generate Assets</span>
      </f7-nav-title-large>
    </f7-navbar>

    <div class="center-content" v-if="project">
      <div class="row">
        <template v-if="project.type.indexOf('web') >= 0 || project.type.indexOf('pwa') >= 0">
          <div class="col-100 tablet-50">
            <f7-block-title>Web Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 512x512 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/web-icon.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="web-icon" @change="setImage('web-icon', $event.target.files[0])">
            </label>
          </div>
          <div class="col-100 tablet-50">
            <f7-block-title>Apple Touch Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>Square PNG image 256x256 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/apple-touch-icon.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="apple-touch-icon" @change="setImage('apple-touch-icon', $event.target.files[0])">
            </label>
          </div>
        </template>

        <template v-if="project.type.indexOf('cordova') >= 0">
          <div class="col-100 tablet-50" v-if="project.cordova.platforms.indexOf('ios') >= 0">
            <f7-block-title>Cordova iOS Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>Square PNG image 1024x1024 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-ios-icon.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="cordova-ios-icon" @change="setImage('cordova-ios-icon', $event.target.files[0])">
            </label>
          </div>

          <div class="col-100 tablet-50" v-if="project.cordova.platforms.indexOf('android') >= 0">
            <f7-block-title>Cordova Android Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 512x512 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-android-icon.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="cordova-android-icon" @change="setImage('cordova-android-icon', $event.target.files[0])">
            </label>
          </div>

          <div class="col-100 tablet-50" v-if="project.cordova.platforms.indexOf('electron') >= 0">
            <f7-block-title>Cordova Electron App Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 1024x1024 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-electron-app-icon.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="cordova-electron-app-icon" @change="setImage('cordova-electron-app-icon', $event.target.files[0])">
            </label>
          </div>

          <div class="col-100 tablet-50" v-if="project.cordova.platforms.indexOf('electron') >= 0">
            <f7-block-title>Cordova Electron Installer Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 1024x1024 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-electron-installer-icon.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="cordova-electron-installer-icon" @change="setImage('cordova-electron-installer-icon', $event.target.files[0])">
            </label>
          </div>

          <div class="col-100 tablet-50" v-if="project.cordova.platforms.indexOf('android') >= 0 || project.cordova.platforms.indexOf('ios') >= 0">
            <f7-block-title>Cordova Splash Screen</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 2732x2732 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-splash-screen.png')">
              </div>
              <f7-block-footer>{{dragText}}</f7-block-footer>
              <input type="file" name="cordova-splash-screen" @change="setImage('cordova-splash-screen', $event.target.files[0])">
            </label>
          </div>
        </template>
      </div>
      <f7-block inset class="no-padding" v-if="log && log.length">
        <pre class="round" v-html="logText(log)"></pre>
      </f7-block>
      <f7-block inset class="no-padding button-block">
        <f7-button v-if="!done && !error" :class="{loading: loading}" class="button-center-content" large fill round @click="generateAssets" icon-f7="gear_fill" :text="loading ? 'Generating assets...' : 'Generate Assets'"></f7-button>
        <f7-button v-if="done" class="button-center-content" large fill round icon-f7="check" text="Done" color="green"></f7-button>
        <f7-button v-if="error" class="button-center-content" large fill round icon-f7="close" text="Error" color="red"></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7BlockFooter, f7Block, f7List, f7ListInput, f7ListItem, f7Button } from 'framework7-vue';
  import logText from '../utils/log-text';
  import getLog from '../utils/get-log';

  export default {
    components: {
      f7Page, f7Navbar, f7NavTitle, f7NavTitleLarge, f7BlockTitle, f7BlockHeader, f7BlockFooter, f7Block, f7List, f7ListInput, f7ListItem, f7Button,
    },
    data() {
      return {
        uploading: null,
        loading: false,
        log: [],
        done: false,
        error: false,

        project: null,
        dragText: 'Drag & drop new image or click to choose file'
      };
    },
    mounted() {
      const self = this;
      const $$ = self.$$;
      self.$request.json('/api/project/', (project) => {
        self.project = project;
      });

      let timeout;

      $$(self.$el).on('dragenter dragleave dragover', '.drag-area', function (e) {
        e.preventDefault();
        const $el = $$(this);
        if (e.type !== 'dragleave') $el.closest('.drag-area').addClass('dragenter');
        else $el.closest('.drag-area').removeClass('dragenter');
      });
      $$(self.$el).on('drop', '.drag-area', function (e) {
        e.preventDefault();
        const $el = $$(this);
        $el.closest('.drag-area').removeClass('dragenter');
        const name = $el.closest('.drag-area').find('input').attr('name');
        const file = e.dataTransfer.files[0];
        self.setImage(name, file);
      });
    },
    methods: {
      logText,
      getLog() {
        const self = this;
        getLog(self, '/api/generate-assets/generate/');
      },
      getImage(src) {
        const self = this;
        if (self.uploading && src.indexOf(self.uploading) >= 0) return '';
        return `${src}?${new Date().getTime()}`;
      },
      setImage(name, file) {
        const self = this;
        if (!file) return;
        if (file.type !== 'image/png') {
          self.$f7.dialog.alert('Only PNG images please');
          return;
        }
        const fd = new FormData();
        fd.append(name, file);
        self.uploading = name;
        self.$request({
          method: 'post',
          contentType: 'multipart/form-data',
          url: '/api/generate-assets/upload/',
          data: fd,
          complete() {
            self.uploading = null;
          }
        });
      },
      generateAssets() {
        const self = this;
        if (self.loading) return;
        self.loading = true;
        self.$f7.request.postJSON('/api/generate-assets/generate/', {}, () => {
          self.getLog();
        });
      },
    }
  }
</script>