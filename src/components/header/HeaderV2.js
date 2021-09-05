import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'gatsby';

// COMPONENTS
import InfoModal from 'src/components/infoModal/infoModal';
import NavDropDownV2 from 'src/components/navDropDown/NavDropDownV2';
import MobileMenuDropDownV2 from 'src/components/mobileMenuDropDown/MobileMenuDropDownV2';

//ASSESTS
import groupedBootsWhite from '../../assets/grouped-boots-white.svg';
import infoIconWhite from '../../assets/info-icon-white.svg';

// Contexts
import CartContext from '../../context/CartProvider';
import {useContentContext} from "src/context/ContentContextV2";

const HeaderV2 = () => {
  // STATES
  const [navBarActive, setNavBarActive] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(false);
  const [dropdownNavActive, setDropdownNavActive] = useState(false);
  const [dropdownType, setDropdownType] = useState('');
  const ref = useRef(null);

  const {
    content
  } = useContentContext();

  function toggleHamburger() {
    // toggle the active boolean in the state
    setNavBarActive(!navBarActive);
  };

  function toggleDropdownNav(type) {
    setDropdownType(type)
    setDropdownNavActive(true)
  }

  function closeDropDownNav() {
    setDropdownNavActive(false)
  }

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
  }, []);

  return (
    <header id="header" className='sticky' ref={ref}>
      <div className="global-announcement-bar" onClick={() => setActiveInfoModal(true)} >
        <img src={groupedBootsWhite} />
        <span>Buy 1 pair, get TWO pair FREE!</span>
        <img src={infoIconWhite} />
      </div>
      <div className="navbar-menu" role="navigation" aria-label="main-navigation">
        <div className="logo-container">
          <div className="mobile-menu">
            <img src={content.shared.navbar.mobileHamburgerLogo.url} alt="Mobile Menu Logo"
                 className={`pointer ${navBarActive && `is-active`}`}
                 data-target="navMenu"
                 onClick={toggleHamburger} />
            <div className={`opaque-background ${navBarActive && `is-active`}`} onClick={toggleHamburger}></div>
            <div className={`mobile-menu-drawer ${navBarActive && `is-active`} ${navBarActive && `animated fadeInLeft`}`}>
              <div className="mobile-menu-scrollable">
                {content.shared.navbar.navbarContent.map.length > 0 && content.shared.navbar.navbarContent.map((content, i) => <MobileMenuDropDownV2 content={content} key={i} />)}
                <div className="mobile-menu-links">
                  <Link to={content.shared.navbar.aboutLink.link}>{content.shared.navbar.aboutLink.text}</Link>
                </div>
                <div className="mobile-menu-links">
                  <Link to={content.shared.navbar.helpLink.link}>
                    {content.shared.navbar.helpLink.text}
                  </Link>
                </div>
              </div>
              <div className="mobile-menu-checkout-container">
                <CartContext.Consumer>
                  {value => {
                    const addNotification = value && value.addNotification;
                    return (
                      <div className="menu-item-bigcommerce-cart cart-icon-container" onClick={() => addNotification('test')}>
                        <button onClick={toggleHamburger}>
                          <img src={content.shared.navbar.cartIconWhite.url}  alt="Shopping Cart Icon"/>
                          <span>{content.shared.navbar.viewCartText}</span>
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
              <img className="logo" src={content.shared.navbar.bootFactoryLogo.url} alt="JB Dillon" />
            </Link>
          </div>
          <div className="mobile-cart">
            <CartContext.Consumer>
              {value => {
                const addNotification = value && value.addNotification;
                return (
                  <div className="navbar-item menu-item-bigcommerce-cart cart-icon-container" onClick={() => addNotification('test')}>
                    <img src={content.shared.navbar.cartIconBlack.url} alt="Shopping Cart Icon" />
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
            {content.shared.navbar.desktopHeaders.map(header => {
              const formatDropdownType = string => string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
              return (
                <Link
                  key={header.headerLink.text}
                  to={header.headerLink.link}
                  className="menu-link"
                  onMouseEnter={() => {
                    if(header.hasDropdown){
                      toggleDropdownNav(formatDropdownType(header.headerLink.text))
                    }
                  }}>
                  {header.headerLink.text}
                </Link>
              )
            })}
          </div>
        </nav>
        <div className="navbar-right">
          <Link className="side-link" to="/help">
            Help
          </Link>
          <CartContext.Consumer>
            {value => {
              const addNotification = value && value.addNotification;
              return (
                <div className="menu-item-bigcommerce-cart cart-icon-container" onClick={() => addNotification('test')}>
                  <img src={content.shared.navbar.cartIconBlack.url} alt="Shopping Cart Icon" />
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
        <NavDropDownV2 type={dropdownType} closeDropDownNav={closeDropDownNav} content={
          content.shared.navbar.navbarContent.filter(item =>
            item.dropdownIdentifier.toLowerCase() === dropdownType.toLowerCase()
          )
        }/>
      )}
      <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
    </header>
  )
}


export default HeaderV2;