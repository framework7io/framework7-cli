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
  import { useStore } from 'framework7-vue';

  export default {
    props: {
      f7route: Object,
    },
    setup(props) {
      const products = useStore('products');
      const productId = props.f7route.params.id;
      let currentProduct;
      products.value.forEach(function (product) {
        if (product.id === productId) {
          currentProduct = product;
        }
      });
      return {
        product: currentProduct,
      };
    },
  };
</script>
