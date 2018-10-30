import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import ProductItemView from '../components/ProductItemView';
import ProductShow from './ProductShow';
import LoadingView from '../components/LodaingView';
import '../styles/App.scss';

@inject('shop')
@observer
class ProductsPage extends Component {
  render() {
    const { shop, match } = this.props;
    const items = shop.products.data;

    if (shop.products.data.length > 0) {
      return (
        <section className="section">
          <div className="container has-text-centered">
            <Switch>
              <div className="content">
                <div className="columns is-centered is-multiline">
                  {items.map(product => (
                    <ProductItemView key={product.id} product={product} match={match} />
                  ))}
                </div>
              </div>
              <Route exact path={`/${match.url}/:productId`} component={ProductShow} />
            </Switch>
          </div>
        </section>
      );
    }
    return (
      <div className="spinner-container">
        <LoadingView />
      </div>
    );
  }
}

export default ProductsPage;
