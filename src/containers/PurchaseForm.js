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
    this.state = {
      product: this.props.product,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { shop } = this.props;
    shop.basket.addToBasket({
      item: this.props.product,
    });
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <button className="button is-dark" type="submit">
            ADD TO BAG
          </button>
        </form>
      </div>
    );
  }
}
