import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import ProductCard from '../bigcommerce/ProductCard';
import TopSelling from '../topSelling/topSelling.js';
import Dropdown from '../dropdown/dropdown.js';
import InfoModal from '../infoModal/infoModal';
import { useLocation } from '@reach/router';

// ASSESTS
import logo from '../../assets/logo.png';
import caretDownLight from '../../assets/caret-down-light.svg';
import caretUpDark from '../../assets/caret-up-dark.svg';
import filterIcon from '../../assets/filter.svg';
import infoIcon from '../../assets/info-icon.svg';
import groupedBoots from '../../assets/grouped-boots.svg';
import CloseIcon from '../../assets/close-icon.svg';
import CloseIconWhite from '../../assets/close-icon-white.svg';
import { number } from 'prop-types';

export default function ProductPageContainer({
    image,
    title,
    heading,
    description,
    products,
    brands
}) {
    const location = useLocation();
    function getJsonFromUrl(url) {
        if (!url) url = location.search;
        var query = url.substr(1);
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) === index)

    let colorOptions = [];
    let sizeOptions = [];
    let widthOptions = [];
    let bootTypeOptions = [];
    let materialOptions = [];
    let toeStyleOptions = [];

    const colorKey = "Generic Colors";
    const sizeKey = "Size";
    const widthKey = "Width";

    products.map(product => {
        product.variantsList = []
        product.variants.map(variant => variant.option_values.map(option => {
            // option.option_display_name === colorKey && colorOptions.push(option.label)
            option.option_display_name === sizeKey && sizeOptions.push(option.label)
            option.option_display_name === widthKey && widthOptions.push(option.label)
            product.variantsList = [...new Set(findDuplicates([...product.variantsList, option.label]))];
        }))
        product.custom_fields.map(field => {
            field.name === "Material" && materialOptions.push(field.value)
            field.name === "Toe Style" && toeStyleOptions.push(field.value)
            field.name === "Boot Type" && bootTypeOptions.push(field.value)
            if (field.name === colorKey) {
                let colors = field.value.split(',');
                for (let i = 0; i < colors.length; i++) {
                    colorOptions.push(colors[i])
                    product.variantsList = [...new Set(findDuplicates([...product.variantsList, colors[i]]))];
                }
            }
            product.variantsList = [...new Set(findDuplicates([...product.variantsList, field.value]))];
        })
    })

    colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
    sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicatesa
    widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
    materialOptions = [...new Set(findDuplicates(materialOptions))]; // Unique duplicates
    toeStyleOptions = [...new Set(findDuplicates(toeStyleOptions))]; // Unique duplicates
    bootTypeOptions = [...new Set(findDuplicates(bootTypeOptions))]; // Unique duplicates
    // styleNumberOptions = [...new Set(findDuplicates(styleNumberOptions))]; // Unique duplicates
    sizeOptions = sizeOptions.sort(function (a, b) { return a - b });

    const brandsFiltered = brands.map(obj => obj.node.name);
    const optionsList = ["Best Selling", "Price: Low to High", "Price: High to Low"];
    const categoryList = ["Category 1", "Category 2", "Category 3"]
    // STATES
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [filterDrawerActiveClass, setFilterDrawerActiveClass] = useState('');
    const [filter, setFilter] = useState(null);
    const [brandsFilter, setBrandsFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [widthFilter, setWidthFilter] = useState([]);
    const [sizeFilter, setSizeFilter] = useState([]);

    const [materialFilter, setMaterialFilter] = useState([]);
    const [toeStyleFilter, setToeStyleFilter] = useState([]);
    const [styleNumberFilter, setStyleNumberFilter] = useState([]);

    const [isSticky, setSticky] = useState(false);
    const [activeInfoModal, setActiveInfoModal] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [numberOfFilters, setNumberOfFilters] = useState(null);
    const [categoryDropDown, setCategoryDropDown] = useState(true);
    const [params, setParams] = useState(false);

    function toggleFilterDrawer() {
        setFilterDrawerOpen(!filterDrawerOpen);
        filterDrawerActiveClass === ''
            ? setFilterDrawerActiveClass('filter-drawer-open')
            : setFilterDrawerActiveClass('')
    }

    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    function getProductsFilteredByBrand(brands) {
        if (numberOfFilters > 0 && brands.length === 0) {
            brands.length > 1 ? brands.map(brand => setFilteredProducts([...new Set(findDuplicates([...filteredProducts, ...filteredProducts.filter(product => product.brand.name === brand)]))])) :
                brands.map(brand => setFilteredProducts(([...new Set(findDuplicates(filteredProducts.filter(product => product.brand.name === brand)))])));
        } else {
            brands.length > 1 ? brands.map(brand => setFilteredProducts([...new Set(findDuplicates([...filteredProducts, ...products.filter(product => product.brand.name === brand)]))])) :
                brands.map(brand => setFilteredProducts(([...new Set(findDuplicates(products.filter(product => product.brand.name === brand)))])));
        }
    }

    function getProductsFilteredByVariant(arr) {
        if (numberOfFilters > 0 && arr.length === 0) {
            arr.length > 1 ?
                arr.map(item => setFilteredProducts([...new Set(findDuplicates([...filteredProducts, ...filteredProducts.filter(product => product.variantsList.indexOf(item) === -1 ? false : true)]))])) :
                arr.map(item => setFilteredProducts([...new Set(findDuplicates(filteredProducts.filter(product => product.variantsList.indexOf(item) === -1 ? false : true)))]));
        } else {
            arr.length > 1 ?
                arr.map(item => setFilteredProducts([...new Set(findDuplicates([...filteredProducts, ...products.filter(product => product.variantsList.indexOf(item) === -1 ? false : true)]))])) :
                arr.map(item => setFilteredProducts([...new Set(findDuplicates(products.filter(product => product.variantsList.indexOf(item) === -1 ? false : true)))]));
        }
    }

    function clearAllFilters() {
        setBrandsFilter([]);
        setColorFilter([]);
        setWidthFilter([]);
        setSizeFilter([]);
        setMaterialFilter([]);
        setToeStyleFilter([]);
        setStyleNumberFilter([]);
    }

    function toggleFilter(arr, val, type) {
        if (arr.indexOf(val) === -1) {
            type === "Brand" && setBrandsFilter([...arr, val]);
            type === "Color" && setColorFilter([...arr, val]);
            type === "Width" && setWidthFilter([...arr, val]);
            type === "Size" && setSizeFilter([...arr, val]);
            type === "Material" && setMaterialFilter([...arr, val]);
            type === "Toe Shape" && setToeStyleFilter([...arr, val]);
            type === "Style" && setStyleNumberFilter([...arr, val]);
        } else {
            type === "Brand" && setBrandsFilter(arr.filter(a => a !== val));
            type === "Color" && setColorFilter(arr.filter(a => a !== val));
            type === "Width" && setWidthFilter(arr.filter(a => a !== val));
            type === "Size" && setSizeFilter(arr.filter(a => a !== val));
            type === "Material" && setMaterialFilter(arr.filter(a => a !== val));
            type === "Toe Shape" && setToeStyleFilter(arr.filter(a => a !== val));
            type === "Style" && setStyleNumberFilter(arr.filter(a => a !== val));
        }
        document.getElementById("products-container") && document.getElementById("products-container").scrollIntoView({behavior: 'smooth'});
    }

    useEffect(() => {
        setNumberOfFilters(
            brandsFilter.length +
            colorFilter.length +
            sizeFilter.length +
            widthFilter.length +
            materialFilter.length +
            toeStyleFilter.length +
            styleNumberFilter.length
        );
        filteredProducts.length === 0 && setFilteredProducts(products);
        numberOfFilters === 0 && setFilteredProducts(products);
        (!filter && filteredProducts.length !== 0) && setFilter(optionsList[0]);

        window.addEventListener('load', setIsMobileView(window.matchMedia('(max-width: 1000px)').matches));
        window.addEventListener('resize', setIsMobileView(window.matchMedia('(max-width: 1000px)').matches));
        window.addEventListener('scroll', handleScroll);

        // FILTER PRODUCTS
        (filter === optionsList[0] && filteredProducts) && filteredProducts.sort((a, b) => (a.bigcommerce_id > b.bigcommerce_id) ? 1 : -1);
        (filter === optionsList[1] && filteredProducts) && filteredProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
        (filter === optionsList[2] && filteredProducts) && filteredProducts.sort((a, b) => (a.price < b.price) ? 1 : -1);

        brandsFilter.length > 0 && getProductsFilteredByBrand(brandsFilter);
        colorFilter.length > 0 && getProductsFilteredByVariant(colorFilter);
        sizeFilter.length > 0 && getProductsFilteredByVariant(sizeFilter);
        widthFilter.length > 0 && getProductsFilteredByVariant(widthFilter);
        materialFilter.length > 0 && getProductsFilteredByVariant(materialFilter);
        toeStyleFilter.length > 0 && getProductsFilteredByVariant(toeStyleFilter);
        styleNumberFilter.length > 0 && getProductsFilteredByVariant(styleNumberFilter);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, [numberOfFilters, filter, brandsFilter, colorFilter, sizeFilter, widthFilter, materialFilter, toeStyleFilter, styleNumberFilter]);

    useEffect(() => {
        let currentParams = getJsonFromUrl(location.search);
        params.value !== currentParams.value && clearAllFilters();
        (!params || params.value !== currentParams.value) && setParams(getJsonFromUrl(location.search));
        if (params) {
            if (params.type === "Style" && params.value.slice(-1) === 's') {
                params.value = params.value.substring(0, params.value.length - 1);
            }
            (params.type === "Style" && styleNumberFilter.length === 0) && toggleFilter(styleNumberFilter, params.value, params.type);
            if (params.type === "Toe Shape" && toeStyleFilter.length === 0) {
                if (params.value === "Traditional Toe") {
                    params.value = "R-Toe"
                }
                    if (params.value === "Square Toe" && location.pathname === "/mens") {
                        toggleFilter([...toeStyleFilter, params.value] , "Broad Square Toe", params.type);
                    } else {
                        toggleFilter(toeStyleFilter, params.value, params.type);
                    }
                }
            }
        }, [params, location])

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
            <section id="products-container" className="products-container">
                <div className="container">
                    <div className="products-header">
                        <div className="products-header-split">
                            <button className="toggle-filters" onClick={toggleFilterDrawer}>
                                <img src={filterIcon} alt="Mobile Filters" />
                                <span>Filters {numberOfFilters > 0 && `(${numberOfFilters})`}</span>
                            </button>
                            <div className="coupon-banner" onClick={() => setActiveInfoModal(true)}>
                                <img src={groupedBoots} />
                                <strong>Buy 1 pair, get Two pair free!</strong>
                                <img src={infoIcon} />
                            </div>
                        </div>
                        <div className="products-header-split">
                            <span className="numbered-products-results">{filteredProducts ? filteredProducts.length : 0} Results</span>
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
                                    {numberOfFilters < 1 && (
                                        <div style={{ padding: '0 1rem' }}>
                                            <span>No Filters Selected</span>
                                        </div>
                                    )}
                                    {numberOfFilters > 0 && (
                                        <div className="filter-swatch" style={{ backgroundColor: 'white' }} onClick={clearAllFilters}>
                                            <img src={CloseIcon} alt="Clear All" />
                                            <span style={{ color: '#767676' }}>Clear All</span>
                                        </div>
                                    )}
                                    {brandsFilter && brandsFilter.map((brand, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => setBrandsFilter(brandsFilter.filter(a => a !== brand))} />
                                            <span>{brand}</span>
                                        </div>
                                    ))}
                                    {colorFilter && colorFilter.map((color, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => { setColorFilter(colorFilter.filter(a => a !== color)); getProductsFilteredByVariant(colorFilter.filter(a => a !== color)); }} />
                                            <span>{color}</span>
                                        </div>
                                    ))}
                                    {widthFilter && widthFilter.map((width, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => { setWidthFilter(widthFilter.filter(a => a !== width)); getProductsFilteredByVariant(widthFilter.filter(a => a !== width)); }} />
                                            <span>{width}</span>
                                        </div>
                                    ))}
                                    {sizeFilter && sizeFilter.map((size, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => { setSizeFilter(sizeFilter.filter(a => a !== size)); getProductsFilteredByVariant(sizeFilter.filter(a => a !== size)); }} />
                                            <span>{size}</span>
                                        </div>
                                    ))}
                                    {materialFilter && materialFilter.map((material, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => { setMaterialFilter(materialFilter.filter(a => a !== material)); getProductsFilteredByVariant(materialFilter.filter(a => a !== material)); }} />
                                            <span>{material}</span>
                                        </div>
                                    ))}
                                    {toeStyleFilter && toeStyleFilter.map((toeStyle, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => { setToeStyleFilter(toeStyleFilter.filter(a => a !== toeStyle)); getProductsFilteredByVariant(toeStyleFilter.filter(a => a !== toeStyle)); }} />
                                            <span>{toeStyle}</span>
                                        </div>
                                    ))}
                                    {styleNumberFilter && styleNumberFilter.map((style, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIconWhite} alt="remove" onClick={() => { setStyleNumberFilter(styleNumberFilter.filter(a => a !== style)); getProductsFilteredByVariant(styleNumberFilter.filter(a => a !== style)); }} />
                                            <span>{style}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="filter-drop-down">
                                    <div className="products-side-filter-head" onClick={() => setCategoryDropDown(!categoryDropDown)}>
                                        <span className={`${categoryDropDown && 'dropdown-open'}`}>Category</span>
                                        <img src={categoryDropDown ? caretUpDark : caretDownLight} alt="Dropdown" />
                                    </div>
                                    {categoryDropDown && (
                                        <ul className="side-filter-dropdown-container">
                                            <Link to='/mens'>
                                                <li className="dropdown-option">
                                                    Mens
                                                </li>
                                            </Link>
                                            <Link to='/womens'>
                                                <li className="dropdown-option">
                                                    Womens
                                                </li>
                                            </Link>
                                            <Link to='/kids'>
                                                <li className="dropdown-option">
                                                    Kids
                                                </li>
                                            </Link>
                                        </ul>
                                    )}
                                </div>
                                {bootTypeOptions.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Boot Style"
                                        value="Boot Style"
                                        onChange={v => toggleFilter(styleNumberFilter, v, "Style")}
                                        options={bootTypeOptions}
                                        selectedFilters={styleNumberFilter}
                                        defaultOpenState={true}
                                    />
                                )}
                                {materialOptions.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Material"
                                        value="Material"
                                        onChange={v => toggleFilter(materialFilter, v, "Material")}
                                        options={materialOptions}
                                        selectedFilters={materialFilter}
                                        defaultOpenState={true}
                                    />
                                )}
                                {toeStyleOptions.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Toe Shape"
                                        value="Toe Shape"
                                        onChange={v => toggleFilter(toeStyleFilter, v, "Toe Shape")}
                                        options={toeStyleOptions}
                                        selectedFilters={toeStyleFilter}
                                        defaultOpenState={true}
                                    />
                                )}
                                {colorOptions.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Color"
                                        value="Color"
                                        onChange={v => toggleFilter(colorFilter, v, "Color")}
                                        options={colorOptions}
                                        selectedFilters={colorFilter}
                                        defaultOpenState={true}
                                    />
                                )}
                                {widthOptions.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Width"
                                        value="Width"
                                        onChange={v => toggleFilter(widthFilter, v, "Width")}
                                        options={widthOptions}
                                        selectedFilters={widthFilter}
                                    />
                                )}
                                {sizeOptions.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Size"
                                        value="Size"
                                        onChange={v => toggleFilter(sizeFilter, v, "Size")}
                                        options={sizeOptions}
                                        selectedFilters={sizeFilter}
                                    />
                                )}
                                {brandsFiltered.length > 1 && (
                                    <Dropdown
                                        dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                        placeholder="Brand"
                                        value="Brand"
                                        onChange={v => toggleFilter(brandsFilter, v, "Brand")}
                                        options={brandsFiltered}
                                        selectedFilters={brandsFilter}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={`bc-product-grid bc-product-grid--archive ${isMobileView ? 'bc-product-grid--4col' : 'bc-product-grid--3col'}`}>
                            {filteredProducts && filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    <section className="section">
                        <TopSelling products={products} />
                    </section>
                </div>
            </section >
            <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
        </div >
    )
}
