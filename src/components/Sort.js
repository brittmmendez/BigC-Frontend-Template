import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('shop')
@observer
class Sort extends Component {
  handleChange = (event) => {
    this.props.shop.products.updateSort(event.target.value);
  }

  render() {
    return (
      <form className="form">
        <div className="field is-horizontal">
          <div className="control is-expanded has-icons-left">
            <div className="select is-rounded is-primary">
              <span className="icon is-small is-left">
                <i className="fas fa-dollar-sign" />
              </span>
              <select onChange={this.handleChange}>
                <option value="" disabled selected>Price</option>
                <option value="ascending">Low to High</option>
                <option value="decending">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Sort;
