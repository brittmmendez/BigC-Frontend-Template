import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('shop')
@observer
class LoadingView extends Component {
  render() {
    return (
      <div className="container has-text-centered">
        {!this.props.shop.products.productCount && (
        <div className="container">
          <div className="content has-text-centered">
            <i className="fa fa-spinner fa-pulse fa-7x fa-fw" />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default LoadingView;
