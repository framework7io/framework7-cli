import React from 'react';
import { Page, Navbar, BlockTitle, Block, useStore } from 'framework7-react';

const ProductPage = (props) => {
  const productId = props.f7route.params.id;
  const products = useStore('products');

  var currentProduct;
  products.forEach(function (product) {
    if (product.id === productId) {
      currentProduct = product;
    }
  });
  return (
    <Page name="product">
      <Navbar title={currentProduct.title} backLink="Back" />
      <BlockTitle>About {currentProduct.title}</BlockTitle>
      <Block>{currentProduct.description}</Block>
    </Page>
  );
};

export default ProductPage;
