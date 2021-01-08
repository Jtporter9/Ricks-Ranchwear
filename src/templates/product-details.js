import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';

import AddToCartButton from '../components/bigcommerce/AddToCartButton';
import ProductPrices from '../components/bigcommerce/ProductPrices';
import TopSelling from '../components/topSelling/topSelling';
import Layout from '../components/Layout';
import groupedBoots from '../assets/grouped-boots.svg';
import infoIcon from '../assets/info-icon.svg';
import closeCollapsible from '../assets/close-collapsible.svg';
import openCollapsible from '../assets/open-collapsible.svg';

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
    brand: { name: brandName }
  } = product;

  // FIND PRODUCTS OPTIONS
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

  let colorOptions = [];
  let sizeOptions = [];
  let widthOptions = [];

  const colorKey = "Color";
  const sizeKey = "Size";
  const widthKey = "Width";

  variants.map(variant => variant.option_values.map(option => {
    option.option_display_name === colorKey && colorOptions.push(option.label)
    option.option_display_name === sizeKey && sizeOptions.push(option.label)
    option.option_display_name === widthKey && widthOptions.push(option.label)
  }))


  colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
  sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicates
  widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
  sizeOptions = sizeOptions.sort(function (a, b) { return a - b });
  // FIND PRODUCTS OPTIONS

  // STATES 
  const [selectedImage, updateSelectedImage] = useState(() => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].is_thumbnail) {
        return images[i].url_standard
      }
    }
  });

  const [activeColor, setActiveColor] = useState(colorOptions[0]);
  const [activeWidth, setActiveWidth] = useState('');
  const [activeSize, setActiveSize] = useState('');
  const [activeVariant, setActiveVariant] = useState(variants[0]);

  function toggleCollapsible(e) {
    e.target.parentNode.nextSibling.className === '' ? e.target.parentNode.nextSibling.className = 'collapsible-closed' : e.target.parentNode.nextSibling.className = ''
    e.target.src === closeCollapsible ? e.target.src = openCollapsible : e.target.src = closeCollapsible
  }

  // REMOVE THIS 
  let imagesByColor = [];
  for (let j = 0; j < images.length; j++) {
    images[j].description === activeColor && imagesByColor.push(images[j])
  }

  // THIS CAN BE BETTER 
  function getProductVariant() {
    variants.forEach(variant => {
      (
        variant.option_values[0].label === activeColor &&
        variant.option_values[1].label === activeSize &&
        variant.option_values[2].label === activeWidth
      ) && setActiveVariant(variant);
    })
  }

  useEffect(() => { 
    // SELECTS VARIANT WHEN COLOR, WIDTH, AND SIZE ARE SET
    (activeColor && activeSize && activeWidth) && getProductVariant()
   });

  return (
    <Layout>
      <div className="product-details">
        <section className="section container">
          <div className="products-details-head">
            <div className="products-photos-container">
              <div className="side-photos">
                {imagesByColor.length &&
                  imagesByColor.map((img, i) => (
                    <img
                      key={i}
                      height="100px"
                      width="100px"
                      src={img.url_thumbnail}
                      alt="Thumb"
                      key={JSON.stringify(img)}
                      onClick={() => updateSelectedImage(img.url_standard)}
                    />
                  ))}
              </div>
              <div className="selected-image-container">
                <img
                  src={
                    (selectedImage && selectedImage) ||
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
                <ProductPrices product={product} />
              </div>
            </div>

            <div className="products-details-right">
              <div className="name-price-container">
                <div>
                  <span>{brandName}</span>
                  <h1>{name}</h1>
                </div>
                <ProductPrices product={product} />
              </div>
              {/* 
              <div>
                Some kind of rating system :)
              </div> */}

              {activeVariant.inventory_level === 0 && <div className={`out-of-stock-message`}>This selection you made is out of stock.</div>}

              <div className="swatch-container">
                <label>Color</label>
                <div className="color-swatches">
                  {colorOptions.map((color, i) => (
                    <button key={i} className={`swatch ${color === activeColor ? `active-swatch` : ''}`} onClick={() => setActiveColor(color)}>{color}</button>
                  ))}
                </div>
              </div>

              <div className="swatch-container">
                <label>Width</label>
                <div className="width-swatches">
                  {widthOptions.map((width, i) => (
                    <button key={i} className={`swatch ${width === activeWidth ? `active-swatch` : ''}`} onClick={() => setActiveWidth(width)}>{width}</button>
                  ))}
                </div>
              </div>

              <div className="swatch-container">
                <label>Size</label>
                <div className="size-swatches">
                  {sizeOptions.map((size, i) => (
                    <button key={i} className={`swatch ${size === activeSize ? `active-swatch` : ''}`} onClick={() => setActiveSize(size)}>{size}</button>
                  ))}
                  <Link className="size-chart-link" to="/">Size Chart</Link>
                </div>
              </div>

              <AddToCartButton
                disabled={activeColor && activeSize && activeWidth ? (activeVariant.inventory_level === 0 ? true : false) : true}
                productId={bigcommerce_id}
                variantId={activeVariant.id}>
                Add to Cart
              </AddToCartButton>
                  
              <div className="coupon-banner">
                <img src={groupedBoots} />
                <strong>Buy 1 pair, get 2 pair free!</strong>
                <img src={infoIcon} />
              </div>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="product-details-container">
            <div className="collapsible">
              <div className="split-title">
                <h4 className="bc-single-product__section-title">Description</h4>
                <img src={closeCollapsible} onClick={toggleCollapsible} />
              </div>
              <div className="">
                <div
                  className="bc-product__description"
                  dangerouslySetInnerHTML={{ __html: description }}>
                </div>
                <p>
                  <span>SKU:</span>{' '}
                  {sku}
                </p>
              </div>
            </div>

            <div className="collapsible">
              <div className="split-title">
                <h4 className="bc-single-product__section-title">Specifications</h4>
                <img src={closeCollapsible} onClick={toggleCollapsible} />
              </div>
              <div className="">
                <ul className="bc-product__spec-list">
                  <li className="bc-product__spec">
                    <span className="bc-product__spec-title">Weight:</span>{' '}
                    <span className="bc-product__spec-value">{weight} oz</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section container">
          <TopSelling products={products} />
        </section>

      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allBigCommerceProducts {
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
