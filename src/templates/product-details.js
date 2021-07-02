import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';

import AddToCartButton from '../components/bigcommerce/AddToCartButton';
import ProductPrices from '../components/bigcommerce/ProductPrices';
import TopSelling from '../components/topSelling/topSelling';
import Layout from '../components/Layout';
import ProductDetailsCollapsible from '../components/productDetailsCollapsible/productDetailsCollapsible'
import InfoModal from '../components/infoModal/infoModal';
import SizeChart from '../components/sizeChart/sizeChart';

// ASSETS
import groupedBoots from '../assets/grouped-boots.svg';
import infoIcon from '../assets/info-icon.svg';
import { divide, filter } from 'lodash';

const SelectionTooltip = ({message}) => (
  <div className="tooltip-message">
    <p>{message}</p>
    <span className={"tooltip-message-carrot ttm-carrot-left"}/>
    <span className={"tooltip-message-carrot ttm-carrot-right"}/>
  </div>
);

export default (context) => {
  const { data: { allBigCommerceProducts, allBigCommerceBrands }, pageContext: { productId } } = context;

  for (let i = 0; i < allBigCommerceProducts.nodes.length; i++) {
    for (let j = 0; j < allBigCommerceBrands.edges.length; j++) {
      if (allBigCommerceProducts.nodes[i].brand_id === allBigCommerceBrands.edges[j].node.bigcommerce_id) {
        allBigCommerceProducts.nodes[i] = { ...allBigCommerceProducts.nodes[i], brand: allBigCommerceBrands.edges[j].node }
      }
    }
  }

  const { nodes: products } = allBigCommerceProducts;
  let product = {};

  products.map(p => {
    if (p.id === productId) {
      product = p;
    }
  })

  const {
    bigcommerce_id,
    description,
    images,
    name,
    sku,
    variants,
    weight,
    brand: { name: brandName },
    custom_fields,
    price
  } = product;

  // FIND PRODUCTS OPTIONS
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) === index)

  let colorOptions = [];
  let sizeOptions = [];
  let widthOptions = [];

  let variantsInStock = [];

  const colorKey = "Color";
  const sizeKey = "Size";
  const widthKey = "Width";

  variants.map(variant => variant.option_values.map(option => {
    option.option_display_name === colorKey && colorOptions.push(option.label)
    option.option_display_name === sizeKey && sizeOptions.push(option.label)
    option.option_display_name === widthKey && widthOptions.push(option.label)
  }))

  colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
  sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicatesa
  widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
  sizeOptions = sizeOptions.sort(function (a, b) { return a - b });
  // FIND PRODUCTS OPTIONS
  images.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1)

  // STATES
  const [selectedImage, updateSelectedImage] = useState(() => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].is_thumbnail) {
        return images[i]
      }
    }
  });

  const [activeColor, setActiveColor] = useState(colorOptions.length > 0 ? colorOptions[0] : "");
  const [activeWidth, setActiveWidth] = useState(widthOptions.length === 0 ? true : '');
  const [activeSize, setActiveSize] = useState('');
  const [activeVariant, setActiveVariant] = useState(variants[0]);
  const [activeImagesByColor, setActiveImagesByColor] = useState(() => getActiveImagesByColor());
  const [activeInfoModal, setActiveInfoModal] = useState(false);
  const [activeSizeChart, setActiveSizeChart] = useState(false);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isWidthPresent, setIsWidthPresent] = useState(false);
  const [activeVariantMessages, setActiveVariantMessages] = useState({
    width: "",
    size: ""
  });

  const tooltipMessages = {
    width: "Please select a Width",
    size: "Please select a Size",
  }

  function getActiveImagesByColor() {
    let imagesByColor = []
    for (let j = 0; j < images.length; j++) {
      if (activeColor && images[j].description) {
        images[j].description ? images[j].description === activeColor && imagesByColor.push(images[j]) : imagesByColor.push(images[j])
      } else {
        imagesByColor.push(images[j])
      }
    }
    return imagesByColor;
  }

  function updateSelectedDetail(type, data) {
    if (type === colorKey) {
      activeColor !== data && setFilteredInventory(variants);
      setActiveColor(data);
    }
    if (type === widthKey) {
      activeWidth !== data && setFilteredInventory(variants);
      setActiveWidth(data);
    }
    if (type === sizeKey) {
      activeSize !== data && setFilteredInventory(variants);
      setActiveSize(data);
    }
  }

  function checkVariantQuantities() {
    let colorsInStock = [];
    let widthsInStock = [];
    let sizesInStock = [];

    if (filteredInventory.length !== 0) {
      activeColor && filteredInventory.forEach(variant => variant.option_values.forEach(option => {
        (option.label === activeColor) && colorsInStock.push(variant);
      }))
      activeWidth && colorsInStock.forEach(variant => variant.option_values.forEach(option => {
        (option.label === activeWidth) && widthsInStock.push(variant);
      }))
      // activeSize && widthsInStock.forEach(variant => variant.option_values.forEach(option => {
      //   (option.label === activeSize) && sizesInStock.push(variant);
      // }))
      activeColor && setFilteredInventory(colorsInStock);
      isWidthPresent && (activeWidth && activeColor) && setFilteredInventory(widthsInStock);
      // (activeSize && activeWidth && activeColor) && setFilteredInventory(sizesInStock);
    } else {
      setFilteredInventory(variants)
    }
  }

  // THIS CAN BE BETTER
  function getProductVariant() {
    variants.forEach(variant => {
      let colorMatch = false;
      let widthMatch = false;
      let sizeMatch = false;
      variant.option_values.forEach(option => {
        if (option.option_display_name === 'Color' && option.label === activeColor) {
          colorMatch = true;
        }
        if (option.option_display_name === 'Width' && option.label === activeWidth) {
          widthMatch = true;
          setIsWidthPresent(true);
        }
        if (option.option_display_name === 'Size' && option.label === activeSize) {
          sizeMatch = true;
        }
      })
      colorMatch && sizeMatch && setActiveVariant(variant)
    })
  };

  const showTooltip = () => {
    const activeFlags = [{width: activeWidth}, {size: activeSize}];
    const updatedVariantMessages = {...activeVariantMessages};
    activeFlags.forEach(flag => {
      const flagEntry = Object.entries(flag);
      const key = flagEntry[0][0];
      const value = flagEntry[0][1];
      const message = key === "width" ? tooltipMessages.width : tooltipMessages.size;
      value === "" ? updatedVariantMessages[key] = message : updatedVariantMessages[key] = "";
    });
    setActiveVariantMessages(updatedVariantMessages);
  };

  useEffect(() => {
    (activeColor || activeSize || activeWidth) && checkVariantQuantities();
    // SELECTS VARIANT WHEN COLOR, WIDTH, AND SIZE ARE SET
    (activeSize && activeWidth) && getProductVariant();
    // UPDATE SIDE PHOTOS
    (activeColor && activeImagesByColor.length) && (activeColor !== activeImagesByColor[0].description && setActiveImagesByColor(() => getActiveImagesByColor()));
    // UPDATE MAIN IMAGE
      (activeImagesByColor.length && activeImagesByColor[0].description) ? selectedImage.description !== activeImagesByColor[0].description && updateSelectedImage(activeImagesByColor[0]) : updateSelectedImage(activeImagesByColor[0])
  }, [activeColor, activeWidth, activeSize, activeImagesByColor, selectedImage, isWidthPresent]);
  
  return (
    <Layout>
      <div className="product-details">
        <section className="section container">
          <div className="products-details-head">
            <div className="products-photos-container">
              <div className="side-photos">
                {activeImagesByColor.length &&
                  activeImagesByColor.map((img, i) => (
                    <img
                      height="100px"
                      width="100px"
                      src={img.url_thumbnail}
                      alt="Thumb"
                      key={JSON.stringify(img)}
                      onClick={() => updateSelectedImage(img)}
                    />
                  ))}
              </div>
              <div className="selected-image-container">
                <img
                  src={
                    (selectedImage && selectedImage.url_zoom) ||
                    '/img/default-bc-product.png'
                  }
                  alt="Main"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="name-price-container">
                <div>
                  <span className="brand-name">{brandName}</span>
                  <h1>{name}</h1>
                </div>
                <ProductPrices product={product} variantPrice={activeVariant.price} />
              </div>
            </div>

            <div className="products-details-right">
              <div className="name-price-container">
                <div>
                  <span>{brandName}</span>
                  <h1>{name}</h1>
                </div>
              <ProductPrices product={product} variantPrice={activeVariant.price} />
              </div>

              {colorOptions.length > 0 && (
                <div className="swatch-container">
                  <label>Color</label>
                  <div className="color-swatches">
                    {colorOptions.map((color, i) => {
                      return (
                        <button key={i} className={`swatch ${color === activeColor ? `active-swatch` : ''}`} onClick={() => updateSelectedDetail(colorKey, color)}>{color}</button>
                      )
                    }
                    )}
                  </div>
                </div>
              )}
              {widthOptions.length > 0 && (
                <div className="swatch-container">
                  <label>Width</label>
                  <div className="width-swatches">
                    {activeVariantMessages.width !== "" && <SelectionTooltip message={activeVariantMessages.width}/>}
                    {widthOptions.map((width, i) => {
                      return (
                        <button
                          key={i}
                          className={`swatch ${width === activeWidth ? `active-swatch` : ''}`}
                          onClick={() => {
                            if(activeWidth !== "") {
                              setActiveSize("");
                            }
                            setActiveVariantMessages({
                              size: activeWidth !== "" ? tooltipMessages.size : "",
                              width: ""
                            });
                            updateSelectedDetail(widthKey, width);
                          }
                          }>{width}</button>
                      )
                    }
                    )}
                  </div>
                </div>
              )}

              <div className="swatch-container">
                <label>Size</label>
                {/* TODO: make swatches into a component  */}
                <div className="size-swatches">
                  {activeVariantMessages.size !== "" && <SelectionTooltip message={activeVariantMessages.size}/> }
                  {sizeOptions.map((size, i) => {
                    let inventoryStatus = true;
                    if (filteredInventory.length > 0) {
                      inventoryStatus = false;
                      for (let i = 0; i < filteredInventory.length; i++) {
                        for (let j = 0; j < filteredInventory[i].option_values.length; j++) {
                          if (filteredInventory[i].option_values[j].option_display_name === 'Size' && filteredInventory[i].option_values[j].label === size && filteredInventory[i].inventory_level !== 0) {
                            inventoryStatus = true;
                            break;
                          }
                        }
                      }
                    }

                    return (
                      <button
                        style={{ minWidth: size.length <= 4 ? '66px' : '120px' }}
                        key={i}
                        className={`swatch ${!inventoryStatus && 'out-of-stock-swatch'} ${size === activeSize ? `active-swatch` : ''}`}
                        onClick={() => {
                          setActiveVariantMessages({
                            ...activeVariantMessages,
                            size: ""
                          });
                          inventoryStatus && updateSelectedDetail(sizeKey, size)
                        }}>{size}</button>
                    )
                  }
                  )}
                  <a className="size-chart-link" onClick={() => setActiveSizeChart(true)}>Size Chart</a>
                </div>
              </div>

              <AddToCartButton
                simulateDisabled={activeSize && activeWidth ? (activeVariant.inventory_level === 0 ? true : false) : true}
                productId={bigcommerce_id}
                variant={{ ...activeVariant, price }}
                showTooltip={() => showTooltip()}>
                {(activeSize && activeWidth) ? activeVariant.inventory_level === 0 ? 'Out of Stock' : 'Add to Cart' : 'Select Width & Size'}
              </AddToCartButton>

              <div className="coupon-banner" onClick={() => setActiveInfoModal(true)} >
                <img src={groupedBoots} alt="grouped boots" />
                <strong>Buy 1 pair, get TWO pair FREE!</strong>
                <img src={infoIcon} alt="discount info" />
              </div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="product-details-container">

            <ProductDetailsCollapsible title="Description" description={description} custom_fields={custom_fields} showVideo={true}/>
            <ProductDetailsCollapsible title="Features" description={description} custom_fields={custom_fields} />
            <ProductDetailsCollapsible title="Shipping and Returns" description={description} custom_fields={custom_fields} />

          </div>
        </section>

        <section className="section container">
          <TopSelling products={products} />
        </section>

        <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
        <SizeChart activeSizeChart={activeSizeChart} setActiveSizeChart={setActiveSizeChart} />
      </div >
    </Layout >
  );
};

export const query = graphql`
  query {
    allBigCommerceProducts(sort: {fields: images___sort_order}, filter: {is_visible: {eq: true}}) {
      nodes {
        id
        brand_id
        bigcommerce_id
        name
        sku
        price
        calculated_price
        retail_price
        sale_price
        map_price
        description
        weight
        custom_url {
          url
        }
        images {
          url_standard
          url_thumbnail
          description
          is_thumbnail
          sort_order
          url_zoom
        }
        variants {
          product_id
          id
          option_values {
            label
            option_display_name
          }
          sku
          inventory_level
          price
        }
        custom_fields {
          id
          name
          value
        }
      }
    }
    allBigCommerceBrands {
      edges {
        node {
          id
          name
          bigcommerce_id
        }
      }
    }
  }
`;
