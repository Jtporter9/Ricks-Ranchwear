import React from 'react'
import { Link } from 'gatsby'

//ASSETS
import logo from '../../assets/logo.png';
import caret from '../../assets/caret-right.svg';
import bootCountryLogo from '../../assets/boot-country-logo.png';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import pintrest from '../../assets/pinterest.svg';
import mail from '../../assets/mail.svg';

const Footer = class extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-container">
          <div className="subscribe-link">
            <h2 className="white-text">Join The Family!</h2>
            <p className="footer-message white-text">Sign up to receive occasional promotions, store happenings, and more!</p>
            <form>
              <input style={{color: "black"}} type="email" placeholder="Email Address" />
              <input style={{backgroundImage: "url(" + caret + ")"}} type="submit" value="" />
            </form>
            <p className="sub-text white-text copyright">ⓒ 2020 Boot Factory Outlet. Privacy Policy, Do Not Sell, MAP Policy, Terms.</p>
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
                <Link className="white-text" to="/help#returns">
                  Returns
                </Link>
              </li>
              {/* <li>
                <Link className="white-text" to="/FAQ">
                  FAQ
                </Link>
              </li> */}
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
              <div className="social-links">
                <Link to="https://instagram.com/twofreeboots/"><img src={instagram} alt=""/></Link>
                <Link to="https://www.pinterest.com/twofreeboots/"><img src={pintrest} alt=""/></Link>
                <Link to="http://www.twofreeboots.com/?q=contact"><img src={mail} alt=""/></Link>
                <Link to="https://twitter.com/twofreeboots"><img src={twitter} alt=""/></Link>
                <Link to="http://www.facebook.com/bootcountrynashville"><img src={facebook} alt=""/></Link>
              </div>
              <p className="sub-text white-text copyright">ⓒ 2020 Boot Factory Outlet. Privacy Policy, Do Not Sell, MAP Policy, Terms.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
