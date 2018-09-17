
import React, { Component } from "react";
import { observer, inject} from 'mobx-react'
import { Link } from "react-router-dom";
import Banner from './Banner'

@inject("shop")
@observer
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  toggleNav = () => {
    this.setState(prevState => ({
        isActive: !prevState.isActive
    }))
  }

  render() {
    const { shop } = this.props;
    return (
      <div className="is-fixed-top">
        <Banner />
        <nav class="navbar is-light">
        <div class="navbar-brand">
            <Link class="navbar-item" to="/">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="100" height="10"/>
            </Link>
            <div class="navbar-burger burger" onClick={this.toggleNav}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navMenu" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                    <p class="navbar-link" href="#">
                    Products
                    </p>
                    <div class="navbar-dropdown is-boxed">
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
                        <hr class="navbar-divider"/>
                        <Link class="navbar-item" to="/products-page">
                            Shop All
                        </Link>
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <p class="navbar-link" to="#">
                    About
                    </p>
                    <div class="navbar-dropdown is-boxed">
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
                        <hr class="navbar-divider"/>
                        <Link class="navbar-item" to="/help">
                            Help
                        </Link>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="field is-grouped">
                <p class="control">
                    <Link class="bd-tw-button button" to="/my-cart">
                    <span class="icon">
                        <i class="fas fa-shopping-cart"></i>
                    </span>
                    <span>My Cart ({shop.basket.itemCount})</span>
                    </Link>
                </p>
                <p class="control">
                    <Link class="bd-tw-button button" to="login">
                    <span>Log In</span>
                    </Link>
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
