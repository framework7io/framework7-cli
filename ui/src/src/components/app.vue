<template>
  <f7-app v-bind="f7params">
    <f7-view
      main
      class="ios-edges"
      url="/"
      :browser-history="true"
      browser-history-separator="#!"
    ></f7-view>
  </f7-app>
</template>
<script>
import { f7App, f7View } from 'framework7-vue';
import routes from '../js/routes.js';

export default {
  components: {
    f7App,
    f7View,
  },
  data() {
    return {
      f7params: {
        name: 'Framework7 CLI',
        theme: 'md',
        colors: {
          primary: '#EE350F',
        },
        darkMode: true,
        iosTranslucentBars: false,
        routes,
        navbar: {
          snapPageScrollToLargeTitle: false,
          snapPageScrollToTransparentNavbar: false,
        },
      },
    };
  },
};
</script>
