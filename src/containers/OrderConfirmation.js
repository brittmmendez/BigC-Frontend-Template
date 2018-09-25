import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import LoadingView from '../components/LodaingView';

@inject('shop')
@observer
class OrderConfirmation extends Component {
  render() {
    const { orderConfirmation } = this.props.shop.checkout;

    if (orderConfirmation.order_id !== 0) {
      return (
        <div className="container has-text-centered">
          <div className="content">
            <h1>
              Thanks
              {orderConfirmation.first_name}
              ! Your order is confirmed!
            </h1>
            <p>
              Confirmation Id:
              {orderConfirmation.order_id}
            </p>
            <p>
              Customer Id:
              {orderConfirmation.customer_id}
            </p>
            <p>
              Status Id:
              {orderConfirmation.status_id}
            </p>
            <p>
              Status:
              {orderConfirmation.status}
            </p>
            <p>
              Total: $
              {parseInt(orderConfirmation.total, 10).toFixed(2)}
            </p>
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
export default OrderConfirmation;
