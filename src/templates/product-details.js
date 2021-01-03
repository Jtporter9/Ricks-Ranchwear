import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import AddToCartButton from '../components/bigcommerce/AddToCartButton';
import ProductPrices from '../components/bigcommerce/ProductPrices';
import TopSelling from '../components/topSelling/topSelling';
import Layout from '../components/Layout';
import groupedBoots from '../assets/grouped-boots.svg';
import infoIcon from '../assets/info-icon.svg';
import closeCollapsible from '../assets/close-collapsible.svg';
import openCollapsible from '../assets/open-collapsible.svg';

export default ({
  data: {
    allBigCommerceProducts: {
      nodes: [
        {
          name,
          id,
          bigcommerce_id,
          sku,
          price,
          calculated_price,
          retail_price,
          sale_price,
          map_price,
          description,
          weight,
          variants,
          images
        }
      ]
    }
  }
}) => {
  // FIND PRODUCTS OPTIONS
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

  let colorOptions = [];
  let sizeOptions = [];
  let widthOptions = [];

  variants.map(variant => variant.option_values.map(option => {
    option.option_display_name === "Color" && colorOptions.push(option.label)
    option.option_display_name === "Size" && sizeOptions.push(option.label)
    option.option_display_name === "Width" && widthOptions.push(option.label)
  }))


  colorOptions = [...new Set(findDuplicates(colorOptions))]; // Unique duplicates
  sizeOptions = [...new Set(findDuplicates(sizeOptions))]; // Unique duplicates
  widthOptions = [...new Set(findDuplicates(widthOptions))]; // Unique duplicates
  sizeOptions = sizeOptions.sort(function (a, b) { return a - b });
  // FIND PRODUCTS OPTIONS

  // STATES 
  const [selectedImage, updateSelectedImage] = useState(() => {
    for(let i = 0; i < images.length; i++) {
      if(images[i].is_thumbnail) {
        return images[i].url_standard
      } 
    }
  });

  const [activeColor, setActiveColor] = useState(colorOptions[0]);
  const [activeWidth, setActiveWidth] = useState('');
  const [activeSize, setActiveSize] = useState('');

  // console.log(
  //   {
  //     name: name,
  //     id: id,
  //     bigcommerce_id: bigcommerce_id,
  //     sku: sku,
  //     price: price,
  //     calculated_price: calculated_price,
  //     retail_price: retail_price,
  //     sale_price: sale_price,
  //     map_price: map_price,
  //     description: description,
  //     weight: weight,
  //     variants: variants,
  //     images: images
  //   }
  // );

  const product = {
    price,
    calculated_price,
    retail_price,
    sale_price,
    map_price,
    bigcommerce_id
  };

  function toggleCollapsible (e) {
    e.target.parentNode.nextSibling.className === '' ? e.target.parentNode.nextSibling.className = 'collapsible-closed' : e.target.parentNode.nextSibling.className = ''
    e.target.src === closeCollapsible ? e.target.src = openCollapsible : e.target.src = closeCollapsible
  }

  // REMOVE THIS 
  let imagesByColor = [];
  for(let i = 0; i < images.length; i++) {
    images[i].description === activeColor && imagesByColor.push(images[i])
  }

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
            </div>

            <div className="products-details-right">

              <div className="name-price-container">
                <h1>{name}</h1>
                <ProductPrices product={product} />
              </div>

              <div>
                Some kind of rating system :)
              </div>

              <div className="swatch-container">
                <label>Color</label>
                <div className="color-swatches">
                  {colorOptions.map((color, i) => (
                    <div key={i} className={`swatch ${color === activeColor ? `active-swatch` : ''}`} onClick={() => setActiveColor(color)}>{color}</div>
                  ))}
                </div>
              </div>

              <div className="swatch-container">
                <label>Width</label>
                <div className="width-swatches">
                  {widthOptions.map((width, i) => (
                    <div key={i} className={`swatch ${width === activeWidth ? `active-swatch` : ''}`} onClick={() => setActiveWidth(width)}>{width}</div>
                  ))}
                </div>
              </div>

              <div className="swatch-container">
                <label>Size</label>
                <div className="size-swatches"> 
                  {sizeOptions.map((size, i) => (
                    <div key={i} className={`swatch ${size === activeSize ? `active-swatch` : ''}`} onClick={() => setActiveSize(size)}>{size}</div>
                  ))}
                  <Link to="/">Size Chart</Link>
                </div>
              </div>


              <AddToCartButton
                productId={bigcommerce_id}
                variantId={variants[0].id}>
                Add to Cart
              </AddToCartButton>

              <div className="coupon-banner">
                <img src={groupedBoots} />
                <strong>Buy 1 and get 2, free!</strong>
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
                <img src={closeCollapsible} onClick={toggleCollapsible}/>
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
                <img src={closeCollapsible} onClick={toggleCollapsible}/>
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

        {/* <TopSelling product={products}/> */}

      </div>
    </Layout>
  );
};

export const query = graphql`
  query($productId: String!) {
    allBigCommerceProducts(filter: { id: { eq: $productId } }) {
      nodes {
        id
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
        images {
          url_standard
          url_thumbnail
          description
          is_thumbnail
        }
        variants {
          product_id
          id
          option_values {
            label
            option_display_name
          }
          sku
        }
      }
    }
  }
`;
