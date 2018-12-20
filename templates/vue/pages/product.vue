<template>
  <f7-page name="product">
    <f7-navbar :title="product.title" back-link="Back"></f7-navbar>
    <f7-block-title>About {{product.title}}</f7-block-title>
    <f7-block strong>
      {{product.description}}
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data: function () {
      var productId = this.$f7route.params.id;
      var currentProduct;
      this.$f7.data.products.forEach(function (product) {
        if (product.id === productId) {
          currentProduct = product;
        }
      });
      return {
        product: currentProduct,
      };
    }
  };
</script>
