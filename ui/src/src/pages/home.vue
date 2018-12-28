<template>
  <f7-page name="home">
    <f7-navbar :sliding="false" large title="Framework7 CLI"></f7-navbar>

    <div class="center-content">
      <div class="block padding home-cards">
        <div class="card">
          <a href="/create/" class="card-content card-content-padding link">
            <i class="f7-icons">add_round_fill</i>
            <span>Create App</span>
          </a>
        </div>
        <div class="card">
          <a href="/generate-assets/" class="card-content card-content-padding link">
            <i class="f7-icons">images_fill</i>
            <span>Generate Assets</span>
          </a>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button } from 'framework7-vue';
  export default {
    components: {
      f7Page, f7Navbar, f7BlockTitle, f7BlockHeader, f7Block, f7List, f7ListInput, f7ListItem, f7Button,
    },
  }
</script>