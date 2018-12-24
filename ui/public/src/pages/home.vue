<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar :sliding="false" large>
      <f7-nav-title sliding>Framework7 CLI</f7-nav-title>
      <f7-nav-title-large sliding>Framework7 CLI</f7-nav-title-large>
    </f7-navbar>
    <!-- Toolbar-->
    <!-- <f7-toolbar bottom>
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar> -->

    <div class="center-content">
      <f7-block-title medium>App Type</f7-block-title>
      <f7-block-header>What types of the app are you targeting? (multiple allowed)</f7-block-header>
      <f7-list inset>
        <f7-list-item
          checkbox
          title="Simple web app"
          @change="toggleType('web', $event.target.checked)"
        ></f7-list-item>
        <f7-list-item
          checkbox
          title="PWA (Progressive Web App)"
          @change="toggleType('pwa', $event.target.checked)"
        ></f7-list-item>
        <f7-list-item
          checkbox
          title="Cordova app (target native iOS and Android)"
          @change="toggleType('cordova', $event.target.checked)"
        ></f7-list-item>
      </f7-list>

      <f7-block-title medium>App (project) name</f7-block-title>
      <f7-list inset>
        <f7-list-input
          type="text"
          required
          validate
          :value="name"
          @input="name = $event.target.value"
        ></f7-list-input>
      </f7-list>
    </div>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        name: 'My App',
        type: [],
        pkg: 'io.framework7.myapp',
        platform: ['ios', 'android'],
        framework: 'core',
        template: 'single-view',
        bundler: 'webpack',
        customColor: 'false',
        color: '',
      };
    },
  }
</script>