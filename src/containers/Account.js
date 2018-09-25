import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('shop')
@observer
class Account extends Component {
  handleClick = () => {
    this.props.shop.user.logOut();
  };

  render() {
    const { shop } = this.props;
    return (
      <div>
        {shop.user.loggedIn && (
          <div>
            <h1>Welcome to your account page</h1>
            <h3>Previous orders will be isted here</h3>
            <button type="button" className="button is-dark" onClick={this.handleClick}>
              Log Out
            </button>
          </div>
        )}
        {!shop.user.loggedIn && (
        <div>
          <h1>Please sign in</h1>
          <h3>to view account</h3>
          <Link className="button is-dark" to="login">
            <span>Log In</span>
          </Link>
        </div>
        )}
      </div>
    );
  }
}

export default Account;
