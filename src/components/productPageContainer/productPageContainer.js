import React, { useState } from 'react';
import ProductCard from '../bigcommerce/ProductCard';
import Dropdown from '../dropdown/dropdown.js';
import logo from '../../assets/logo.svg';
import caretDownLight from '../../assets/caret-down-light.svg';
import hamburgerLogo from '../../assets/hamburger.svg';
import hamburgerGray from '../../assets/hamburger-gray.svg';

export default function ProductPageContainer({
    image,
    title,
    heading,
    description,
    products
}) {

    const optionsList = ["Best Selling", "Price: Low to High", "Price: High to Low"];
    // STATES
    const [filterDrawerOpen, setfilterDrawerOpen] = useState(false);
    const [filterDrawerActiveClass, setFilterDrawerActiveClass] = useState('');
    const [filter, setFilter] = useState(optionsList[0]);


    function toggleFilterDrawer() {
        setfilterDrawerOpen(!filterDrawerOpen);
        filterDrawerActiveClass === ''
        ? setFilterDrawerActiveClass('filter-drawer-open') 
        : setFilterDrawerActiveClass('')
    }

    // FILTER PRODUCTS
    filter === optionsList[1] && products.sort((a, b) => (a.price > b.price) ? 1 : -1)
    filter === optionsList[2] && products.sort((a, b) => (a.price < b.price) ? 1 : -1)

    return (
        <div className="product-page">
            <div
                className="hero full-width-image-container margin-top-0"
                style={{
                    backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image
                        })`
                }}>
                <div className="opaque-overlay"></div>
                <h2 className="hero-title">
                    {title}
                </h2>
            </div>
            <section className="products-container">
                <div className="container">
                    <div className="products-header">
                        <div className="products-header-split">
                            <button className="toggle-filters" onClick={toggleFilterDrawer}>
                                <img src={hamburgerGray} alt="Filters" />
                                <span>Filters</span>
                            </button>
                            <button className="above-filter-button">
                                <img src={logo} alt="JB Dillon" />
                                <span>Buy 1, Get 2 Free</span>
                            </button>
                        </div>
                        <div className="products-header-split">
                            <span className="numbered-products-results">{products.length} Resuts</span>
                        </div>
                        <div className="products-header-split">
                            <Dropdown
                                dropDownHeadClass="products-quick-filter"
                                placeholder="Best Selling"
                                value={filter}
                                onChange={v => setFilter(v)}
                                options={optionsList}
                            />

                        </div>
                    </div>
                    <div className="products-section">
                        <div className={`mobile-opaque-background ${filterDrawerActiveClass}`} onClick={toggleFilterDrawer}></div>
                        <div className={`products-filter-container ${filterDrawerActiveClass}`}>
                            <div className="products-filter-head">
                                <img src={hamburgerLogo} alt="Mobile Menu" />
                                <span>Filters</span>
                            </div>
                            <div className="selected-filters">
                                <span>No Filters Selected</span>
                            </div>
                            <div>
                                <select className="filter-dropdown" style={{ background: `url(${caretDownLight}) no-repeat 95% 50%` }}>
                                    <option value="">Best Selling</option>
                                    <option value="">Price: Low to High</option>
                                    <option value="">Price: High to Low</option>
                                    <option value="">Most Relevent</option>
                                </select>
                            </div>
                            <div>
                                <select className="filter-dropdown" style={{ background: `url(${caretDownLight}) no-repeat 95% 50%` }}>
                                    <option value="">Best Selling</option>
                                    <option value="">Price: Low to High</option>
                                    <option value="">Price: High to Low</option>
                                    <option value="">Most Relevent</option>
                                </select>
                            </div>
                        </div>
                        <div className="bc-product-grid bc-product-grid--archive bc-product-grid--3col">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
