import React, { useContext } from 'react';
import { Link, graphql } from 'gatsby';
import AppContext from '../../context/AppContext';
import PhotoGrid from '../PhotoGrid';
import BlogItem from '../BlogItem';
import TopSelling from '../topSelling/topSelling.js';
import bootsImg from '../../assets/boots.svg';
import logo from '../../assets/logo.svg';
import dirtyBoots from '../../assets/dirty-boots.jpg';
import bootsBlueBg from '../../assets/boots-blue-bg.jpg';
import openSign from '../../assets/open-sign.jpg';
import horseShowBend from '../../assets/horseshoebend.jpg';
import bootCountryLogo from '../../assets/boot-country-logo.svg';
import groupedBootsWhite from '../../assets/grouped-boots-white.svg';
import bootCountryBg from '../../assets/boot-country.jpg';

export default function HomePageContainer({
    image,
    title,
    subtitle,
    heading,
    mainpitch,
    bigimage,
    description,
    intro,
    post,
    products
}) {
    // GET GLOBAL APP CONTEXT 
    const { alertBanner, toggleAlertBanner, globalLocalStorage, setGlobalStorage } = useContext(AppContext);

    console.log(10, alertBanner, toggleAlertBanner, globalLocalStorage, setGlobalStorage)

    return (
        <div className="homepage">
            {alertBanner && (
                <div className="alert-banner">
                    <p>Boot Factory outlet Uses cookies to improve the user experience. To learn more about our cookie policy, please check our <Link to="/about">Privacy Policy</Link></p>
                    <button onClick={toggleAlertBanner}>Okay</button>
                </div>
            )
        }
            <div className="homepage-hero"
                style={{
                    backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
                        })`
                }}>
                <div className="opaque-overlay"></div>
                <div className="hero-content-container">
                    <img src={groupedBootsWhite} />
                    <h1>Buy 1 pair, <br /> get 2 more free</h1>
                    <p>Seriously, we aren’t kidding</p>
                    <Link to="/">Learn More</Link>
                </div>
            </div>

            <section className="container first-content-block">
                <div className="head">
                    <div className="head-content">
                        <div className="logos-split">
                            <img style={{ width: '125px' }} src={logo} />
                            <img style={{ width: '200px' }} src={bootCountryLogo} />
                        </div>
                        <h2>Welcome To Our New Site!</h2>
                        <p className="subtitle subtitle_2">Keeping you looking good, no matter the occasion</p>
                        <p className="description">
                            After over 40 years in business with our retail stores, you can now shop our incredible buy 1, get 2 free deal no matter where you are. Whether you choose to shop online or at one of our stores (link to stores page), you'll get the best price on boots in the industry.
                        </p>
                    </div>
                </div>
                <div className="lower">
                    <div className="boot-block-link" >
                        <Link to="/mens">
                            <div className="image-block" style={{
                                background: `url(${dirtyBoots}) no-repeat`
                            }}></div>
                            <div className="boot-block-container">
                                <h2>Mens</h2>
                                <span>Shop</span>
                            </div>
                        </Link>
                    </div>
                    <div className="boot-block-link" >
                        <Link to="/womens">
                            <div className="image-block" style={{
                                background: `url(${dirtyBoots}) no-repeat`
                            }}></div>
                            <div className="boot-block-container">
                                <h2>Womens</h2>
                                <span>Shop</span>
                            </div>
                        </Link>

                    </div>
                    <div className="boot-block-link" >
                        <Link to="/kids">
                            <div className="image-block" style={{
                                background: `url(${dirtyBoots}) no-repeat`
                            }}></div>
                            <div className="boot-block-container">
                                <h2>Kids</h2>
                                <span>Shop</span>
                            </div>
                        </Link>

                    </div>
                </div>
            </section>

            <section className="homepage-hero-2">
                <div className="hero-left-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${bootsBlueBg})`
                    }}></div>
                <div className="half-hero half-hero-right">
                    <div>
                        <h2>Avens</h2>
                        <p className="subtitle subtitle_2">By J.B. Dillon Reserve</p>
                        <p className="description">
                            This stunning handmade boot is in a league of its own. Utilizing only the highest quality materials and leathers available, the Avens has a beautiful hand-stitched design and a cream inlay.
                        </p>
                        <Link to="/">Shop Avens</Link>
                    </div>
                </div>
            </section>

            <section className="container second-content-block">
                <TopSelling products={products} />
            </section>

            <section className="homepage-hero-3">
                <div className="half-hero half-hero-left">
                    <div>
                        <h2>Our Stores</h2>
                        <p className="subtitle subtitle_2">8 Different Retail Locations</p>
                        <p className="description">
                            Our retail stores offer an incredible selection of boots, with many additional brands and styles not offered online. Our highly trained sales staff  can help find the perfect boots for you!
                        </p>
                        <Link to="/">View Stores</Link>
                    </div>
                </div>
                <div className="hero-right-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${bootCountryBg})`
                    }}></div>
            </section>

            {/* <section className="container homepage-cards-section">
                <div>
                    <img src={horseShowBend} />
                    <h3>Value Add </h3>
                    <p>Check out our most awesomest popular boot that ll the coolest peoples in</p>
                    <Link to="/">Learn More</Link>
                </div>
                <div>
                    <img src={horseShowBend} />
                    <h3>Value Add </h3>
                    <p>Check out our most awesomest popular boot that ll the coolest peoples in</p>
                    <Link to="/">Learn More</Link>
                </div>
                <div>
                    <img src={horseShowBend} />
                    <h3>Value Add </h3>
                    <p>Check out our most awesomest popular boot that ll the coolest peoples in</p>
                    <Link to="/">Learn More</Link>
                </div>
            </section> */}

            <section className="container">
                REVIEWS
            </section>
        </div>
    )
}
