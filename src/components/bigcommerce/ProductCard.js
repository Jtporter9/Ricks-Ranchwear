import React, { useState } from 'react';
import { Link } from 'gatsby';
import AddToCartButton from './AddToCartButton';
import ProductPrices from './ProductPrices';

const ProductCard = ({ product }) => {
  const { images } = product;

  const [defaultImage, setDefaultImage] = useState(findDefaultImage());
  const [imageOptions, setImageOptions] = useState(getActiveImagesByColor());

function findDefaultImage() {
  let defaultImage;
  for (let i = 0; i < images.length; i++) {
    if (images[i].is_thumbnail) {
      defaultImage = images[i].url_standard
      break;
    }
  }
  return defaultImage;
}

  function getActiveImagesByColor() {
    images.sort((a, b) => (a.sort_order < b.sort_order) ? 1 : -1)
    images.sort((a, b) => (a.description > b.description) ? 1 : -1)
    let tmpColor;
    let imagesByColor = []
    for (let i = 0; i < images.length; i++) {
        images[i].description !== tmpColor && imagesByColor.push(images[i])
        tmpColor = images[i].description
    }
    return imagesByColor;
  }

  return (
    <div className="bc-product-card">
      <Link to={`/products${product.custom_url.url}`} className="bc-product-card-image-anchor" title={product.name}>
        <div className="bc-product-card__featured-image">
          <img
            className="attachment-bc-medium size-bc-medium"
            src={
              (images.length && (defaultImage ? defaultImage : product.images[0].url_zoom)) ||
              '/img/default-bc-product.png'
            }
            alt={product.name}
          />
        </div>
      </Link>

      <div className="bc-product__meta">
        <span className="brand-name">{product.brand.name}</span>
        <h3 className="bc-product__title">
          <Link to={`/products${product.custom_url.url}`} className="bc-product__title-link" title={product.name}>{product.name}</Link>
        </h3>

        <ProductPrices product={product} />
      </div>

      <div className="product-card-image-options">
        {imageOptions.map((img, i) => (
          <img
            height="100px"
            width="100px"
            src={img.url_thumbnail}
            alt="Thumb"
            key={JSON.stringify(img)}
            onClick={() => setDefaultImage(img.url_standard)}
          />
        ))}
      </div>

      {/* <AddToCartButton
          productId={product.variants[0].product_id}
          variantId={product.variants[0].id}>
          Add to Cart
        </AddToCartButton> */}
    </div>
  )
}

export default ProductCard;
