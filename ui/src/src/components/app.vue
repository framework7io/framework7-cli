<template>
  <f7-app :params="f7params">
    <!-- Your main view, should have "view-main" class -->
    <f7-view main class="ios-edges" url="/"></f7-view>
  </f7-app>
</template>
<script>
  import { f7App, f7View } from 'framework7-vue';
  import routes from '../js/routes.js';

  export default {
    components: {
      f7App, f7View,
    },
    data() {
      return {
        f7params: {
          name: 'Framework7 CLI', // App name
          theme: 'auto', // Automatic theme detection
          // App routes
          routes: routes,
          navbar: {
            mdCenterTitle: true,
          },
        },
      }
    },
  }
</script>