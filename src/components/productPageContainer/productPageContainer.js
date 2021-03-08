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
import { number } from 'prop-types';

export default function ProductPageContainer({
    image,
    title,
    heading,
    description,
    products,
    brands
}) {
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) === index)

    let colorOptions = [];
    let sizeOptions = [];
    let widthOptions = [];

    let materialOptions = [];
    let toeStyleOptions = [];
    let styleNumberOptions = [];

    const colorKey = "Color";
    const sizeKey = "Size";
    const widthKey = "Width";

    function splitUpStyleNumbers(value) {
        let styles = value.split(',');
        for (let i = 0; i < styles.length; i++) {
            styleNumberOptions.push(styles[i])
        }
    }

    products.map(product => {
        product.variantsList = []
        product.variants.map(variant => variant.option_values.map(option => {
            option.option_display_name === colorKey && colorOptions.push(option.label)
            option.option_display_name === sizeKey && sizeOptions.push(option.label)
            option.option_display_name === widthKey && widthOptions.push(option.label)
            product.variantsList = [...new Set(findDuplicates([...product.variantsList, option.label]))];
        }))
        product.custom_fields.map(field => {
            field.name === "Material" && materialOptions.push(field.value)
            field.name === "Toe Style" && toeStyleOptions.push(field.value)
            field.name === "Style Number" && splitUpStyleNumbers(field.value)
            product.variantsList = [...new Set(findDuplicates([...product.variantsList, field.value]))];
        })
    })

    colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
    sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicatesa
    widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
    materialOptions = [...new Set(findDuplicates(materialOptions))]; // Unique duplicates
    toeStyleOptions = [...new Set(findDuplicates(toeStyleOptions))]; // Unique duplicates
    styleNumberOptions = [...new Set(findDuplicates(styleNumberOptions))]; // Unique duplicates
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
        brands.length > 1 ? brands.map(brand => setFilteredProducts([...new Set(findDuplicates([...filteredProducts, ...products.filter(product => product.brand.name === brand)]))])) : 
        brands.map(brand => setFilteredProducts(([...new Set(findDuplicates(products.filter(product => product.brand.name === brand)))])));
        console.log(brands.length)
        // brands.length === 0 && setFilteredProducts(products);
    }

    function getProductsFilteredByVariant(arr) {
        arr.length > 1 ?
            arr.map(item => setFilteredProducts([...new Set(findDuplicates([...filteredProducts, ...products.filter(product => product.variantsList.indexOf(item) === -1 ? false : true)]))])) :
            arr.map(item => setFilteredProducts([...new Set(findDuplicates(products.filter(product => product.variantsList.indexOf(item) === -1 ? false : true)))]));
        // arr.length === 0 && setFilteredProducts(products);
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
        console.log(numberOfFilters);
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
                            <span style={{ display: 'none' }} className="numbered-products-results">{filteredProducts ? filteredProducts.length : 0} Results</span>
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
                                    {brandsFilter && brandsFilter.map((brand, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => setBrandsFilter(brandsFilter.filter(a => a !== brand))} />
                                            <span>{brand}</span>
                                        </div>
                                    ))}
                                    {colorFilter && colorFilter.map((color, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => { setColorFilter(colorFilter.filter(a => a !== color)); getProductsFilteredByVariant(colorFilter.filter(a => a !== color)); }} />
                                            <span>{color}</span>
                                        </div>
                                    ))}
                                    {widthFilter && widthFilter.map((width, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => { setWidthFilter(widthFilter.filter(a => a !== width)); getProductsFilteredByVariant(widthFilter.filter(a => a !== width)); }} />
                                            <span>{width}</span>
                                        </div>
                                    ))}
                                    {sizeFilter && sizeFilter.map((size, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => { setSizeFilter(sizeFilter.filter(a => a !== size)); getProductsFilteredByVariant(sizeFilter.filter(a => a !== size)); }} />
                                            <span>{size}</span>
                                        </div>
                                    ))}
                                    {materialFilter && materialFilter.map((material, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => { setMaterialFilter(materialFilter.filter(a => a !== material)); getProductsFilteredByVariant(materialFilter.filter(a => a !== material)); }} />
                                            <span>{material}</span>
                                        </div>
                                    ))}
                                    {toeStyleFilter && toeStyleFilter.map((toeStyle, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => { setToeStyleFilter(toeStyleFilter.filter(a => a !== toeStyle)); getProductsFilteredByVariant(toeStyleFilter.filter(a => a !== toeStyle)); }} />
                                            <span>{toeStyle}</span>
                                        </div>
                                    ))}
                                    {styleNumberFilter && styleNumberFilter.map((style, i) => (
                                        <div key={i} className="filter-swatch">
                                            <img src={CloseIcon} alt="remove" onClick={() => { setStyleNumberFilter(styleNumberFilter.filter(a => a !== style)); getProductsFilteredByVariant(styleNumberFilter.filter(a => a !== style)); }} />
                                            <span>{styleNumberFilter}</span>
                                        </div>
                                    ))}
                                </div>
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Brand"
                                    value="Brand"
                                    onChange={v => setBrandsFilter([...brandsFilter, v])}
                                    options={brandsFiltered}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Material"
                                    value="Material"
                                    onChange={v => setMaterialFilter([...materialFilter, v])}
                                    options={materialOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Color"
                                    value="Color"
                                    onChange={v => setColorFilter([...colorFilter, v])}
                                    options={colorOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Width"
                                    value="Width"
                                    onChange={v => setWidthFilter([...widthFilter, v])}
                                    options={widthOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Size"
                                    value="Size"
                                    onChange={v => setSizeFilter([...sizeFilter, v])}
                                    options={sizeOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Toe Shape"
                                    value="Toe Shape"
                                    onChange={v => setToeStyleFilter([...toeStyleFilter, v])}
                                    options={toeStyleOptions}
                                />
                                <Dropdown
                                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                                    placeholder="Style"
                                    value="Style"
                                    onChange={v => setStyleNumberFilter([...styleNumberFilter, v])}
                                    options={styleNumberOptions}
                                />


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
            </section>
            <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
        </div>
    )
}
