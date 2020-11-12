<template>
  <f7-page>
    <f7-navbar :title="`${user.firstName} ${user.lastName}`" back-link="Back"></f7-navbar>
    <f7-block strong>
      {{user.about}}
    </f7-block>
    <f7-list>
      <f7-list-item
        v-for="(link, index) in user.links"
        :key="index"
        :link="link.url"
        :title="link.title"
        external
        target="_blank"
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    props: {
      user: Object,
    }
  }
</script>
