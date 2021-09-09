import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useCookies } from 'react-cookie';
import TopSelling from '../topSelling/topSelling.js';

import closeIcon from '../../assets/close-icon.svg';

//Context
import { useContentContext } from 'src/context/ContentContextV2';

export default function HomePageContainer({
    products
}) {

    const {
        content
    } = useContentContext();

    const {
        heroImage = {},
        heroBogoBootIcon = {},
        heroHeaderText = "",
        heroSubText = "",
        heroButton = {},
        bootFactoryLogos = [],
        newSiteMessageText = "",
        newSiteSubMessageText = "",
        newSiteMessageInfoText = "",
        viewStoresButton = {},
        categoryCards = [],
        productHighlightImage = {},
        productHighlightHeaderText = "",
        productHighlightBrandText = "",
        productHighlightDescriptionText = "",
        productHighlightButton = {},
        storesHeaderText = "",
        storesSubHeaderText = "",
        storesDescriptionText = "",
        storesButton = {},
        storeImage = {},
        cookiesBannerText = "",
        optOutButtonText = "",
        acceptButtonText  = "",
        cookiesModalHeader = "",
        cookiesModalOptOutText = "",
        cookiesModalBrowserText = "",
        cookiesModalCancelButtonText = "",
        cookiesModalOptOutButtonText = "",
        cookiesModalDisclaimerText = "",
    } = content || {};

    // STATES 
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [showAlertBanner, setShowAlertBanner] = useState(false);
    const [showOptOutModal, setShowOptOutModal] = useState(false);
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
        setShowOptOutModal(false);
    }

    const createCookiesText = () => ({
        __html: cookiesBannerText ? cookiesBannerText : "",
    })

    useEffect(() => {
        !cookies.alertBanner && setShowAlertBanner(true)
    }, [cookies])

    return (
        <div className="homepage">
            <div className="homepage-hero"
                style={{backgroundImage: `url(${heroImage.url})`}}>
                <div className="opaque-overlay"></div>
                <div className="hero-content-container">
                    <img src={heroBogoBootIcon.url} alt="Bogo boots Icon" />
                    <h1>{heroHeaderText}</h1>
                    <p>{heroSubText}</p>
                    <Link to={heroButton.link}>{heroButton.text}</Link>
                </div>
            </div>

            <section className="container first-content-block">
                <div className="head">
                    <div className="head-content">
                        <div className="logos-split">
                            <img
                              style={{ width: '125px' }}
                              src={bootFactoryLogos[0].url}
                              alt="Boot Factory Outlet logo" />
                            <img
                              style={{ width: '200px' }}
                              src={bootFactoryLogos[1].url}
                              alt="Boot Country logo" />
                        </div>
                        <h2>{newSiteMessageText}</h2>
                        <p className="subtitle subtitle_2">{newSiteSubMessageText}</p>
                        <p className="description">{newSiteMessageInfoText}</p>
                        <Link to={viewStoresButton.link}>{viewStoresButton.text}</Link>
                    </div>
                </div>
                <div className="lower">
                    {categoryCards.length > 0 && categoryCards.map((i, id) => (
                      <div className="boot-block-card" key={id}>
                          <Link to={i.cardLink}>
                              <img src={i.cardImage.url} alt="Product category image" />
                              <div className="boot-block-info-container">
                                  <h2>{i.cardHeaderText}</h2>
                                  <span>{i.cardLinkText}</span>
                              </div>
                          </Link>
                      </div>
                    ))}
                </div>
            </section>
            <section className="homepage-hero-2">
                <div className="hero-left-image half-hero full-width-image margin-top-0"
                    style={{backgroundImage: `url(${productHighlightImage.url})`}}></div>
                <div className="half-hero half-hero-right">
                    <div>
                        <h2>{productHighlightHeaderText}</h2>
                        <p className="subtitle subtitle_2">{productHighlightBrandText}</p>
                        <p className="description">{productHighlightDescriptionText}</p>
                        <Link to={productHighlightButton.link}>{productHighlightButton.text}</Link>
                    </div>
                </div>
            </section>

            {/*FINISH ADDING GRAPHCMS CONTENT*/}
            <section className="container second-content-block">
                <TopSelling products={products} />
            </section>

            <section className="homepage-hero-3">
                <div className="half-hero half-hero-left">
                    <div>
                        <h2>{storesHeaderText}</h2>
                        <p className="subtitle subtitle_2">{storesSubHeaderText}</p>
                        <p className="description">{storesDescriptionText}</p>
                        <Link to={storesButton.link}>{storesButton.text}</Link>
                    </div>
                </div>
                <div className="hero-right-image half-hero full-width-image margin-top-0"
                    style={{backgroundImage: `url(${storeImage.url})`}}></div>
            </section>
            {showAlertBanner && (
                <div className="alert-banner">
                    <p dangerouslySetInnerHTML={createCookiesText()}></p>
                    <div>
                        <button className="opt-out" onClick={()=> setShowOptOutModal(true)}>{optOutButtonText}</button>
                        <button className="accept" onClick={closeAlertBanner}>{acceptButtonText}</button>
                    </div>
                </div>
            )
            }

            {showOptOutModal && (
                <div className="email-subscription-modal-opaque-background">
                    <div className="email-subscription-modal">
                        <div className="email-subscription-head">
                            <img src={closeIcon} alt="close" onClick={()=> setShowOptOutModal(false)} />
                        </div>
                        <div>
                            <h3 style={{marginBottom: '1rem'}}>{cookiesModalHeader}</h3>
                            <p style={{marginBottom: '1rem'}} className="email-subscription-description">
                                {cookiesModalOptOutText}
                            </p>
                            <p style={{marginBottom: '1rem'}} className="email-subscription-description">
                                {cookiesModalBrowserText}
                            </p>
                            <div className="opt-out-btn-container">
                                <button className="cancel" onClick={()=> setShowOptOutModal(false)}>
                                    {cookiesModalCancelButtonText}
                                </button>
                                <button className="opt-out" onClick={denyCookies}>
                                    {cookiesModalOptOutButtonText}
                                </button>
                            </div>

                        </div>
                        <p className="email-subscription-sub-text">
                            {cookiesModalDisclaimerText}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
