import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import defaultImage from '../static/images/Placeholder.png';

@inject('shop')
@observer
class ProductItemView extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
        <div className="box">
          <Link key={product.id} to={`/products-page/${product.id}`}>
            <h4>
              {product.name}
            </h4>
            <img src={product.thumbnail_url ? product.thumbnail_url : defaultImage} alt={product.name} width="150px" height="150px" />
          </Link>
          <p>
            $
            {product.price.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }
}

export default ProductItemView;
