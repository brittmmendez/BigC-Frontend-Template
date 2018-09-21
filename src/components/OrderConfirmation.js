import React, { Component } from "react";
import { observer, inject} from 'mobx-react'

@inject("shop")
@observer
class OrderConfirmation extends Component {
  render() {
    const { orderConfirmation } = this.props.shop.checkout;
    
    return (
      <div class="container has-text-centered">
        {orderConfirmation.order_id !==0 && 
          <div class="content">
            <h1>Thanks, {orderConfirmation.first_name}! Your order is confirmed!</h1>
            <p> Confirmation Id: {orderConfirmation.order_id} </p>
            <p> Customer Id: {orderConfirmation.customer_id} </p>
            <p> Status Id: {orderConfirmation.status_id} </p>
            <p> Status: {orderConfirmation.status} </p>
            <p> Total: ${parseInt(orderConfirmation.total,10).toFixed(2)} </p>
          </div>}
      </div>
    );
  }
}
export default OrderConfirmation;
