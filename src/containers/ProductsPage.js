import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import ProductItemView from '../components/ProductItemView';
import ProductShow from './ProductShow';

@inject('shop')
@observer
class ProductsPage extends Component {
  render() {
    const { shop, match } = this.props;
    const items = shop.products.data;

    return (
      <div className="container has-text-centered">
        <Switch>
          <div className="content">
            <div className="columns is-multiline">
              {items.map(product => (
                <ProductItemView key={product.id} product={product} match={match} />
              ))}
            </div>
          </div>
          <Route exact path={`/${match.url}/:productId`} component={ProductShow} />
        </Switch>
      </div>
    );
  }
}

export default ProductsPage;
