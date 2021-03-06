import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import CurrencyFormatter from './CurrencyFormatter';
import Loader from '../Loader';

import CartContext from '../../context/CartProvider';

const AdjustItem = props => {

  const { item, updatingItem, cartType } = props;
  let minusBtn, plusBtn;

  // if (cartType === 'full') {
  minusBtn = (
    <button
      className="side-btn"
      onClick={() => props.updateCartItemQuantity(item, 'minus')}>
      -
    </button>
  )

  plusBtn = (
    <button
      className="side-btn"
      onClick={() => props.updateCartItemQuantity(item, 'plus')}>
      +
    </button>
  )
  // }

  return (
    <div className="bc-cart-item-quantity">
      {minusBtn}

      {updatingItem === item.id ? <Loader /> : <div>{item.quantity}</div>}

      {plusBtn}
    </div>
  );
};

const CustomItems = props => {
  const { items } = props;
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

            <div>
              <h3 className="bc-cart-item__product-title">{item.name}</h3>
              {/* <span className="bc-cart-item__product-brand">{item.sku}</span> */}
              <AdjustItem {...props} item={item} cartType={cartType} />
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
      {items.map(item => {
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

              <AdjustItem {...props} item={item} cartType={cartType} />
            </div>


            <div className="bc-cart-item-total-price">
              <a className="remove-item-link" onClick={() => props.removeItemFromCart(item.id)}>REMOVE</a>
              {/* <CurrencyFormatter
                currency={props.currency.code}
                amount={item.list_price}
              /> */}
              <div className="bc-product__pricing--api bc-product__pricing--visible">
                {console.log(item.originalPrice, item.sale_price)}
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

const Cart = class extends React.Component {
  render() {
    const cartType = this.props.cartType;
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
          const { updatingItem } = state;

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
                {/* <header className="bc-cart-header">
                  <div className="bc-cart-header__item">Item</div>
                  <div className="bc-cart-header__qty">Qty</div>
                  <div className="bc-cart-header__price">Price</div>
                </header> */}
                {state.cartLoading ? (
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
                      items={lineItems.physical_items}
                      cartType={cartType}
                    />
                    <StandardItems
                      currency={currency}
                      updatingItem={updatingItem}
                      updateCartItemQuantity={updateCartItemQuantity}
                      removeItemFromCart={removeItemFromCart}
                      items={lineItems.digital_items}
                      cartType={cartType}
                    />
                    <CustomItems
                      currency={currency}
                      updatingItem={updatingItem}
                      updateCartItemQuantity={updateCartItemQuantity}
                      removeItemFromCart={removeItemFromCart}
                      items={lineItems.custom_items}
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
    );
  }
};

export default Cart;
