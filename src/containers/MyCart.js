import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import { Link } from "react-router-dom";
import TotalAmount from './TotalAmount'
import ShopProductsBtn from '../components/ShopProductsBtn'

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
              <TotalAmount />
              <Link key={item.id} to={`/products-page/${item.item}`}>
                <h2> {item.name} </h2>
                <img src={item.thumbnail} alt="img" width="150px" height="150px"/>
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

          <Link className="button is-dark" to="/checkout">
            Checkout
          </Link>
        </div>
      )
    }

    return (
      <div>
        <h1>My Cart</h1>
        < ShopProductsBtn/>
      </div>
    );
  }
};

export default MyCart;
