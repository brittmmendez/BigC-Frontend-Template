import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TotalAmount from '../components/TotalAmount';
import ShopProductsBtn from '../components/ShopProductsBtn';

@inject('shop')
@observer
class MyCart extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    basket: PropTypes.object.isRequired,
  };

  render() {
    const { basket } = this.props.shop;

    if (basket.items.length > 0) {
      return (
        <div className="container has-text-centered">
          <div className="content">
            <h1>My Cart</h1>
            {basket.items.map(item => (
              <div>
                <Link key={item.id} to={`/products-page/${item.item}`}>
                  <h4>
                    {item.name}
                  </h4>
                  <img src={item.thumbnail} alt="img" width="150px" height="150px" />
                </Link>
                <h4 className="is-marginless">
                  {item.quantity}
                  <i className="fas fa-times" />
                  $
                  {item.price}
                  <i className="fas fa-equals" />
                  $
                  {item.productTotal}
                </h4>

                <button className="button" type="button" onClick={() => basket.removeFromBasket(item)}>
                  <i className="fas fa-trash-alt" />
                </button>

                <button className="button" type="button" onClick={() => basket.addToBasket({ item })}>
                  <i className="fas fa-plus" />
                </button>

                <button className="button" type="button" onClick={() => item.lowerCartQuantity()} disabled={item.quantity === 1}>
                  <i className="fas fa-minus" />
                </button>
              </div>
            ))}

            <Link className="button is-dark" to="/checkout">
              Checkout
            </Link>
          </div>
          <TotalAmount />
        </div>
      );
    }

    return (
      <div className="container  has-text-centered">
        <div className="content">
          <h1>My Cart</h1>
          <h3>Sorry, you have no items in your cart yet!</h3>
          <ShopProductsBtn />
        </div>
      </div>
    );
  }
}

export default MyCart;
