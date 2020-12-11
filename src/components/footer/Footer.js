import React from 'react'
import { Link } from 'gatsby'

import logo from '../../assets/logo.svg';
import caret from '../../assets/caret-right.svg';
import bootCountryLogo from '../../assets/boot-country-logo.svg';

// import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
// import twitter from '../img/social/twitter.svg'
// import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-container">
          <div>
            <h2 className="white-text">Save 20% off!</h2>
            <p className="footer-message white-text">Sign up to receive 20% off of your first order as well as deals and happenings from Boot Factory Outlet.</p>
            <form>
              <input style={{color: "black"}} type="email" placeholder="Email Address" />
              <input style={{backgroundImage: "url(" + caret + ")"}} type="submit" value="" />
            </form>
          </div>
          <div>
            <p className="footer-label white-text">Information</p>
            <ul>
              <li>
                <Link className="white-text" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="white-text" to="/returns">
                  Returns
                </Link>
              </li>
              <li>
                <Link className="white-text" to="/FAQ">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="white-text" to="/help">
                  Help
                </Link>
              </li>
              <li>
                <Link className="white-text" to="/stores">
                  Stores
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-logo-container">
            <div className="block-logo-container">
              <div className="split-logos">
                <Link to="/" title="Logo">
                  <img className="logo" style={{width: '100px'}} src={logo} alt="JB Dillon" />
                </Link>
                <Link to="/" title="Logo">
                  <img className="logo" src={bootCountryLogo} alt="JB Dillon" />
                </Link>
              </div>
              <p className="sub-text white-text">ⓒ 2020 Boot Factory Outlet. Privacy Policy, Do Not Sell, MAP Policy, Terms.</p>
            </div>
          </div>
        </div>
        {/* <div className="content has-text-centered has-text-white-ter" style={{ paddingBottom: '3em' }}>
          <div className="container has-text-white-ter">
            <div className="columns">
              <div className="column is-4">
              </div>
              <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/blog">
                        The Store Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="vimeo" href="https://vimeo.com">
                  <img
                    src={vimeo}
                    alt="Vimeo"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </footer>
    )
  }
}

export default Footer