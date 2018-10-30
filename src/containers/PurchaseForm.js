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
      optionValue: product.options[0] ? product.options[0].values[0].value_id : null,
    };
  }

  handleOptionChange = (event) => {
    this.setState({
      optionValue: parseInt(event.target.value, 10),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { shop } = this.props;
    shop.cart.addToCart({
      item: this.props.product,
      optionValue: this.state.optionValue ? this.state.optionValue : 0,
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
                  <select onChange={this.handleOptionChange}>
                    {product.options[0].values.map(value => (
                      <option value={value.value_id}>{value.value_name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

          <button className="button is-primary" type="submit">
            ADD TO BAG
          </button>
        </form>
      </div>
    );
  }
}
