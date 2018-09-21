import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import ProductItemView from './ProductItemView'
import ProductShow from './ProductShow'
import { Route, Switch } from "react-router-dom";

@inject("shop")
@observer
class ProductsPage extends Component {
  render() {
    const { shop, match } = this.props;
    let items = shop.products.data

    return (
      <div class="container has-text-centered">
        <Switch>
        <div class="content">
          <div class="columns is-multiline">
            {items.map((product, idx) => (
              <ProductItemView key={idx} product={product} match={match}/>
            ))}
          </div>
        </div>
          <Route exact path={`/${match.url}/:productId`} component={ProductShow}/>
        </Switch>
      </div>
    ); 
  }
}

export default ProductsPage;
