import React from 'react';
import ProductCard from '../bigcommerce/ProductCard';

const TopSelling = ({
  headerText = "Top Selling Boots",
  products
}) => {
    let topSellingLength = 4;

    return (
        <div className="top-selling-boots-block">
            <h2>{headerText}</h2>
            <div className="top-selling-boots-container bc-product-grid bc-product-grid--archive bc-product-grid--4col">
                {
                    products
                      .filter(product => product.is_featured)
                      .map((featuredProduct, i) => {
                        featuredProduct.images.length === 0 && topSellingLength++
                        return i < topSellingLength &&
                          featuredProduct.images.length !== 0 &&
                          <ProductCard key={featuredProduct.id} product={featuredProduct} topSelling={true} />
                    })
                }
            </div>
        </div>
    )
}

export default TopSelling;

