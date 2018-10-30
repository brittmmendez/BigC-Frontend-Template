import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import ProductItemView from '../components/ProductItemView';
import ProductShow from './ProductShow';
import LoadingView from '../components/LodaingView';

@inject('shop')
@observer
class SearchResults extends Component {
  render() {
    const { shop, match } = this.props;
    const { searchTerm } = match.params;
    const items = this.props.shop.productSearch(searchTerm);

    if (shop.products.data.length > 0) {
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
    return (
      <div className="spinner-container">
        <LoadingView />
      </div>
    );
  }
}

export default SearchResults;
