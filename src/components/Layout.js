import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './footer/Footer';
import Header from './header/Header';
import Notify from './bigcommerce/Notify';
import './all.scss';
import './Layout.css';
import useSiteMetadata from './SiteMetadata';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  const [headerHeight, setHeaderHeight] = useState(0)

  
  useEffect(() => {
    const offset = document.getElementById("header").offsetHeight;
    setHeaderHeight(offset - 1)
  })

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/img/favicon-16x16.png"
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
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
      <Header />
      <div style={{ marginTop: `${headerHeight}px` }}>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
