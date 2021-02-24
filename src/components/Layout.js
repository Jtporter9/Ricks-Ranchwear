import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useCookies } from 'react-cookie';
import Footer from './footer/Footer';
import Header from './header/Header';
import Notify from './bigcommerce/Notify';
import EmailSubscriptionModal from './emailSubscriptionModal/emailSubscriptionModal';

import './all.scss';
import './Layout.css';
import useSiteMetadata from './SiteMetadata';
import logo from '../assets/logo.svg';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies(['password'])

  const { password } = cookies;

  useEffect(() => {
    const offset = document.getElementById("header").offsetHeight;
    setHeaderHeight(offset - 1)
    !cookies.siteVisits && setCookie('siteVisits', 1)
    cookies.siteVisits && setCookie('siteVisits', cookies.siteVisits++)
  })

  function setPassword(e) {
    setCookie('password', e.target.previousSibling.value);
  }


  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={logo}
        />
        <link
          rel="icon"
          type="image/png"
          href={logo}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={logo}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={logo}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Helmet>
      <Notify />
      {password !== 'jbdillon' && (
        <div className="site-protection-container">
          <img src={logo} alt="Boot Factory" />
          <h2>Enter password to access site:</h2>
          <div className="input-container">
            <input type="password" />
            <input onClick={setPassword} type="submit" value="SUBMIT" />
          </div>
          {(password !== '' && password) && (
            <p className="wrong-password">Incorrect password</p>
          )}
        </div>
      )}
      <Header />
      {/* {cookies.siteVisits >= 2 && !cookies.emailSubscriptionSubmitted && (
        <EmailSubscriptionModal />
      )} */}
      <div style={{ marginTop: `${headerHeight}px` }}>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
