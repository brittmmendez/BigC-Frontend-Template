
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';


@inject('shop')
@observer
class ShopProductsBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  handleClick = () => {
    this.props.shop.products.resetProductList();
  }

  render() {
    return (
      <div>
        <Link className="button is-primary" to="/products-page" onClick={this.handleClick}>
          Shop Products
        </Link>
      </div>
    );
  }
}

export default ShopProductsBtn;
