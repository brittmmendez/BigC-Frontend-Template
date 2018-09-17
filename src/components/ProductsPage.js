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
    let items = shop.products.data.filter(item => item.id < 125)

    return (
    <div>
      <h1>Shop All</h1>
      <Switch>
            <ul>
              {items.map((product, idx) => (
              <ProductItemView key={idx} product={product} match={match}/>
              ))}
            </ul>
        <Route exact path={`/${match.url}/:productId`} component={ProductShow}/>
      </Switch>
    </div>
   ); 
  }
}

export default ProductsPage;
