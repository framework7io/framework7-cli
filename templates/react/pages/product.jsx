import React from 'react';
import { Page, Navbar, BlockTitle, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    var productId = props.f7route.params.id;
    var currentProduct;
    this.$f7.data.products.forEach(function (product) {
      if (product.id === productId) {
        currentProduct = product;
      }
    });

    this.state = {
      product: currentProduct,
    };

  }
  render() {
    return (
      <Page name="product">
        <Navbar title={this.state.product.title} backLink="Back" />
        <BlockTitle>About {this.state.product.title}</BlockTitle>
        <Block strong>
          {this.state.product.description}
        </Block>
      </Page>
    );
  }
}