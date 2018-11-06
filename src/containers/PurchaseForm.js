import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('shop')
@observer
export default class PurchaseForm extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { product } = this.props;
    this.state = {
      product,
      quantity: 1,
      optionId: product.options[0] ? product.options[0].id : 0,
      optionValue: product.options[0] ? product.options[0].values[0].value_id : null,
    };
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value, 10),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { shop } = this.props;
    shop.cart.addToCart({
      item: this.props.product,
      quantity: this.state.quantity,
      optionValue: this.state.optionValue ? this.state.optionValue : 0,
    });
    this.setState({
      quantity: 1,
    });
  }

  render() {
    const { product } = this.props;

    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          {product.options[0]
            ? (
              <div className="field">
                <div className="select">
                  <select name="optionValue" onChange={this.handleOnChange}>
                    {product.options[0].values.map(value => (
                      <option name="optionValue" value={value.value_id}>{value.value_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

          <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input
                name="quantity"
                className="input"
                type="number"
                min="1"
                value={this.state.quantity}
                onChange={this.handleOnChange}
              />
            </div>
          </div>

          <button className="button is-primary" type="submit">
            ADD TO BAG
          </button>
        </form>
      </div>
    );
  }
}
