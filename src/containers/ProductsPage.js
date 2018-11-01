import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import ProductItemView from '../components/ProductItemView';
import ProductShow from './ProductShow';
import LoadingView from '../components/LodaingView';
import Sort from '../components/Sort';
import ShopProductsBtn from '../components/ShopProductsBtn';
import '../styles/App.scss';

@inject('shop')
@observer
class ProductsPage extends Component {
  render() {
    let items;
    const { shop, match } = this.props;
    const { sort, filter, searchTerm } = this.props.shop.products;

    if (searchTerm) {
      // Limit products by search term
      items = this.props.shop.productSearch(searchTerm);
    } else {
      // if no search, load all products
      items = shop.products.data;
    }

    // sorts items array formed from above
    if (sort === 'ascending') {
      items = items.sort((a, b) => a.price - b.price);
    } else if (sort === 'decending') {
      items = items.sort((a, b) => b.price - a.price);
    }

    // filters items array formed from above
    if (filter) {
      items = items.filter(item => item.categories[1] === parseInt(filter, 10));
    }

    if (shop.products.productCount > 0) {
      if (items.length > 0) {
        return (
          <section className="section">
            <Sort />
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
      } if (items.length === 0) {
        return (
          <section className="section">
            <Sort />
            <div className="container has-text-centered">
              <Switch>
                <div className="content">
                  <h1> No Products Found </h1>
                  <ShopProductsBtn />
                </div>
                <Route exact path={`/${match.url}/:productId`} component={ProductShow} />
              </Switch>
            </div>
          </section>
        );
      }
    }
    return (
      <div className="spinner-container">
        <LoadingView />
      </div>
    );
  }
}

export default ProductsPage;
