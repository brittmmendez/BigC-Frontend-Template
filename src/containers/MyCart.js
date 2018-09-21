import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import { Link } from "react-router-dom";
import TotalAmount from '../components/TotalAmount'
import ShopProductsBtn from '../components/ShopProductsBtn'

@inject("shop")
@observer
class MyCart extends Component {
  render() {
    const { basket } = this.props.shop
    
    if (basket.items.length > 0) {
      return (
        <div class="container has-text-centered">
          <div class="content">
            <h1>My Cart</h1>
            {basket.items.map(item => (
              <div>
                <Link key={item.id} to={`/products-page/${item.item}`}>
                  <h4> {item.name} </h4>
                  <img src={item.thumbnail} alt="img" width="150px" height="150px"/>
                </Link>
                <h4 className="is-marginless"> {item.quantity} <i class="fas fa-times"></i> ${item.price} <i class="fas fa-equals"></i> ${item.productTotal}</h4>

                <button className="button" onClick={() => basket.removeFromBasket(item)}>
                  <i class="fas fa-trash-alt"></i>
                </button>

                <button className="button" onClick={() => basket.addToBasket({item: item,})}>
                  <i class="fas fa-plus"></i>
                </button>
                
                <button className="button" onClick={() => item.lowerCartQuantity()} disabled={item.quantity===1}>
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            ))}

            <Link className="button is-dark" to="/checkout">
              Checkout
            </Link>
          </div>
            <TotalAmount />
        </div>
      )
    }

    return (
      <div class="container  has-text-centered">
        <div class="content">
          <h1>My Cart</h1>
          <h3>Sorry, you have no items in your cart yet!</h3>
          < ShopProductsBtn/>
        </div>
      </div>
    );
  }
};

export default MyCart;
