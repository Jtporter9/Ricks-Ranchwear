import React from 'react';
import { Link } from 'gatsby';
import github from '../img/github-icon.svg';
import logo from '../assets/logo.svg';
import closeIcon from '../assets/x-icon.svg';
import cartIcon from '../assets/cart-icon.svg';

import CartContext from '../context/CartProvider';

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ''
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active'
            })
          : this.setState({
              navBarActiveClass: ''
            });
      }
    );
  };

  render() {

    return (
      <header>
        <div id="announcementBar" className="announcement-bar">
            <p className="announcement-bar-message">Free shipping. Free exchanges. No nonsense.</p>
            <a id="closeAnnouncement" className="announcement-bar-close-icon" href="#announementBar"><img src={closeIcon} /></a>
        </div>
        <nav
          role="navigation"
          aria-label="main-navigation">
          <div className="container navbar-menu">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="Logo">
                <img src={logo} alt="JB Dillon" />
              </Link>
              {/* Hamburger menu */}
              <div
                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                data-target="navMenu"
                onClick={() => this.toggleHamburger()}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div
              id="navMenu"
              className={`navbar-menu ${this.state.navBarActiveClass}`}>
              <div className="navbar-menu has-text-centered">
              <Link className="navbar-item" to="/mens">
                  Mens
                </Link>
                <Link className="navbar-item" to="/womens">
                  Womens
                </Link>
                <Link className="navbar-item" to="/accessories">
                  Accessories
                </Link>
                <Link className="navbar-item" to="/stores">
                  Stores
                </Link>
                {/* <Link className="navbar-item" to="/about">
                  About
                </Link> */}
                {/* <Link className="navbar-item" to="/products">
                  Products
                </Link>
                <Link className="navbar-item" to="/blog">
                  Blog
                </Link>
                <Link className="navbar-item" to="/contact">
                  Contact
                </Link> */}
              </div>
              <div className="navbar-end has-text-centered">
                <Link className="navbar-item" to="/search">
                  Search
                </Link>
                <Link className="navbar-item" to="/help">
                  About
                </Link>
                <Link className="navbar-item" to="/login">
                  Login/Register
                </Link>
                <CartContext.Consumer>
                  {value => {
                    return (
                      <Link className="navbar-item menu-item-bigcommerce-cart cart-icon-container" to="/cart">
                        <img src={cartIcon} alt="Cart" />
                        {value &&
                          value.state.cart &&
                          value.state.cart.numberItems > 0 && (
                            <span className="bigcommerce-cart__item-count full">{value.state.cart.numberItems}</span>
                          )}
                      </Link>
                    );
                  }}
                </CartContext.Consumer>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
};

export default Navbar;
