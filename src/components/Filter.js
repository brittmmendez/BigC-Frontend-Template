import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('shop')
@observer
class Filter extends Component {
  constructor() {
    super();
    this.state = {
      select: '',
    };
  }

  handleFocus = () => {
    this.setState({
      select: '',
    });
  }

  handleChange = (event) => {
    this.props.shop.products.updateFilter(event.target.value);
  }

  render() {
    return (
      <form className="form">
        <div className="field is-horizontal">
          <div className="control is-expanded has-icons-left">
            <div className="select is-rounded is-primary">
              <select
                value={this.state.select}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
              >
                <option value="" disabled>Filter</option>
                <option value="24">Tampax</option>
                <option value="25">Always</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Filter;
