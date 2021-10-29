import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import CurrencyFormatter from './CurrencyFormatter';
import Loader from '../Loader';

import CartContext from '../../context/CartProvider';

const AdjustItem = ({
  item,
  items,
  updatingItem,
  updateCartItemQuantity
}) => {
  let minusBtn, plusBtn;


  const calculateQuantity = () => {
    let calculatedQuantity = 0;
    items.forEach(item => calculatedQuantity = calculatedQuantity += item.quantity);
    return calculatedQuantity;
  };

  minusBtn = (
    <button
      className="side-btn"
      onClick={() => updateCartItemQuantity(item, 'minus')}>
      -
    </button>
  )

  plusBtn = (
    <button
      className="side-btn"
      onClick={() => updateCartItemQuantity(item, 'plus')}>
      +
    </button>
  )

  return (
    <div className="bc-cart-item-quantity">
      {minusBtn}
      {updatingItem === item.id ? <Loader /> : <div>{items && items.length > 0 ? calculateQuantity() : item.quantity}</div>}
      {plusBtn}
    </div>
  );
};

const CustomItems = props => {
  const { items } = props;
  const cartType = props.cartType;

  return (
    <>
      {items.length > 0 && items.map(items => {
        const item = items[0];
        return (
          <div className="bc-cart-item" key={item.id}>
            <div className="bc-cart-item-meta">
              <img
                src={
                  (item.image_url && item.image_url) ||
                  '/img/default-bc-product.png'
                }
                alt={item.name}
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div>
              <h3 className="bc-cart-item__product-title">{item.name}</h3>
              {/* <span className="bc-cart-item__product-brand">{item.sku}</span> */}
              <AdjustItem
                {...props}
                item={item}
                items={items}
                cartType={cartType}
              />
            </div>


            <div className="bc-cart-item-total-price">
              <CurrencyFormatter
                currency={props.currency.code}
                amount={item.list_price}
              />
            </div>
          </div>
        )
      })}
    </>
  );
};

