<template>
  <f7-page name="catalog">
    <f7-navbar title="Catalog"></f7-navbar>
    <f7-list>
      <f7-list-item
        v-for="(product) in products"
        :key="product.id"
        :title="product.title"
        :link="`/product/${product.id}/`"
      ></f7-list-item>
    </f7-list>
    <f7-block v-if="products.length === 3">
      <f7-button fill @click="addProduct">Add Product</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  import { useStore } from 'framework7-vue';
  import store from '../js/store'

  export default {
    setup() {
      const products = useStore('products');

      const addProduct = () => {
        store.dispatch('addProduct', {
          id: '4',
          title: 'Apple iPhone 12',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        });
      }

      return {
        products,
        addProduct,
      };
    }
  };
</script>
