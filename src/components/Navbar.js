import React from 'react';
import { Link } from 'gatsby';
import logo from '../assets/logo.svg';
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
        <div className="navbar-menu" role="navigation" aria-label="main-navigation"> 
          <div className="one-quarter logo-container">
            <Link to="/" title="Logo">
              <img className="logo" src={logo} alt="JB Dillon" />
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
          <nav className="one-half">
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
          <div className="one-quarter">
            <div className="navbar-end">
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
        </div>
      </header>
      // <header>
      //   <nav
      //     role="navigation"
      //     aria-label="main-navigation">
      //     <div className="container navbar-menu">
      //       <div className="navbar-brand">
      //         <Link to="/" title="Logo">
      //           <img src={logo} alt="JB Dillon" />
      //         </Link>
      //         {/* Hamburger menu */}
      //         <div
      //           className={`navbar-burger burger ${this.state.navBarActiveClass}`}
      //           data-target="navMenu"
      //           onClick={() => this.toggleHamburger()}>
      //           <span />
      //           <span />
      //           <span />
      //         </div>
      //       </div>
      //       <div
      //         id="navMenu"
      //         className={`navbar-menu ${this.state.navBarActiveClass}`}>
      //         <div className="navbar-menu has-text-centered">
      //         <Link to="/mens">
      //             Mens
      //           </Link>
      //           <Link to="/womens">
      //             Womens
      //           </Link>
      //           <Link to="/accessories">
      //             Accessories
      //           </Link>
      //           <Link to="/stores">
      //             Stores
      //           </Link>
      //           {/* <Link to="/about">
      //             About
      //           </Link> */}
      //           {/* <Link to="/products">
      //             Products
      //           </Link>
      //           <Link to="/blog">
      //             Blog
      //           </Link>
      //           <Link to="/contact">
      //             Contact
      //           </Link> */}
      //         </div>
      //         <div className="navbar-end has-text-centered">
      //           <Link to="/search">
      //             Search
      //           </Link>
      //           <Link to="/help">
      //             About
      //           </Link>
      //           <Link to="/login">
      //             Login/Register
      //           </Link>
      //           <CartContext.Consumer>
      //             {value => {
      //               return (
      //                 <Link className="navbar-item menu-item-bigcommerce-cart cart-icon-container" to="/cart">
      //                   <img src={cartIcon} alt="Cart" />
      //                   {value &&
      //                     value.state.cart &&
      //                     value.state.cart.numberItems > 0 && (
      //                       <span className="bigcommerce-cart__item-count full">{value.state.cart.numberItems}</span>
      //                     )}
      //                 </Link>
      //               );
      //             }}
      //           </CartContext.Consumer>
      //         </div>
      //       </div>
      //     </div>
      //   </nav>
      // </header>
    );
  }
};

export default Navbar;
