
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

  render() {
    const { shop } = this.props;
    return (
      <div className="is-fixed-top">
        <Banner />
        <nav className="navbar is-light is-mobile">
          <div className="navbar-brand">
            <Link class="navbar-item" to="/">
              <i className="fas fa-home fa-2x" />
            </Link>
            <div className="navbar-burger burger" onClick={this.toggleNav}>
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
                <div className="navbar-dropdown is-boxed">
                  <Link class="navbar-item" to="/product1">
                    Product1
                  </Link>
                  <Link class="navbar-item" to="/product2">
                    Product2
                  </Link>
                  <Link class="navbar-item" to="/product3">
                    Product3
                  </Link>
                  <Link class="navbar-item" to="/product4">
                    Product4
                  </Link>
                  <hr className="navbar-divider" />
                  <Link class="navbar-item" to="/products-page">
                    Shop All
                  </Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <p className="navbar-link" to="#">
                  About
                </p>
                <div className="navbar-dropdown is-boxed">
                  <Link class="navbar-item" to="/about1">
                    About1
                  </Link>
                  <Link class="navbar-item" to="/about2">
                    About2
                  </Link>
                  <Link class="navbar-item" to="/about3">
                    About3
                  </Link>
                  <Link class="navbar-item" to="/about4">
                    About4
                  </Link>
                  <hr className="navbar-divider" />
                  <Link class="navbar-item" to="/help">
                    Help
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <Link class="bd-tw-button button" to="/my-cart">
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
                      <Link class="bd-tw-button button" to="/login">
                        <span>Log In</span>
                      </Link>
                      )}
                    {shop.user.loggedIn
                      && (
                      <Link class="bd-tw-button button" to="/account">
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
