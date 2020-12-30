import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import ProductCard from '../bigcommerce/ProductCard';
import PhotoGrid from '../PhotoGrid';
import BlogItem from '../BlogItem';
import bootsImg from '../../assets/boots.svg';
import logo from '../../assets/logo.svg';
import dirtyBoots from '../../assets/dirty-boots.jpg';
import bootStanding from '../../assets/boots-standing.jpg';
import openSign from '../../assets/open-sign.jpg';
import horseShowBend from '../../assets/horseshoebend.jpg';

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
    // TOP SELLING 
    products.length = 4;
    return (
        <div className="homepage">
            <div className="homepage-hero">
                <div className="half-hero">
                    <div>
                        <img src={bootsImg} />
                        <h1>Buy 1 pair, <br /> get 2 more free</h1>
                        <p>Seriously, we aren’t kidding</p>
                        <Link to="/">Learn More</Link>
                    </div>
                </div>
                <div className="hero-right-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
                            })`
                    }}></div>
            </div>

            <section className="container first-content-block">
                <div className="head">
                    <div className="head-content">
                        <img style={{ width: '200px' }} src={logo} />
                        <h2>Buy 1 pair, get 2 more. Free.</h2>
                        <p className="subtitle subtitle_2">Seriously, we aren’t kidding</p>
                        <p className="description">Boot Factory Outlet’s mission is to keep you looking good no matter the occassion. With our Buy 1 pair, get 2 free deail you can leave with not only 1 brand new pair of handmade boots, you’ll be leaving with 2.</p>
                    </div>
                </div>
                <div className="lower">
                    <div className="boot-block-link mens-boots-block" >
                        <div style={{
                            background: `url(${dirtyBoots}) no-repeat`
                        }}></div>
                        <h2>Mens Boots</h2>
                        <Link to="/">Shop</Link>
                    </div>
                    <div className="boot-block-link mens-boots-block" >
                        <div style={{
                            background: `url(${dirtyBoots}) no-repeat`
                        }}></div>
                        <h2>Womens Boots</h2>
                        <Link to="/">Shop</Link>
                    </div>
                </div>
            </section>

            <section className="homepage-hero-2">
                <div className="hero-left-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${bootStanding})`
                    }}></div>
                <div className="half-hero half-hero-right">
                    <div>
                        <h2>The Ostrich Boot</h2>
                        <p className="subtitle subtitle_2">HandCarfted Ostritch</p>
                        <p className="description">Check out our most awesomest popular boot that ll the coolest peoples in the whole cool world really want to buy right this moment.</p>
                        <Link to="/">Shop Ostrtich Boot</Link>
                    </div>
                </div>
            </section>

            <section className="container second-content-block">
                <div className="head">
                    <div className="boot-block-link mens-boots-block" >
                        <div style={{
                            background: `url(${dirtyBoots}) no-repeat`
                        }}></div>
                        <h2>Kids Boots</h2>
                        <Link to="/">Shop</Link>
                    </div>
                    <div className="boot-block-link mens-boots-block" >
                        <div style={{
                            background: `url(${dirtyBoots}) no-repeat`
                        }}></div>
                        <h2>Accessories</h2>
                        <Link to="/">Shop</Link>
                    </div>
                </div>
                <div className="top-selling-boots-block">
                    <h2>Top Selling Boots</h2>
                    <div className="top-selling-boots-container bc-product-grid bc-product-grid--archive bc-product-grid--4col">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="homepage-hero-3">
                <div className="half-hero half-hero-left">
                    <div>
                        <h2>Our Locations</h2>
                        <p className="subtitle subtitle_2">HandCarfted Ostritch</p>
                        <p className="description">Check out our most awesomest popular boot that ll the coolest peoples in the whole cool world really want to buy right this moment.</p>
                        <Link to="/">View Stores</Link>
                    </div>
                </div>
                <div className="hero-right-image half-hero full-width-image margin-top-0"
                    style={{
                        backgroundImage: `url(${openSign})`
                    }}></div>
            </section>

            <section className="container homepage-cards-section">
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
            </section> 
        </div>
    )
}
