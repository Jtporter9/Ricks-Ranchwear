import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useCookies } from 'react-cookie';
import TopSelling from '../topSelling/topSelling.js';

//Context
import {useContentContext} from 'src/context/ContentContext';

export default function HomePageContainer({
    post,
    products
}) {

    const content = useContentContext();
    const {
        categoryCardsContent = [],
        dynamicProductContent = {},
        heroContent = {},
        introContent = {},
        storesSectionContent = {},
        siteCookiesBannerContent = {}
    } = content || {}
    // STATES 
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [showAlertBanner, setShowAlertBanner] = useState(false);
    function closeAlertBanner() {
        setShowAlertBanner(false)
        setCookie('alertBanner', true);
        setCookie('allowCookies', true);
    }

    function denyCookies() {
        setShowAlertBanner(false)
        setCookie('alertBanner', true);
        setCookie('allowCookies', false);
        setCookie('emailSubscriptionExpiration', false)
    }
    
    useEffect(() => {
        !cookies.alertBanner && setShowAlertBanner(true)
    }, [cookies])
    
    return (
        <div className="homepage">
            <div className="homepage-hero"
                style={{
                    backgroundImage: `url(${!!heroContent.heroImage.image.childImageSharp ? heroContent.heroImage.image.childImageSharp.fluid.src : heroContent.heroImage.image
                        })`
                }}>
                <div className="opaque-overlay"></div>
                <div className="hero-content-container">
                    <img src={heroContent.heroBootsIcon.image.publicURL}  alt={heroContent.heroBootsIcon.altText}/>
                    <h1>{heroContent.heroHeading}</h1>
                    <p>{heroContent.heroSubHeading}</p>
                    <Link to={heroContent.heroBtn.link}>{heroContent.heroBtn.text}</Link>
                </div>
            </div>

            <section className="container first-content-block">
                <div className="head">
                    <div className="head-content">
                        <div className="logos-split">
                            <img style={{ width: '125px' }} src={introContent.logoImage.image.childImageSharp.fluid.src} alt={introContent.logoImage.altText}/>
                            <img style={{ width: '200px' }} src={introContent.bootCountryLogoImage.image.childImageSharp.fluid.src}  alt={introContent.bootCountryLogoImage.altText}/>
                        </div>
                        <h2>{introContent.welcomeHeading}</h2>
                        <p className="subtitle subtitle_2">{introContent.welcomeSubHeading}</p>
                        <p className="description">{introContent.introDescription}</p>
                        <Link to={introContent.viewStoresBtn.link}>{introContent.viewStoresBtn.text}</Link>
                    </div>
                </div>
                <div className="lower">
                    {categoryCardsContent.map((categoryCard, id) => (
                      <div className="boot-block-card" key={id}>
                          <Link to={categoryCard.linkBtn.link}>
                              <img src={categoryCard.categoryImage.image.childImageSharp.fluid.src} alt={categoryCard.categoryImage.altText}/>
                              <div className="boot-block-info-container">
                                  <h2>{categoryCard.categoryText}</h2>
                                  <span>{categoryCard.linkBtn.text}</span>
                              </div>
                          </Link>
                      </div>
                    ))}
                </div>
            </section>

            <section className="homepage-hero-2">
                <div className="hero-left-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${dynamicProductContent.productImage.image.childImageSharp.fluid.src})`
                    }}></div>
                <div className="half-hero half-hero-right">
                    <div>
                        <h2>{dynamicProductContent.heading}</h2>
                        <p className="subtitle subtitle_2">{dynamicProductContent.subHeading}</p>
                        <p className="description">{dynamicProductContent.description}</p>
                        <Link to={dynamicProductContent.linkBtn.link}>{dynamicProductContent.linkBtn.text}</Link>
                    </div>
                </div>
            </section>

            <section className="container second-content-block">
                <TopSelling products={products} />
            </section>

            <section className="homepage-hero-3">
                <div className="half-hero half-hero-left">
                    <div>
                        <h2>{storesSectionContent.heading}</h2>
                        <p className="subtitle subtitle_2">{storesSectionContent.subHeading}</p>
                        <p className="description">{storesSectionContent.description}</p>
                        <Link to={storesSectionContent.linkBtn.link}>{storesSectionContent.linkBtn.text}</Link>
                    </div>
                </div>
                <div className="hero-right-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${storesSectionContent.storeImage.image.childImageSharp.fluid.src})`
                    }}></div>
            </section>
            {showAlertBanner && (
                <div className="alert-banner">
                    <p>{siteCookiesBannerContent.mainText} <Link to={siteCookiesBannerContent.linkBtn.link}>{siteCookiesBannerContent.linkBtn.text}</Link></p>
                    <div>
                        <button className="opt-out" onClick={denyCookies}>OPT OUT</button>
                        <button className="accept" onClick={closeAlertBanner}>{siteCookiesBannerContent.closeText}</button>
                    </div>
                </div>
            )
            }
        </div>
    )
}
