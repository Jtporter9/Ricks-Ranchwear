import React from 'react';
import ProductCard from '../bigcommerce/ProductCard';

export default function TopSelling({ products }) {
    let topSellingLength = 4;

    return (
        <div className="top-selling-boots-block">
            <h2>Top Selling Boots</h2>
            <div className="top-selling-boots-container bc-product-grid bc-product-grid--archive bc-product-grid--4col">
                {
                    products.map((product, i) => {
                        product.images.length === 0 && topSellingLength++
                        return i < topSellingLength && product.images.length !== 0 && <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </div>
    )
}

