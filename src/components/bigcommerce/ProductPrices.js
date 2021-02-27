import React, { useContext } from 'react';
import CurrencyFormatter from './CurrencyFormatter';
import PriceContext from '../../context/PriceProvider';

const currencyCode = 'USD'; // TODO: Move this to use settings merchant sets up in BigCommerce (v2 Currencies API)

const ProductPrices = ({ product }) => {
  const prices = useContext(PriceContext);
  // TODO: Why is this not getting all prices, and just some
  const latestProduct =
    prices && prices[product.bigcommerce_id]
      ? prices[product.bigcommerce_id]
      : {
          price: null,
          calculated_price: null,
          sale_price: null
        };

        console.log(product)
  return (
    <div className="bc-product__pricing initialized">
      {product.sale_price !== 0 ? (
        <p className="bc-product__pricing--api bc-product__pricing--visible">
          <span className="original-price-node bc-product__original-price bc-show-current-price">
            <CurrencyFormatter
              currency={currencyCode}
              amount={product.price}
            />
          </span>
          <span className="sale-node bc-product__price bc-product__price--sale bc-show-current-price">
            <CurrencyFormatter
              currency={currencyCode}
              amount={product.calculated_price}
            />
          </span>
        </p>
      ) : (
        <p className="bc-product__pricing--api bc-product__pricing--visible">
          <span className="price-node bc-product-price bc-product__price--base bc-show-current-price">
            <CurrencyFormatter
              currency={currencyCode}
              amount={product.calculated_price}
            />
          </span>
        </p>
      )}
    </div>
  );
};

export default ProductPrices;
