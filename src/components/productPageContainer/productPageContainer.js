import React, { useState } from 'react';
import ProductCard from '../bigcommerce/ProductCard';
import Dropdown from '../dropdown/dropdown.js';
import logo from '../../assets/logo.svg';
import caretDownLight from '../../assets/caret-down-light.svg';
import hamburgerGray from '../../assets/hamburger-gray.svg';
import filterIcon from '../../assets/filter.svg';
import groupedBoots from '../../assets/grouped-boots.svg';


export default function ProductPageContainer({
    image,
    title,
    heading,
    description,
    products
}) {

    const optionsList = ["Best Selling", "Price: Low to High", "Price: High to Low"];
    const categoryList = ["Category 1", "Category 2", "Category 3"]
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
    filter === optionsList[0] && products.sort((a, b) => (a.bigcommerce_id > b.bigcommerce_id) ? 1 : -1)
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
                            <div className="coupon-banner">
                                <img src={groupedBoots} />
                                <strong>Buy 1 and get 2, free!</strong>
                            </div>
                        </div>
                        <div className="products-header-split">
                            <span className="numbered-products-results">{products.length} Resuts</span>
                        </div>
                        <div className="products-header-split">
                            <Dropdown
                                dropDownClasses={{head: 'products-quick-filter', optionContainer: 'dropdown-options-container'}}
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
                                <img src={filterIcon} alt="Mobile Menu" />
                                <span>Filters</span>
                            </div>
                            <div className="selected-filters">
                                <span>No Filters Selected</span>
                            </div>
                            <Dropdown
                                dropDownClasses={{head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container'}}
                                placeholder="Category"
                                value="Category"
                                onChange={v => setFilter(v)}
                                options={categoryList}
                            />
                            <Dropdown
                                dropDownClasses={{head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container'}}
                                placeholder="Category"
                                value="Category"
                                onChange={v => setFilter(v)}
                                options={categoryList}
                            />
                            <Dropdown
                                dropDownClasses={{head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container'}}
                                placeholder="Category"
                                value="Category"
                                onChange={v => setFilter(v)}
                                options={categoryList}
                            />
     
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
