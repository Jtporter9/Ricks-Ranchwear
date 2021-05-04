import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import CartContext from '../../context/CartProvider';
import CurrencyFormatter from './CurrencyFormatter';
import Cart from './Cart'

// ASSETS 
import CartIconWhite from '../../assets/cart-icon-white.svg';
import CloseIcon from '../../assets/close-icon.svg';
import GroupedBootsWhite from '../../assets/grouped-boots-white.svg';
import BootsOneCheck from '../../assets/boots-one-check.svg';
import BootsTwoCheck from '../../assets/boots-two-check.svg';
import BootsThreeCheck from '../../assets/boots-three-check.svg';


import './Notify.css';

export default () => {
  const value = useContext(CartContext);
  const notifications = value && value.notifications;
  const hasNotifications = Array.isArray(notifications) && notifications.length;
  const removeNotification = value && value.removeNotification;

  return hasNotifications ? (
    <div className="side-cart-container">
      <div className="opaque-background" onClick={() => removeNotification(false)}></div>
      <section className="Notify side-cart">
        {notifications.map(note => (
          <Notification key={note.id} {...note} />
        ))}
      </section>
    </div>
  ) : null;
};

const Notification = ({ id, text, type }) => {
  const value = useContext(CartContext);
  const removeNotification = value && value.removeNotification;
  const { state, removeItemFromCart, updateCartItemQuantity } = value;
  const {
    currency,
    cartAmount,
    baseAmount
  } = state.cart;

  const [discountModalActive, setDiscountModalActive] = useState(false);

  function checkDiscount (url) {
    if (value.state.cart.numberItems % 3 !== 0) {
      setDiscountModalActive(true);
    } else {
      removeNotification(id);
      window.location.href = url;
    }
  }

  function selectMoreBoots () {
    setDiscountModalActive(false); 
    removeNotification(id);
  }
  
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   removeNotification(id);
    // }, 7000);
    // return () => clearTimeout(timer);
    document.getElementById("cart-page").style.height = `calc(100vh - ${document.getElementById("Actions").clientHeight + document.getElementById("Title").clientHeight + 16}px)`
  }, []);

  console.log(discountModalActive)
  return (
    <div>

      <article className="Notification Animate">
        <div className="Content">
          <div className="Message">
            <div id="Title" className="Title">
              <div style={{ textAlign: 'center' }} className="Text">
                {value.state.cart.numberItems} {value.state.cart.numberItems === 1 ? 'item' : 'items'} in your cart
              </div>
              <div className="Icon" onClick={() => removeNotification(id)}>
                <img src={CloseIcon} alt="Close" />
              </div>
            </div>
            {/* <div className="bc-ajax-add-to-cart__message-wrapper">
              <p className="bc-ajax-add-to-cart__message bc-alert bc-alert--success">{text}</p>
            </div> */}
            <Cart cartType="overlay" />
            <div id="Actions" className="Actions">
              <div className="discount-banner">
                {value.state.cart.numberItems === 0 && (
                  <div>
                    <img src={GroupedBootsWhite} alt="discount" />
                    <h3>Buy 1 and Get Two, Free</h3>
                    <p>Get 2 <strong>free.</strong> boots by adding 1 to your cart!</p>
                  </div>
                )}
                {(value.state.cart.numberItems % 3 > 0 && value.state.cart.numberItems % 3 < 3) && (
                  <div>
                    {value.state.cart.numberItems % 3 === 1 && (
                      <img src={BootsOneCheck} alt="discount" />
                    )}
                    {value.state.cart.numberItems % 3 === 2 && (
                      <img src={BootsTwoCheck} alt="discount" />
                    )}
                    <h3>Buy 1 and Get Two, Free</h3>
                    <p>Add up to {3 - (value.state.cart.numberItems - (Math.floor(value.state.cart.numberItems / 3) * 3))} more boot{value.state.cart.numberItems === 2 ? '' : 's'} to your cart for <strong>free.</strong></p>
                  </div>
                )}
                {(value.state.cart.numberItems % 3 === 0 && value.state.cart.numberItems !== 0) && (
                  <div>
                    <img src={BootsThreeCheck} alt="discount" />
                    <h3>Buy 1 and Get Two, Free</h3>
                    <p>Get 2 free boots by adding 1 to your cart!</p>
                  </div>
                )}
                <a onClick={() => removeNotification(id)}>Continue Shopping</a>
              </div>
              <div className="bc-cart-subtotal">
                <div className="subtotal-container">
                  <span className="bc-cart-subtotal__label">Subtotal:</span>
                  <span className="bc-cart-subtotal__amount">
                    <CurrencyFormatter
                      currency={currency.code}
                      amount={baseAmount}
                      type="total"
                    />
                  </span>
                </div>
                {state.cart.numberItems > 1 && (
                  <div className="discount-container">
                    <span className="bc-cart-subtotal__label">Buy 1, Get 2 Discount</span>
                    <span className="bc-cart-subtotal__amount">
                      -
                        <CurrencyFormatter
                        currency={currency.code}
                        amount={baseAmount - cartAmount}
                        type="discount"
                      />
                    </span>
                  </div>
                )}
                <div className="total-container">
                  <span className="bc-cart-subtotal__label">Total:</span>
                  <span className="bc-cart-subtotal__amount">
                    <CurrencyFormatter
                      currency={currency.code}
                      amount={cartAmount}
                      type="total"
                    />
                  </span>
                </div>
              </div>


              {/* <Link to="/cart" className="bc-btn" onClick={() => removeNotification(id)}>View Cart</Link> */}
              {/* href={value.state.cart.redirectUrls.checkout_url} */}
              <a className="bc-btn" onClick={() => checkDiscount(value.state.cart.redirectUrls.checkout_url)}>
                <img src={CartIconWhite} alt="Cart" />
                <span>Checkout</span>
              </a>
            </div>
          </div>
        </div>
      </article>
      {discountModalActive && (
        <div className="discount-warning-modal-opaque-background">
          <div className="discount-warning-modal">
            <div className="discount-warning-head">
              <img src={CloseIcon} alt="close" onClick={() => setDiscountModalActive(false)} />
            </div>
            <div>
                <h3>Wait, You’re Missing Out on Free Boots!</h3>
                <p className="discount-warning-description">
                  It looks like you haven’t taken advantage of our Buy 1 Pair Get Two Pair Free deal.           
                </p>
                <p className="discount-warning-description">
                  Would you like to add more boots before checking out? 
                </p>
            <div className="discount-warning-buttons-split">
                <button onClick={() => selectMoreBoots()}>Add More Boots</button>
                <button className="btn-dark" onClick={() => window.location.href = value.state.cart.redirectUrls.checkout_url}>Continue to Checkout</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
