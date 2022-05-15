//Node Modules
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

//Components
import ProductCard from '../bigcommerce/ProductCard';
import TopSelling from '../topSelling/topSelling';
import Dropdown from '../dropdown/dropdown';
import InfoModal from '../infoModal/infoModal';

//Contexts
import { useContentContext } from 'src/context/ContentContextV2';

// ASSESTS
import caretDownLight from '../../assets/caret-down-light.svg';
import caretUpDark from '../../assets/caret-up-dark.svg';
import CloseIcon from '../../assets/close-icon.svg';
import CloseIconWhite from '../../assets/close-icon-white.svg';

//Constants
const blackListedBCIds = [
  178
];

//Functions
const stateSetterLookupString = (type, useLowerCase = false) => {
  let lookupString = '';
  switch(type) {
    case "Toe Shape":
      lookupString = "ToeStyle";
      break;
    case "Style":
      lookupString = "StyleNumber";
      break;
    default:
      lookupString = type;
  }

  return useLowerCase ? lookupString[0].toLowerCase() + lookupString.substring(1) : lookupString;
};

const ProductsPageContainer = ({
  products,
  brands,
  pageCategory,
}) => {
  const location = useLocation();
  const {content} = useContentContext();
  const {
    filterContent = {
      categoryOptionText: "",
      categoryOptions: [],
      clearAllText: "",
      filterHeaderText: "",
      filterIcon: {
        url: ""
      },
      noFiltersSelectedText: ""
    },
    heroImage = {
      url: ""
    },
    heroHeaderText = "",
    quickFilters = [],
    shared = {
      buyOneGetTwoBanner: {
        bootsIconRed: {
          url: ""
        },
        infoIconBlack: {
          url: ""
        }
      },
      buyOneGetTwoText: ""
    },
    storeBanner = {
      bannerStoreIcon: {
        url: ""
      },
      bannerText: "",
      bannerLink: {
        link: "",
        text: ""
      }
    },
    topSellingText = ""
  } = content;

  // Figure out the issue with quick filters not matching up
  /*The options list is filtering out the Best Selling option right now because we currently dont have a way to filter by best selling. Once that data is available from big commerce we will be able to filter by that criteria*/
  const optionsList = quickFilters.length > 0 ? [...quickFilters].filter(option => option.toLowerCase() !== "best selling") : [];

  const getJsonFromUrl = (url = location.search) => {
    const query = url.substr(1);
    const result = {};
    query.split("&").forEach(function (part) {
      const item = part.split("=");
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
  let featureOptions = [];

  const colorKey = "Generic Colors";
  const sizeKey = "Size";
  const widthKey = "Width";

  products.forEach(product => {
    console.log(product.bigcommerce_id);
    if(!blackListedBCIds.includes(product.bigcommerce_id)) {
      console.log(product.brand.name);
      product.variantsList = [];
      product.variantsList.push(product.brand.name);
      product.variants.map(variant => variant.option_values.map(option => {
        option.option_display_name === sizeKey && sizeOptions.push(option.label);
        option.option_display_name === widthKey && widthOptions.push(option.label);
        if (variant.inventory_level !== 0) {
          product.variantsList.push(option.label)
        } else {
          product.variantsList = [...new Set(findDuplicates(product.variantsList))];
        }
      }));
      product.custom_fields.map(field => {
        field.name.toLowerCase() === "material" && materialOptions.push(field.value);
        field.name.toLowerCase() === "toe style" && toeStyleOptions.push(field.value);
        field.name.toLowerCase() === "boot type" && bootTypeOptions.push(field.value);
        field.name.toLowerCase() === "feature" && featureOptions.push(field.value);
        if (field.name === colorKey) {
          let colors = field.value.split(',');
          for (let i = 0; i < colors.length; i++) {
            colorOptions.push(colors[i].trim());
            product.variantsList = [...new Set(findDuplicates([...product.variantsList, colors[i].trim()]))];
          }
        }
        product.variantsList = [...new Set(findDuplicates([...product.variantsList, field.value]))];
      });
    }
  });

  colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
  sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicates
  widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
  materialOptions = [...new Set(findDuplicates(materialOptions))]; // Unique duplicates
  toeStyleOptions = [...new Set(findDuplicates(toeStyleOptions))]; // Unique duplicates
  bootTypeOptions = [...new Set(findDuplicates(bootTypeOptions))]; // Unique duplicates
  featureOptions = [...new Set(findDuplicates(featureOptions))]; // Unique duplicates
  sizeOptions = sizeOptions.sort(function (a, b) { return a - b });

  const brandsFiltered = brands.map(obj => obj.node.name);

  // STATES
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterDrawerActiveClass, setFilterDrawerActiveClass] = useState('');
  const [quickFilter, setQuickFilter] = useState(null);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [widthFilter, setWidthFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);

  const [materialFilter, setMaterialFilter] = useState([]);
  const [toeStyleFilter, setToeStyleFilter] = useState([]);
  const [styleNumberFilter, setStyleNumberFilter] = useState([]);
  const [featureFilter, setFeatureFilter] = useState([]);

  const [isSticky, setSticky] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfFilters, setNumberOfFilters] = useState(null);
  const [categoryDropDown, setCategoryDropDown] = useState(true);
  const [params, setParams] = useState(false);
  const multipleFiltersRef = useRef([]);
  const changedFilterRef = useRef('');

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
    filterDrawerActiveClass === ''
      ? setFilterDrawerActiveClass('filter-drawer-open')
      : setFilterDrawerActiveClass('');
  };

  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  const getProductsFilteredByVariant = () => {
    setQuickFilter(null);
    const createFilteredSet = arr => new Set(findDuplicates(arr));
    const createFilteredProducts = (filterValue, productsArray) => {
      const updatedProducts = [];
      productsArray.forEach(product => {
        if(product.variantsList.includes(filterValue)) {
          updatedProducts.push(product);
        }
      });

      return updatedProducts;
    };

    if (multipleFiltersRef.current.length >= 1) {
      let tempProductArray = [];
      multipleFiltersRef.current.forEach(filter => {
        tempProductArray = createFilteredProducts(filter.value, tempProductArray.length ? tempProductArray : products);
      });

      setFilteredProducts(
        [...createFilteredSet(tempProductArray)]
      );
    } else {
      setFilteredProducts(
        [...createFilteredSet(products)]
      )
    }
  };

  const clearAllFilters = () => {
    multipleFiltersRef.current = [];
    setBrandsFilter([]);
    setColorFilter([]);
    setWidthFilter([]);
    setSizeFilter([]);
    setMaterialFilter([]);
    setToeStyleFilter([]);
    setStyleNumberFilter([]);
    setFeatureFilter([]);
    setFilteredProducts(products);
    setQuickFilter(null);
  };

  const toggleFilter = (arr, value, type) => {
    const stateSetters = {
      setBrandsFilter: updatedBrandFilter => setBrandsFilter(updatedBrandFilter),
      setColorFilter: updatedColorFilter => setColorFilter(updatedColorFilter),
      setWidthFilter: updatedWidthFilter => setWidthFilter(updatedWidthFilter),
      setSizeFilter: updatedSizeFilter => setSizeFilter(updatedSizeFilter),
      setMaterialFilter: updatedMaterialFilter => setMaterialFilter(updatedMaterialFilter),
      setToeStyleFilter: updatedToeStyleFilter => setToeStyleFilter(updatedToeStyleFilter),
      setStyleNumberFilter: updatedStyleNumberFilter => setStyleNumberFilter(updatedStyleNumberFilter),
      setFeatureFilter: updatedFeatureFilter => setFeatureFilter(updatedFeatureFilter),
    };

    const setter = `set${stateSetterLookupString(type)}Filter`;

    if(!arr.length || value !== arr[0]) {
      // Remove the filter from the multipleFiltersRef
      multipleFiltersRef.current = multipleFiltersRef.current.filter(filter => filter.type !== type);
      // Adds filter that was changed as current value to ref to run logic in useEffect with filter dependencies
      changedFilterRef.current = stateSetterLookupString(type);
      if (arr.length && arr[0] === value) {
        changedFilterRef.current = '';
        // Remove the value from the array
        stateSetters[setter]([]);
      } else {
        // Add value to the array
        stateSetters[setter]([value]);
        multipleFiltersRef.current.push({type, value});
      }
      document.getElementById("products-container") && document.getElementById("products-container").scrollIntoView({behavior: 'smooth'});
    }
  };

  const removeFilter = (type, setStateCallback) => {
    multipleFiltersRef.current = multipleFiltersRef.current.filter(filter => filter.type.toLowerCase() !== type.toLowerCase());
    setStateCallback([]);
  };

  const applyQuickFilter = (filterValue) => {
    let updatedFilteredProducts = filteredProducts;
    setQuickFilter(filterValue);
    switch (filterValue) {
      case 'Best Selling':
        break;
      case 'Price: Low to High':
        updatedFilteredProducts = updatedFilteredProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
        break;
      case 'Price: High to Low':
        updatedFilteredProducts = updatedFilteredProducts.sort((a, b) => (a.price < b.price) ? 1 : -1);
        break;
      default:
        break;
    }

    setFilteredProducts(updatedFilteredProducts);
  };

  useEffect(() => {
    setNumberOfFilters(
      brandsFilter.length +
      colorFilter.length +
      sizeFilter.length +
      widthFilter.length +
      materialFilter.length +
      toeStyleFilter.length +
      styleNumberFilter.length +
      featureFilter.length
    );
    filteredProducts.length === 0 && setFilteredProducts(products);
    numberOfFilters === 0 && setFilteredProducts(products);

    window.addEventListener('load', setIsMobileView(window.matchMedia('(max-width: 1000px)').matches));
    window.addEventListener('resize', setIsMobileView(window.matchMedia('(max-width: 1000px)').matches));
    window.addEventListener('scroll', handleScroll);

    switch(changedFilterRef.current) {
      case 'Brand':
        getProductsFilteredByVariant(brandsFilter[0]);
        break;
      case 'Color':
        getProductsFilteredByVariant(colorFilter[0]);
        break;
      case 'Feature':
        getProductsFilteredByVariant(featureFilter[0]);
        break;
      case 'Material':
        getProductsFilteredByVariant(materialFilter[0]);
        break;
      case 'Size':
        getProductsFilteredByVariant(sizeFilter[0]);
        break;
      case 'StyleNumber':
        getProductsFilteredByVariant(styleNumberFilter[0]);
        break;
      case 'ToeShape':
        getProductsFilteredByVariant(toeStyleFilter[0]);
        break;
      case 'Width':
        getProductsFilteredByVariant(widthFilter[0]);
        break;
      default:
        break;
    };

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [numberOfFilters, brandsFilter, colorFilter, sizeFilter, widthFilter, materialFilter, toeStyleFilter, styleNumberFilter, featureFilter]);

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
  }, [params, location]);

  return (
    <div className="product-page">
      <div
        className="hero full-width-image-container margin-top-0"
        style={{
          backgroundImage: `url(${heroImage.url ? heroImage.url : ""})`
        }}>
        <div className="opaque-overlay"></div>
        <h2 className="hero-title">
          {heroHeaderText}
        </h2>

        <div className="stores-link-banner">
          <img src={storeBanner.bannerStoreIcon.url} alt="Mobile Filters" />
          <p>
            {storeBanner.bannerText.split("{STORES_LINK}")[0] + " "}
            <Link to={storeBanner.bannerLink.link}>{storeBanner.bannerLink.text}</Link>
            {" " + storeBanner.bannerText.split("{STORES_LINK}")[1]}
          </p>
        </div>
      </div>
      <section id="products-container" className="products-container">
        <div className="container">
          <div className="products-header">
            <div className="products-header-split">
              <button className="toggle-filters" onClick={toggleFilterDrawer}>
                <img src={filterContent.filterIcon.url} alt="Mobile filter icon" />
                <span>
                                    {filterContent.filterHeaderText} {numberOfFilters > 0 && `(${numberOfFilters})`}
                                </span>
              </button>
              <div className="coupon-banner" onClick={() => setActiveInfoModal(true)}>
                <img src={shared.buyOneGetTwoBanner.bootsIconRed.url} alt="Red grouped boots icon"/>
                <strong>{shared.buyOneGetTwoBanner.buyOneGetTwoText}</strong>
                <img src={shared.buyOneGetTwoBanner.infoIconBlack.url} alt="Black info icon"/>
              </div>
            </div>
            <div className="products-header-split">
                            <span className="numbered-products-results">
                                {filteredProducts ? filteredProducts.length : 0} {content.resultsText}
                            </span>
            </div>
            <div className="products-header-split">
              <Dropdown
                listDropDown
                dropDownClasses={{ head: 'products-quick-filter', optionContainer: 'dropdown-options-container' }}
                placeholder="Select Quick Filter"
                value={quickFilter}
                onChange={filterValue => applyQuickFilter(filterValue)}
                options={optionsList}
              />
            </div>
          </div>
          <div className="products-section">
            <div className={`mobile-opaque-background ${filterDrawerActiveClass}`} onClick={toggleFilterDrawer}></div>
            <div className={`products-filter-container ${filterDrawerActiveClass}`}>
              <div className={`${isSticky ? ' sticky' : ''}`}>
                <div className="products-filter-head">
                  <img src={filterContent.filterIcon.url} alt="Mobile filter icon" />
                  <span>Filters</span>
                </div>
                <div className="selected-filters">
                  {numberOfFilters < 1 && (
                    <div style={{ padding: '0 1rem' }}>
                      <span>{filterContent.noFiltersSelectedText}</span>
                    </div>
                  )}
                  {numberOfFilters > 0 && (
                    <div className="filter-swatch" style={{ backgroundColor: 'white' }} onClick={clearAllFilters}>
                      <img src={CloseIcon} alt="Clear All" />
                      <span style={{ color: '#767676' }}>{filterContent.clearAllText}</span>
                    </div>
                  )}
                  {brandsFilter && brandsFilter.map((brand, i) => (
                    <div key={i} className="filter-swatch">
                      {/*IMPLEMENT THE removeFilter FUNCTION ON ALL OF THE OTHER ITEMS*/}
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Brand', setBrandsFilter)} />
                      <span>{brand}</span>
                    </div>
                  ))}
                  {colorFilter && colorFilter.map((color, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Color', setColorFilter)} />
                      <span>{color}</span>
                    </div>
                  ))}
                  {widthFilter && widthFilter.map((width, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Width', setWidthFilter)} />
                      <span>{width}</span>
                    </div>
                  ))}
                  {sizeFilter && sizeFilter.map((size, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Size', setSizeFilter)} />
                      <span>{size}</span>
                    </div>
                  ))}
                  {materialFilter && materialFilter.map((material, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Material', setMaterialFilter)} />
                      <span>{material}</span>
                    </div>
                  ))}
                  {toeStyleFilter && toeStyleFilter.map((toeStyle, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Toe Shape', setToeStyleFilter)} />
                      <span>{toeStyle}</span>
                    </div>
                  ))}
                  {styleNumberFilter && styleNumberFilter.map((style, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Style', setStyleNumberFilter)} />
                      <span>{style}</span>
                    </div>
                  ))}
                  {featureFilter && featureFilter.map((feature, i) => (
                    <div key={i} className="filter-swatch">
                      <img src={CloseIconWhite} alt="remove" onClick={() => removeFilter('Feature', setFeatureFilter)} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="filter-drop-down">
                  <div className="products-side-filter-head" onClick={() => setCategoryDropDown(!categoryDropDown)}>
                    <span className={`${categoryDropDown && 'dropdown-open'}`}>{filterContent.categoryOptionText}</span>
                    <img src={categoryDropDown ? caretUpDark : caretDownLight} alt="Dropdown" />
                  </div>

                  <ul className="side-filter-dropdown-container">
                    {
                      categoryDropDown &&
                      filterContent.categoryOptions.length > 0 &&
                      filterContent.categoryOptions.map((option, id) => (
                          <Link to={option.link} key={id}>
                            <li className="dropdown-option">
                              {option.text}
                            </li>
                          </Link>
                        )
                      )
                    }
                  </ul>
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
                {featureOptions.length > 1 && (
                  <Dropdown
                    dropDownClasses={{ head: 'products-side-filter-head', optionContainer: 'side-filter-dropdown-container' }}
                    placeholder="Feature"
                    value="Feature"
                    onChange={v => toggleFilter(featureFilter, v, "Feature")}
                    options={featureOptions}
                    selectedFilters={featureFilter}
                    defaultOpenState={false}
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
              {filteredProducts && filteredProducts.map(product => !blackListedBCIds.includes(product.bigcommerce_id) && (
                <ProductCard
                  key={product.id}
                  product={product}
                  topSelling={false}
                  pageCategory={pageCategory}
                />
              ))}
            </div>
          </div>
          <section className="section">
            <TopSelling headerText={topSellingText} products={products} />
          </section>
        </div>
      </section >
      <InfoModal
        activeInfoModal={activeInfoModal}
        setActiveInfoModal={setActiveInfoModal}
        content={shared.buyOneGetTwoBanner}/>
    </div >
  )
}

export default ProductsPageContainer;
