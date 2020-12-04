import React from 'react';
import { Link } from 'gatsby';
import logo from '../assets/logo.svg';
import hamburgerLogo from '../assets/hamburger.svg';
import searchLogo from '../assets/search.svg';
import cartIcon from '../assets/cart-icon.svg';
import caretDown from '../assets/caret-down.svg';
import upArrowWhite from '../assets/up-arrow-white.svg';

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
        <div className="navbar-menu" role="navigation" aria-label="main-navigation"> 
          <div className="logo-container">
            <div className="mobile-menu">
              <img src={hamburgerLogo} alt="Mobile Menu" 
                className={`pointer ${this.state.navBarActiveClass}`}
                data-target="navMenu"
                onClick={() => this.toggleHamburger()} />
              <div className={`opqaque-background ${this.state.navBarActiveClass}`} onClick={() => this.toggleHamburger()}></div>
              <div className={`mobile-menu-drawer ${this.state.navBarActiveClass}`}>
                <div className="mobile-search-container">
                  <input className="mobile-search" placeholder="Search" />
                </div>
                <div className="mobile-menu-dropdown-container">
                  <span>Mens <img src={caretDown} /></span>
                  <ul>
                    <li></li>
                  </ul>
                </div>
                <div className="mobile-menu-dropdown-container">
                  <span>Womens <img src={caretDown} /></span>
                  <ul>
                    <li></li>
                  </ul>
                </div>
                <div className="mobile-menu-dropdown-container">
                  <span>Kids <img src={caretDown} /></span>
                  <ul>
                    <li></li>
                  </ul>
                </div>
                <div className="mobile-menu-dropdown-container">
                  <span>Accessories <img src={caretDown} /></span>
                  <ul>
                    <li></li>
                  </ul>
                </div>
                <div className="mobile-menu-links">
                  <Link to="/womens">
                    Stores
                  </Link>
                </div>
                <div className="mobile-menu-links">
                  <Link to="/womens">
                    About
                  </Link>
                </div>
                <div className="mobile-menu-links">
                  <Link to="/womens">
                    Help
                  </Link>
                </div>
                <div className="mobile-menu-links">
                  <Link to="/womens">
                    Account
                  </Link>
                </div>
                <div className="mobile-menu-checkout-container">
                  <CartContext.Consumer>
                    {value => {
                    return (
                          <Link className="navbar-item menu-item-bigcommerce-cart cart-icon-container" to="/cart">
                            <button>
                              <img src={upArrowWhite} />
                              <span>View Cart</span> 
                              <span>( {value.state.cart.numberItems} )</span>
                            </button>
                          </Link>
                          );
                        }}
                  </CartContext.Consumer>
                </div>
              </div>
            </div>
            <div>
              <Link to="/" title="Logo">
                <img className="logo" src={logo} alt="JB Dillon" />
              </Link>
            </div>
            <div className="mobile-cart">
              <img src={searchLogo} alt="Search" 
                className={`search-icon pointer ${this.state.navBarActiveClass}`}
                data-target=""
                onClick={() => this.toggleHamburger()} />
              <CartContext.Consumer>
                {value => {
                return (
                      <Link className="navbar-item menu-item-bigcommerce-cart cart-icon-container" to="/cart">
                        <img src={cartIcon} alt="Cart" />
                        <span className="bigcommerce-cart__item-count full">{value.state.cart.numberItems}</span>
                      </Link>
                      );
                    }}
              </CartContext.Consumer>
            </div>
          </div>
          <nav className="desktop-links">
            <div className="navbar-menu has-text-centered">
              <Link className="menu-link" to="/mens">
                Mens
              </Link>
              <Link className="menu-link" to="/womens">
                Womens
              </Link>
              <Link className="menu-link" to="/kids">
                Kids
              </Link>
              <Link className="menu-link" to="/accessories">
                Accessories
              </Link>
              <Link className="menu-link" to="/stores">
                Stores
              </Link>
              {/* <Link className="menu-link" to="/about">
                About
              </Link> */}
              {/* <Link className="menu-link" to="/products">
                Products
              </Link>
              <Link className="menu-link" to="/blog">
                Blog
              </Link>
              <Link className="menu-link" to="/contact">
                Contact
              </Link> */}
            </div>
          </nav>
          <div className="navbar-right">
            <Link className="menu-link" to="/search">
              Search
            </Link>
            <Link className="menu-link" to="/help">
              About
            </Link>
            <Link className="menu-link" to="/login">
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
      </header>
    );
  }
};

export default Navbar;
