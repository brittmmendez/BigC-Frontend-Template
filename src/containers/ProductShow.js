import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PurchaseForm from './PurchaseForm';
import LoadingView from '../components/LodaingView';

@inject('shop')
@observer
class ProductShow extends Component {
  onProductButtonClick(product) {
    const { shop } = this.props;
    shop.basket.addToBasket(product);
  }

  render() {
    const { shop, match } = this.props;
    const params = parseInt(match.params.productId, 10);

    if (shop.products.data.length > 0) {
      const product = shop.products.data.filter(p => p.id === params)[0];
      const description = product.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, '');

      return (
        <div className="container has-text-centered">
          <div className="content">
            <h2>{product.name}</h2>
            <img src={product.thumbnail_url} alt="img" width="150px" height="150px" />
            <p>{description}</p>
            <h4>
              $
              {product.price.toFixed(2)}
            </h4>
            <PurchaseForm product={product} />
          </div>
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

export default ProductShow;
