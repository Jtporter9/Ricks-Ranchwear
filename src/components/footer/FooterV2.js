import React from 'react'
import { Link } from 'gatsby'

//ASSETS
import caret from '../../assets/caret-right.svg';

// Contexts
import {useContentContext} from "src/context/ContentContextV2";

const FooterV2 = () => {
  const {
    content: {
      shared
    }
  } = useContentContext();
  return (
    <footer>
      <div className="footer-container">
        <div className="subscribe-link">
          <h2 className="white-text">{shared.footer.footerHeader}</h2>
          <p className="footer-message white-text">{shared.footer.footerSubHeader}</p>
          <form>
            <input style={{ color: "black" }} type="email" placeholder={shared.footer.emailSubscriptionInput.placeholder} />
            <input style={{ backgroundImage: "url(" + caret + ")" }} type="submit" value="" />
          </form>
          <p className="sub-text white-text copyright">ⓒ {shared.footer.copyrightText}</p>
        </div>
        <div>
          <p className="footer-label white-text">{shared.footer.infoLinksHeader}</p>
          <ul>
            {shared.footer.infoLinks.length > 0 && shared.footer.infoLinks.map((link, id) => (
              <li key={id}>
                <Link className="white-text" to={link.link}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-logo-container">
          <div className="block-logo-container">
            <div className="split-logos">
              <Link to="/" title="Logo">
                <img className="logo" style={{ width: '100px' }} src={shared.footer.bootFactoryLogos[0].url} alt="JB Dillon" />
              </Link>
              <Link to="/" title="Logo">
                <img className="logo" style={{ width: '225px' }} src={shared.footer.bootFactoryLogos[1].url} alt="JB Dillon" />
              </Link>
            </div>
            <div className="social-links">.
              {shared.footer.socialMediaLinks.length > 0 && shared.footer.socialMediaLinks.map((link, id) => (
                <a href={link.link} key={id} target={link.externalLink ? "_blank" : ""}>
                  <img src={link.imageOrAsset.url} alt="Social Media Link" />
                </a>
              ))}
            </div>
            <p className="sub-text white-text copyright">ⓒ {shared.footer.copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default FooterV2
