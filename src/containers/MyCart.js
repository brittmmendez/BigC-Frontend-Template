import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import { Link } from "react-router-dom";

@inject("shop")
@observer
class MyCart extends Component {
  render() {
    const { basket } = this.props.shop
    
    if (basket.items.length > 0) {
      return (
        <div>
          <h1>My Cart</h1>
          {basket.items.map(item => (
            <div >
              <Link key={item.id} to={`/products-page/${item.item}`}>
                <h2> {item.name} </h2>
                <img src={item.thumbnail} alt="img" width="15%" height="15%"/>
              </Link>
              <br/>
              <h4> {item.quantity} x ${item.price} = ${item.productTotal}</h4>

              <button onClick={() => basket.removeFromBasket(item)}>
                X 
              </button>

              <button onClick={() => basket.addToBasket({item: item,})}>
                + 
              </button>
              
              <button onClick={() => item.lowerCartQuantity()} disabled={item.quantity===1}>
                - 
              </button>
            </div>
          ))}

          <Link to="/checkout">
              <button className="button is-dark">
                Checkout
              </button>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h1>My Cart</h1>
        <h3>Sorry, there are no items in your cart!</h3>
        <Link class="button is-dark" to="/products-page">
          <span>Shop Products</span>
        </Link>
      </div>
    );
  }
};

export default MyCart;
