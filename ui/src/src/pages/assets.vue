<template>
  <f7-page name="assets">
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
      <template v-if="project.type.indexOf('web') >= 0 || project.type.indexOf('pwa') >= 0">
        <f7-block-title medium>Web App Assets</f7-block-title>
        <div class="grid grid-cols-3 grid-gap">
          <div>
            <f7-block-title>Web Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 512x512 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/web-icon.png')" />
              </div>
              <f7-block-footer>{{ dragText }}</f7-block-footer>
              <input
                type="file"
                name="web-icon"
                @change="setImage('web-icon', $event.target.files[0])"
              />
            </label>
          </div>
          <div>
            <f7-block-title>Apple Touch Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>Square PNG image 256x256 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/apple-touch-icon.png')" />
              </div>
              <f7-block-footer>{{ dragText }}</f7-block-footer>
              <input
                type="file"
                name="apple-touch-icon"
                @change="setImage('apple-touch-icon', $event.target.files[0])"
              />
            </label>
          </div>
        </div>
      </template>

      <template v-if="project.type.indexOf('cordova') >= 0">
        <f7-block-title medium>Cordova Assets</f7-block-title>

        <div class="grid grid-cols-3 grid-gap">
          <div v-if="project.cordova.platforms.indexOf('ios') >= 0">
            <f7-block-title>iOS Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>Square PNG image 1024x1024 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-ios-icon.png')" />
              </div>
              <f7-block-footer>{{ dragText }}</f7-block-footer>
              <input
                type="file"
                name="cordova-ios-icon"
                @change="setImage('cordova-ios-icon', $event.target.files[0])"
              />
            </label>
          </div>

          <div v-if="project.cordova.platforms.indexOf('android') >= 0">
            <f7-block-title>Android Icon</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>Square PNG image 512x512 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-android-icon.png')" />
              </div>
              <f7-block-footer>{{ dragText }}</f7-block-footer>
              <input
                type="file"
                name="cordova-android-icon"
                @change="setImage('cordova-android-icon', $event.target.files[0])"
              />
            </label>
          </div>

          <div
            v-if="
              project.cordova.platforms.indexOf('android') >= 0 ||
              project.cordova.platforms.indexOf('ios') >= 0
            "
          >
            <f7-block-title>Splash Screen</f7-block-title>
            <label class="block block-strong inset drag-area">
              <f7-block-header>PNG image 2732x2732 size</f7-block-header>
              <div class="asset-preview">
                <img :src="getImage('/cwd/assets-src/cordova-splash-screen.png')" />
              </div>
              <f7-block-footer>{{ dragText }}</f7-block-footer>
              <input
                type="file"
                name="cordova-splash-screen"
                @change="setImage('cordova-splash-screen', $event.target.files[0])"
              />
            </label>
          </div>
        </div>
      </template>

      <f7-popup class="popup-log" :closeByBackdropClick="false" :opened="log && log.length > 0">
        <pre ref="logEl" v-html="logText(log)"></pre>
      </f7-popup>

      <f7-block inset class="no-padding button-block">
        <f7-button
          v-if="!done && !error"
          :class="{ loading: loading }"
          class="button-center-content"
          large
          fill
          round
          @click="generateAssets"
          icon-f7="gear_alt_fill"
          :text="loading ? 'Generating assets...' : 'Generate Assets'"
        ></f7-button>
        <f7-button
          v-if="done"
          class="button-center-content"
          large
          fill
          round
          icon-f7="checkmark_alt"
          text="Done"
          color="green"
        ></f7-button>
        <f7-button
          v-if="error"
          class="button-center-content"
          large
          fill
          round
          icon-f7="xmark"
          text="Error"
          color="red"
        ></f7-button>
      </f7-block>
    </div>
  </f7-page>
</template>
<script>
import { f7 } from 'framework7-vue';
import logText from '../utils/log-text';
import getLog from '../utils/get-log';

export default {
  data() {
    return {
      uploading: null,
      loading: false,
      log: [],
      done: false,
      error: false,

      project: null,
      dragText: 'Drag & drop new image or click to choose file',
    };
  },

  mounted() {
    const self = this;

    fetch('/api/project/')
      .then((res) => res.json())
      .then((res) => {
        self.project = res;
      });

    let timeout;

    f7.$(self.$el).on('dragenter dragleave dragover', '.drag-area', function (e) {
      e.preventDefault();
      const $el = f7.$(this);
      if (e.type !== 'dragleave') $el.closest('.drag-area').addClass('dragenter');
      else $el.closest('.drag-area').removeClass('dragenter');
    });
    f7.$(self.$el).on('drop', '.drag-area', function (e) {
      e.preventDefault();
      const $el = f7.$(this);
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
      getLog(self, '/api/assets/generate/');
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
        f7.dialog.alert('Only PNG images please');
        return;
      }
      const fd = new FormData();
      fd.append(name, file);
      self.uploading = name;
      request({
        method: 'post',
        contentType: 'multipart/form-data',
        url: '/api/assets/upload/',
        data: fd,
        complete() {
          self.uploading = null;
        },
      });
    },
    generateAssets() {
      const self = this;
      if (self.loading) return;
      self.loading = true;
      fetch('/api/assets/generate/', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        self.getLog();
      });
    },
  },
};
</script>