const StandardItems = props => {
  const { items } = props;
  const cartType = props.cartType;
  let itemImage;
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    window.addEventListener('load', setIsMobileView(window.matchMedia('(max-width: 500px)').matches))
    window.addEventListener('resize', setIsMobileView(window.matchMedia('(max-width: 500px)').matches));
  })

  return (
    <>
      {items.length > 0 && items.map(items => {
        const item = items[0];
        const name = isMobileView ? item.name.substring(0, 10) + "..." : item.name
        return (
          // SIDE CART 
          <div className="bc-cart-item" key={item.id}>
            <div className="bc-cart-item-meta">
              <img
                src={
                  (item.image_url && item.image_url) ||
                  '/img/default-bc-product.png'
                }
                alt={item.name}
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div className="cart-details-meta">
              <h3 className="bc-cart-item__product-title">{name}</h3>

              <span className="bc-cart-item__variant">
                {item.variant && item.variant.option_values.map((option, i, arr) => i === arr.length - 1 ? option.label : `${option.label}/`)}
              </span>

              <AdjustItem
                {...props}
                item={item}
                items={items}
                cartType={cartType}
              />
            </div>


            <div className="bc-cart-item-total-price">
              <a className="remove-item-link" onClick={() => props.removeItemFromCart(item.id)}>REMOVE</a>
              <div className="bc-product__pricing--api bc-product__pricing--visible">
                {(item.originalPrice !== item.sale_price && item.sale_price !== 0) && item.originalPrice > item.sale_price && (
                  <p className="original-price-node bc-product__original-price bc-show-current-price">
                    <CurrencyFormatter
                      currency={props.currency.code}
                      amount={item.originalPrice}
                    />
                  </p>
                )}
                {(item.originalPrice !== item.sale_price && item.sale_price === 0) && (
                  <span className="special-deal-label">
                    Buy 1 Get Two
                  </span>
                )}
                {(item.originalPrice !== item.sale_price && item.sale_price === 0) ? (
                  <p className="original-price-node bc-product__original-price bc-show-current-price">
                    <CurrencyFormatter
                      currency={props.currency.code}
                      amount={item.list_price}
                    />
                  </p>
                ) : (
                  <p className="sale-node bc-product__price bc-product__price--sale bc-show-current-price">
                    <CurrencyFormatter
                      currency={props.currency.code}
                      amount={item.list_price}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
};

const GiftCertificateItems = props => {
  const items = props.items;
  const cartType = props.cartType;
  let itemImage;

  return (
    <>
      {items.map(item => {
        return (
          <div className="bc-cart-item" key={item.id}>
            <div className="bc-cart-item-meta">
              <img
                src={
                  (item.image_url && item.image_url) ||
                  '/img/default-bc-product.png'
                }
                alt={item.name}
                style={{ objectFit: 'contain' }}
              />
            </div>

            <div className="cart-details-meta">
              <h3 className="bc-cart-item__product-title">{item.name}</h3>
              {/* <span className="bc-cart-item__product-brand">{item.sku}</span> */}
              <AdjustItem {...props} item={item} cartType={cartType} />
            </div>


            <div className="bc-cart-item-total-price">
              <a className="remove-item-link" onClick={() => props.removeItemFromCart(item.id)}>REMOVE</a>
              <CurrencyFormatter
                currency={props.currency.code}
                amount={item.list_price}
              />
            </div>
          </div>
        )
      })}
    </>
  );
};

const Cart = (props) => {
  const cartType = props.cartType;
  let cartFooter;

  return (
    <CartContext.Consumer>
      {value => {
        if (!value) {
          return null;
        }
        const { state, removeItemFromCart, updateCartItemQuantity } = value;
        const {
          currency,
          cartAmount,
          lineItems,
          numberItems,
          redirectUrls
        } = state.cart;
        const { cartError, cartLoading, updatingItem } = state;

        const structureItems = lineItems => {
          if (lineItems) {
            const allItems = [];
            lineItems.length > 0 && lineItems.forEach(lineItem => {
              const productId = lineItem.product_id;
              const variantId = lineItem.variant_id;
              const filteredItem = lineItems.filter(itemToCheck => itemToCheck.product_id === productId && itemToCheck.variant_id === variantId);
              let added = false;
              allItems.length > 0 && allItems.forEach(items => {
                if (items[0].product_id === productId && items[0].variant_id === variantId)
                  added = true
              });
              if (!added)
                allItems.push(filteredItem);
            });
            return allItems.sort((a, b) => b[0].originalPrice - a[0].originalPrice);
          }
        };

        const structuredPhysicalItems = structureItems(lineItems.physical_items);
        const structuredDigitalItems = structureItems(lineItems.digital_items);
        const structuredCustomItems = structureItems(lineItems.custom_items);

        if (cartType === 'full') {
          cartFooter = (
            <footer className="bc-cart-footer">
              <div className="bc-cart-subtotal">
                <span className="bc-cart-subtotal__label">Subtotal: </span>
                <span className="bc-cart-subtotal__amount">
                    <CurrencyFormatter
                      currency={currency.code}
                      amount={cartAmount}
                    />
                  </span>
              </div>

              {numberItems > 0 && (
                <div className="bc-cart-actions">
                  <form
                    action={redirectUrls.checkout_url}
                    method="post"
                    encType="multipart/form-data">
                    <button
                      className="bc-btn bc-cart-actions__checkout-button"
                      type="submit">
                      Proceed to Checkouts
                    </button>
                  </form>
                </div>
              )}
            </footer>
          )
        }

        return (
          <div id="cart-page" className="container cart-page">
            <section className="bc-cart">
              <div className="bc-cart-error">
                <p className="bc-cart-error__message"></p>
              </div>
              {cartLoading ? (
                <div className="bc-cart__empty">
                  <h2 className="bc-cart__title--empty">
                    <em>Loading Cart</em>
                  </h2>
                </div>
              ) : numberItems > 0 ? (
                <div className="bc-cart-body">
                  <StandardItems
                    currency={currency}
                    updatingItem={updatingItem}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeItemFromCart={removeItemFromCart}
                    items={structuredPhysicalItems}
                    cartType={cartType}
                  />
                  <StandardItems
                    currency={currency}
                    updatingItem={updatingItem}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeItemFromCart={removeItemFromCart}
                    items={structuredDigitalItems}
                    cartType={cartType}
                  />
                  <CustomItems
                    currency={currency}
                    updatingItem={updatingItem}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeItemFromCart={removeItemFromCart}
                    items={structuredCustomItems}
                    cartType={cartType}
                  />
                  <GiftCertificateItems
                    currency={currency}
                    updatingItem={updatingItem}
                    removeItemFromCart={removeItemFromCart}
                    items={lineItems.gift_certificates}
                    cartType={cartType}
                  />
                </div>
              ) : (
                <div className="bc-cart__empty">
                  <h2 className="bc-cart__title--empty">
                    Your cart is empty.
                  </h2>
                  <Link to="/products" className="bc-cart__continue-shopping">
                    Take a look around.
                  </Link>
                </div>
              )}
              {cartFooter}
            </section>
          </div>
        );
      }}
    </CartContext.Consumer>
  )
};

export default Cart;
