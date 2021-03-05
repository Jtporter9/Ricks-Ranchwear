import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../bigcommerce/ProductCard';
import TopSelling from '../topSelling/topSelling.js';
import Dropdown from '../dropdown/dropdown.js';
import InfoModal from '../infoModal/infoModal';

// ASSESTS
import logo from '../../assets/logo.png';
import caretDownLight from '../../assets/caret-down-light.svg';
import filterIcon from '../../assets/filter.svg';
import infoIcon from '../../assets/info-icon.svg';
import groupedBoots from '../../assets/grouped-boots.svg';
import CloseIcon from '../../assets/close-icon.svg';


export default function ProductPageContainer({
    image,
    title,
    heading,
    description,
    products,
    brands
}) {
    console.log(products)
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) === index)

    let colorOptions = [];
    let sizeOptions = [];
    let widthOptions = [];

    const colorKey = "Color";
    const sizeKey = "Size";
    const widthKey = "Width";

    products.map(product => {
        product.variantsList = []
        product.variants.map(variant => variant.option_values.map(option => {
            option.option_display_name === colorKey && colorOptions.push(option.label)
            option.option_display_name === sizeKey && sizeOptions.push(option.label)
            option.option_display_name === widthKey && widthOptions.push(option.label)
            product.variantsList = [...new Set(findDuplicates([...product.variantsList, option.label]))];
        }))
    })

    colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
    sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicatesa
    widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
    sizeOptions = sizeOptions.sort(function (a, b) { return a - b });

    const brandsFiltered = brands.map(obj => obj.node.name);
    const optionsList = ["Best Selling", "Price: Low to High", "Price: High to Low"];
    const categoryList = ["Category 1", "Category 2", "Category 3"]
    // STATES
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [filterDrawerActiveClass, setFilterDrawerActiveClass] = useState('');
    const [filter, setFilter] = useState(optionsList[0]);
    const [brandsFilter, setBrandsFilter] = useState(null);
    const [colorFilter, setColorFilter] = useState(null);
    const [widthFilter, setWidthFilter] = useState(null);
    const [sizeFilter, setSizeFilter] = useState(null);
    const [isSticky, setSticky] = useState(false);
    const [activeInfoModal, setActiveInfoModal] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

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
    brandsFilter && products.sort((a, b) => (b.brand.name === brandsFilter) ? 1 : -1)
    colorFilter && products.sort((a, b) => b.variantsList.indexOf(colorFilter) !== -1 ? 1 : -1)
    sizeFilter && products.sort((a, b) => b.variantsList.indexOf(sizeFilter) !== -1 ? 1 : -1)
    widthFilter && products.sort((a, b) => b.variantsList.indexOf(widthFilter) !== -1 ? 1 : -1)

    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('load', setIsMobileView(window.matchMedia('(max-width: 1000px)').matches));
        window.addEventListener('resize', setIsMobileView(window.matchMedia('(max-width: 1000px)').matches));
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
                            <button className="toggle-filters" onClick={toggleFilterDrawer}>
                                <img src={filterIcon} alt="Mobile Filters" />
                                <span>Filters</span>
                            </button>
                            <div className="coupon-banner" onClick={() => setActiveInfoModal(true)}>
                                <img src={groupedBoots} />
                                <strong>Buy 1 pair, get 2 pair free!</strong>
                                <img src={infoIcon} />
                            </div>
                        </div>
                        <div className="products-header-split">
                            <span style={{ display: 'none' }} className="numbered-products-results">{products.length} Results</span>
                        </div>
                        <div className="products-header-split">
                            <Dropdown
                                dropDownClasses={{ head: 'products-quick-filter', optionContainer: 'dropdown-options-container' }}
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
                                    <div style={{ margin: '1rem' }}>
                                        <span>No Filters Selected</span>
                                    </div>
                                    {brandsFilter && (
                                        <div className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => setBrandsFilter(null)} />
                                            <span>{brandsFilter}</span>
                                        </div>
                                    )}
                                    {colorFilter && (
                                        <div className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => setColorFilter(null)} />
                                            <span>{colorFilter}</span>
                                        </div>
                                    )}
                                    {sizeFilter && (
                                        <div className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => setSizeFilter(null)} />
                                            <span>{sizeFilter}</span>
                                        </div>
                                    )}
                                    {widthFilter && (
                                        <div className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => setWidthFilter(null)} />
                                            <span>{widthFilter}</span>
                                        </div>
                                    )}
                                </div>
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Brand"
                                    value="Brand"
                                    onChange={v => setBrandsFilter(v)}
                                    options={brandsFiltered}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Size"
                                    value="Size"
                                    onChange={v => setSizeFilter(v)}
                                    options={sizeOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Color"
                                    value="Color"
                                    onChange={v => setColorFilter(v)}
                                    options={colorOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Width"
                                    value="Width"
                                    onChange={v => setWidthFilter(v)}
                                    options={widthOptions}
                                />

                            </div>
                        </div>
                        <div className={`bc-product-grid bc-product-grid--archive ${isMobileView ? 'bc-product-grid--4col' : 'bc-product-grid--3col'}`}>
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
            <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
        </div>
    )
}
