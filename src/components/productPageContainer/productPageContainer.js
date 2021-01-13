import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../bigcommerce/ProductCard';
import TopSelling from '../topSelling/topSelling.js';
import Dropdown from '../dropdown/dropdown.js';
import logo from '../../assets/logo.svg';
import caretDownLight from '../../assets/caret-down-light.svg';
import filterIcon from '../../assets/filter.svg';
import infoIcon from '../../assets/info-icon.svg';
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
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [filterDrawerActiveClass, setFilterDrawerActiveClass] = useState('');
    const [filter, setFilter] = useState(optionsList[0]);
    const [isSticky, setSticky] = useState(false);

    function toggleFilterDrawer() {
        setFilterDrawerOpen(!filterDrawerOpen);
        filterDrawerActiveClass === ''
        ? setFilterDrawerActiveClass('filter-drawer-open') 
        : setFilterDrawerActiveClass('')
    }
    
    // FILTER PRODUCTS
    filter === optionsList[0] && products.sort((a, b) => (a.bigcommerce_id > b.bigcommerce_id) ? 1 : -1)
    filter === optionsList[1] && products.sort((a, b) => (a.price > b.price) ? 1 : -1)
    filter === optionsList[2] && products.sort((a, b) => (a.price < b.price) ? 1 : -1)
    
    const ref = useRef(null);
    const handleScroll = () => {
      if (ref.current) {
        setSticky(ref.current.getBoundingClientRect().top <= 0);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', () => handleScroll);
      };
    }, []);


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
                            {/* <button className="toggle-filters" onClick={toggleFilterDrawer}>
                                <img src={filterIcon} alt="Mobile Filters" />
                                <span>Filters</span>
                            </button> */}
                            <div className="coupon-banner">
                                <img src={groupedBoots} />
                                <strong>Buy 1 pair, get 2 pair free!</strong>
                                <img src={infoIcon} />
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
                            <div className={`${isSticky ? ' sticky' : ''}`}>
                                <div className="products-filter-head">
                                    <img src={filterIcon} alt="Mobile Menu" />
                                    <span>Filters</span>
                                </div>
                                <div className="selected-filters">
                                    <div className="no-selected-filters">
                                        <span>No Filters Selected</span>
                                    </div>
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
                        </div>
                        <div className="bc-product-grid bc-product-grid--archive bc-product-grid--4col">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    <section className="section">
                        <TopSelling products={products} />
                    </section>
                </div>
            </section>
        </div>
    )
}
