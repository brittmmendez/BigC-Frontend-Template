import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PurchaseForm from './PurchaseForm';
import LoadingView from '../components/LodaingView';
import defaultImage from '../static/images/Placeholder.png';

@inject('shop')
@observer
class ProductShow extends Component {
  onProductButtonClick(product) {
    const { shop } = this.props;
    shop.cart.addToCart(product);
  }

  render() {
    const { shop, match } = this.props;
    const params = parseInt(match.params.productId, 10);

    if (shop.products.data.length > 0) {
      const product = shop.products.data.filter(p => p.id === params)[0];
      const description = product.description.replace(/(<p[^>]+?>|<p>|<\/p>)/img, '');

      return (
        <section className="section">
          <div className="container has-text-centered">
            <div className="content">
              <h2>{product.name}</h2>
              <img src={product.thumbnail_url ? product.thumbnail_url : defaultImage} alt={product.name} width="150px" height="150px" />
              <p>{description}</p>
              <h4>
                $
                {product.price.toFixed(2)}
              </h4>
              <PurchaseForm product={product} />
            </div>
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

export default ProductShow;
