<template>
  <f7-app :params="f7params">
    <f7-view main class="ios-edges" url="/" :push-state="true" push-state-separator=""></f7-view>
  </f7-app>
</template>
<script>
  import { Utils } from 'framework7';
  import { f7App, f7View } from 'framework7-vue';
  import routes from '../js/routes.js';

  export default {
    components: {
      f7App, f7View,
    },
    data() {
      return {
        f7params: {
          name: 'Framework7 CLI',
          theme: 'aurora',
          routes: routes,
        },
      }
    },
  }
</script>