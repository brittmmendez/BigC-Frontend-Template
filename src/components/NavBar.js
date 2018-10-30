
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import FormikSearch from './FormikSearch';
import Banner from './Banner';

@inject('shop')
@observer
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  }

  openNav = () => {
    this.setState({
      isActive: true,
    });
  }

  closeNav = () => {
    this.setState({
      isActive: false,
    });
  }

  render() {
    const { shop } = this.props;
    return (
      <div className="is-fixed-top">
        <Banner />
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <div className="navbar-item">
              <Link className="button" to="/">
                LOGO GOES HERE
              </Link>
            </div>
            <div className="navbar-burger burger" data-target="navMenu" onClick={this.toggleNav}>
              <span />
              <span />
              <span />
            </div>
          </div>


          <div id="navMenu" className={this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <Link className="navbar-item" to="/products-page" onClick={this.toggleNav}>
            All Products
            </Link>
            <div className="navbar-end">
              <div className="navbar-item" onClick={this.closeNav}>
                <div className="field is-grouped">
                  <Link className="navbar-item" to="/my-cart">
                    <span className="icon">
                      <i className="fas fa-shopping-cart" />
                    </span>
                  </Link>
                  <p className="control">
                    {!shop.user.loggedIn
                    && (
                    <Link className="navbar-item" to="/login">
                      <span className="icon">
                        <i className="fas fa-user" />
                      </span>
                    </Link>
                    )}
                    {shop.user.loggedIn
                    && (
                    <Link className="navbar-item" to="/account">
                      <span className="icon">
                        <i className="fas fa-user" />
                      </span>
                    </Link>
                    )}
                  </p>
                </div>
              </div>
              <div className="navbar-item">
                <FormikSearch closeNav={this.closeNav} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
