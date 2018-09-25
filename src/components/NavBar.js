
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
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
            <Link className="navbar-item" to="/">
              <i className="fas fa-home fa-2x" />
            </Link>
            <div className="navbar-burger burger" data-target="navMenu" onClick={this.openNav}>
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navMenu" className={this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable">
                <p className="navbar-link" href="#">
                  Products
                </p>
                <div className="navbar-dropdown is-boxed" onClick={this.closeNav}>
                  <Link className="navbar-item" to="/product1">
                    Product1
                  </Link>
                  <Link className="navbar-item" to="/product2">
                    Product2
                  </Link>
                  <Link className="navbar-item" to="/product3">
                    Product3
                  </Link>
                  <Link className="navbar-item" to="/product4">
                    Product4
                  </Link>
                  <hr className="navbar-divider" />
                  <Link className="navbar-item" to="/products-page">
                    Shop All
                  </Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <p className="navbar-link" to="#">
                  About
                </p>
                <div className="navbar-dropdown is-boxed" onClick={this.closeNav}>
                  <Link className="navbar-item" to="/about1">
                    About1
                  </Link>
                  <Link className="navbar-item" to="/about2">
                    About2
                  </Link>
                  <Link className="navbar-item" to="/about3">
                    About3
                  </Link>
                  <Link className="navbar-item" to="/about4">
                    About4
                  </Link>
                  <hr className="navbar-divider" />
                  <Link className="navbar-item" to="/help">
                    Help
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped" onClick={this.closeNav}>
                  <p className="control">
                    <Link className="bd-tw-button button" to="/my-cart">
                      <span className="icon">
                        <i className="fas fa-shopping-cart" />
                      </span>
                      <span>
                        My Cart (
                        {shop.basket.itemCount}
                        )
                      </span>
                    </Link>
                  </p>
                  <p className="control">
                    {!shop.user.loggedIn
                      && (
                      <Link className="bd-tw-button button" to="/login">
                        <span>Log In</span>
                      </Link>
                      )}
                    {shop.user.loggedIn
                      && (
                      <Link className="bd-tw-button button" to="/account">
                        <span>My Account</span>
                      </Link>
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
