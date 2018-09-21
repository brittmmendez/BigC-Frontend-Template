import React from 'react';
import { Link } from 'react-router-dom';

const ShopProductsBtn = () => (
  <div>
    <Link className="button is-dark" to="/products-page">
      Shop Products
    </Link>
  </div>
);

export default ShopProductsBtn;
