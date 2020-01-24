<Page name="product">
  <Navbar title={currentProduct.title} backLink="Back" />
  <BlockTitle>About {currentProduct.title}</BlockTitle>
  <Block strong>
    {currentProduct.description}
  </Block>
</Page>
<script>
  import { f7, Page, Navbar, BlockTitle, Block } from 'framework7-svelte';

  export let f7route;

  const productId = f7route.params.id;
  let currentProduct;
  f7.data.products.forEach(function (product) {
    if (product.id === productId) {
      currentProduct = product;
    }
  });
</script>
