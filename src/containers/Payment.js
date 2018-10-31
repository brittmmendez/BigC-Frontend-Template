import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import ShopProductsBtn from '../components/ShopProductsBtn';

@inject('shop')
@observer
export default class Payment extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      cardnum: '',
      expiry: '',
      cvc: '',
    };
  }

    handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { shop } = this.props;
      shop.proccessOrder();
      this.props.history.push('/order-confirmation');
    }

    render() {
      if (this.props.shop.cart.itemCount > 0) {
        return (
          <div className="container has-text-centered">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Card Number</label>
                <div className="control has-icons-left">
                  <input
                    id="cardnum"
                    className="input"
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    value={this.state.cardnum}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-credit-card" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Expiration Date</label>
                <div className="control has-icons-left">
                  <input
                    id="expiry"
                    className="input"
                    type="text"
                    placeholder="MM / YY"
                    value={this.state.expiry}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-credit-card" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">CVC</label>
                <div className="control has-icons-left">
                  <input
                    id="cvc"
                    className="input"
                    type="text"
                    placeholder="CVC"
                    value={this.state.cvc}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-credit-card" />
                  </span>
                </div>
              </div>
              <div className="field">
                <p className="control has-text-centered">
                  <button className="button is-primary" type="submit">
                                    Submit Order
                  </button>
                </p>
              </div>
            </form>
            <h5>
              <a href="/my-cart">Back to Cart</a>
            </h5>
          </div>
        );
      }

      return (
        <section className="section">
          <div className="container  has-text-centered">
            <div className="content">
              <h1>Payment</h1>
              <h3>Sorry, you have no items in your cart yet!</h3>
              <ShopProductsBtn />
            </div>
          </div>
        </section>
      );
    }
}
