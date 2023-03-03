<Page name="product">
  <Navbar title={currentProduct.title} backLink="Back" />
  <BlockTitle>About {currentProduct.title}</BlockTitle>
  <Block>
    {currentProduct.description}
  </Block>
</Page>
<script>
  import { Page, Navbar, BlockTitle, Block, useStore } from 'framework7-svelte';

  export let f7route;

  const products = useStore('products');
  const productId = f7route.params.id;
  let currentProduct;
  products.forEach(function (product) {
    if (product.id === productId) {
      currentProduct = product;
    }
  });
</script>
