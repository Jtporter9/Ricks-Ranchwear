import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'gatsby';

// COMPONENTS
import InfoModal from '../infoModal/infoModal';
import NavDropDown from '../navDropDown/navDropDown';
import MobileMenuDropDown from '../mobileMenuDropDown/mobileMenuDropDown';

import { options } from '../navDropDown/navDropDownOptions';

//ASSESTS
import logo from '../../assets/logo.png';
import hamburgerLogo from '../../assets/hamburger.svg';
import searchLogo from '../../assets/search.svg';
import cartIcon from '../../assets/cart-icon.svg';
import cartIconWhite from '../../assets/cart-icon-white.svg';
import caretDown from '../../assets/caret-down.svg';
import caretUp from '../../assets/caret-up-dark.svg';
import groupedBootsWhite from '../../assets/grouped-boots-white.svg';
import infoIconWhite from '../../assets/info-icon-white.svg';
import upArrowWhite from '../../assets/up-arrow-white.svg';
import CartContext from '../../context/CartProvider';
import { set } from 'lodash';

export default function Header() {
  // STATES
  const [navBarActive, setNavBarActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState('');
  const [navBarActiveHelperClasses, setNavBarActiveHelperClasses] = useState('');
  const [isSticky, setSticky] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(false);
  const [dropdownNavActive, setDropdownNavActive] = useState(false);
  const [dropdownType, setDropdownType] = useState('');
  const ref = useRef(null);

  function toggleHamburger() {
    // toggle the active boolean in the state
    setNavBarActive(!navBarActive);
  };

  function toggleDropdownNav(type) {
    setDropdownType(type)
    setDropdownNavActive(true)
  }

  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  const handleClick = e => {
    if (!ref.current.contains(e.target)) {
      setDropdownNavActive(false);
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('mousedown', handleClick)
    };
    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', () => handleScroll);
    // };
  }, []);

  return (
    // <header className={`${isSticky ? ' sticky' : ''}`} ref={ref}>
    <header id="header" className='sticky' ref={ref}>
      <div className="global-announcement-bar" onClick={() => setActiveInfoModal(true)} >
        <img src={groupedBootsWhite} />
        <span>Buy 1 pair, get 2 pair free!</span>
        <img src={infoIconWhite} />
      </div>
      <div className="navbar-menu" role="navigation" aria-label="main-navigation">
        <div className="logo-container">
          <div className="mobile-menu">
            <img src={hamburgerLogo} alt="Mobile Menu"
              className={`pointer ${navBarActive && `is-active`}`}
              data-target="navMenu"
              onClick={toggleHamburger} />
            <div className={`opaque-background ${navBarActive && `is-active`}`} onClick={toggleHamburger}></div>
            <div className={`mobile-menu-drawer ${navBarActive && `is-active`} ${navBarActive && `animated fadeInLeft`}`}>
              <div className="mobile-menu-scrollable">
                {/* <div className="mobile-search-container">
                  <input className="mobile-search" placeholder="Search" />
                </div> */}
                {options.map((option, i) => <MobileMenuDropDown data={option} key={i} />)}

                <div className="mobile-menu-links">
                  <Link to="/about">
                    About
                  </Link>
                </div>
                <div className="mobile-menu-links">
                  <Link to="/help">
                    Help
                  </Link>
                </div>
                {/* <div className="mobile-menu-links">
                  <Link to="/">
                    Account
                  </Link>
                </div> */}
              </div>
              <div className="mobile-menu-checkout-container">
                <CartContext.Consumer>
                  {value => {
                    const addNotification = value && value.addNotification;
                    return (
                      <div className="menu-item-bigcommerce-cart cart-icon-container" onClick={() => addNotification('test')}>
                        <button onClick={toggleHamburger}>
                          <img src={cartIconWhite} />
                          <span>View Cart</span>
                          {value &&
                            value.state.cart && (
                              <span>( {value.state.cart.numberItems} )</span>
                            )}
                        </button>
                      </div>
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
            {/* <img src={searchLogo} alt="Search"
              className={`search-icon pointer ${navBarActiveClass}`}
              data-target=""
              onClick={toggleHamburger} /> */}
            <CartContext.Consumer>
              {value => {
                const addNotification = value && value.addNotification;
                return (
                  <div className="navbar-item menu-item-bigcommerce-cart cart-icon-container" onClick={() => addNotification('test')}>
                    <img src={cartIcon} alt="Cart" />
                    {value &&
                      value.state.cart && (
                        <span className="bigcommerce-cart__item-count full">{value.state.cart.numberItems}</span>
                      )}
                  </div>
                );
              }}
            </CartContext.Consumer>
          </div>
        </div>
        <nav className="desktop-links">
          <div className="desktop-links-inner">
            <span className="menu-link" onMouseEnter={() => toggleDropdownNav('Mens')}>
              Mens
          </span>
            <span className="menu-link" onMouseEnter={() => toggleDropdownNav('Womens')}>
              Womens
          </span>
            <span className="menu-link" onMouseEnter={() => toggleDropdownNav('Kids')}>
              Kids
          </span>
            <span className="menu-link" onMouseEnter={() => toggleDropdownNav('Stores')}>
              Stores
          </span>
          </div>
        </nav>
        <div className="navbar-right">
          {/* <img src={searchLogo} alt="Search"
            className={`search-icon pointer ${navBarActiveClass}`}
            data-target=""
            onClick={toggleHamburger} /> */}
          <Link className="side-link" to="/help">
            Help
        </Link>
          {/* <Link className="side-link" to="/login">
            Login/Register
        </Link> */}
          <CartContext.Consumer>
            {value => {
              const addNotification = value && value.addNotification;
              return (
                <div className="menu-item-bigcommerce-cart cart-icon-container" onClick={() => addNotification('test')}>
                  <img src={cartIcon} alt="Cart" />
                  {value &&
                    value.state.cart &&
                    value.state.cart.numberItems > 0 && (
                      <span className="bigcommerce-cart__item-count full">{value.state.cart.numberItems}</span>
                    )}
                </div>
              );
            }}
          </CartContext.Consumer>
        </div>
      </div>
      {dropdownNavActive && (
        <NavDropDown type={dropdownType} />
      )}

      <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
    </header>
  )
}
