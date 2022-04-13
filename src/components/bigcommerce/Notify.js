// Node Modules
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';

// Components
import CurrencyFormatter from './CurrencyFormatter';
import Cart from './Cart'

// Contexts
import { useContentContext } from 'src/context/ContentContextV2';
import CartContext from '../../context/CartProvider';

// ASSETS 
import CartIconWhite from '../../assets/cart-icon-white.svg';
import CloseIcon from '../../assets/close-icon.svg';
import GroupedBootsWhite from '../../assets/grouped-boots-white.svg';
import BootsOneCheck from '../../assets/boots-one-check.svg';
import BootsTwoCheck from '../../assets/boots-two-check.svg';
import BootsThreeCheck from '../../assets/boots-three-check.svg';

// Styles
import './Notify.css';

// Helpers
import {structureLineItems} from "src/shared/utils";

export default () => {
  const cartContextValue = useContext(CartContext);
  const notifications = cartContextValue && cartContextValue.notifications;
  const hasNotifications = Array.isArray(notifications) && notifications.length;
  const removeNotification = cartContextValue && cartContextValue.removeNotification;

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
  const {content} = useContentContext();
  const value = useContext(CartContext);
  const removeNotification = value && value.removeNotification;
  const { state, removeItemFromCartWithResponse, updateCartItemQuantity } = value;
  const {
    currency,
    cartAmount,
    baseAmount
  } = state.cart;

  // These variables have the option to be destrucutred from a hard coded object till full graphCMS integration
  const {
    discountModal: {
      addMoreBootsButtonText,
      checkoutButtonText,
      heading: discountModalHeading,
      informationText
    },
    quantityIssueModal: {
      inventoryLevelText,
      heading: quantityIssueModalHeading,
      removeButtonText,
      removeItemsFromCartText,
      issuesToFixText,
      issuesFixedText,
      quantityInCartText,
      doneButtonText,
      checkIcon,
      alertIcon
    }
  } = typeof content !== "undefined" ? content.shared : {
    discountModal: {
      addMoreBootsButtonText: "ADD MORE BOOTS",
      checkoutButtonText: "CONTINUE TO CHECKOUT",
      heading: "Wait, You’re Missing Out on Free Boots!",
      informationText: [
        "It looks like you haven’t taken advantage of our Buy 1 Pair Get Two Pair Free deal.",
        "Would you like to add more boots before checking out?"
      ]
    },
    quantityIssueModal: {
      inventoryLevelText: "Qty Available",
      heading: "INSUFFICIENT INVENTORY",
      removeButtonText: "REMOVE ALL",
      removeItemsFromCartText: "Please remove or adjust the inventory of the following items in your cart.",
      issuesToFixText: "ISSUES TO FIX",
      issuesFixedText: "ALL ISSUES FIXED",
      quantityInCartText: "Qty in Cart",
      doneButtonText: "DONE",
      checkIcon: {
        url: "https://media.graphassets.com/wS5OOj5mQGOQX8zA8CPE"
      },
      alertIcon: {
        url: "https://media.graphassets.com/iIkcoKrRIunRrNqbaJzu"
      }
    }
  };

  const [discountModalActive, setDiscountModalActive] = useState(false);
  const [quantityModalActive, setQuantityModalActive] = useState(false);
  const [preCheckoutChecks, setPreCheckoutChecks] = useState({
    discountNotApplied: true,
    quantityIssues: false,
    quantityIssueItems: []
  });
  const hasQuantityIssues = preCheckoutChecks.quantityIssueItems.length;
  const checkDiscountAndAvailability = url => {
    const {
      discountNotApplied,
      quantityIssues,
      quantityIssueItems
    } = preCheckoutChecks;
    const redirect = () => {
      removeNotification(id);
      window.location.href = url;
    };

    if (quantityIssues && quantityIssueItems.length) {
      setQuantityModalActive(true);
    } else {
      discountNotApplied ? setDiscountModalActive(true) : redirect();
    }
  };

  // TODO fix this function to actually remove all items from the cart.
  //  Related task: https://app.asana.com/0/1200039209361585/1202105529312542
  const removeAllQuantityIssueItems = async items => {
    let ok = false;
    let updatedIssueItems = [];
    await items.forEach(item => {
      removeItemFromCartWithResponse(item.id)
        .then(() => {
          ok = true;
          updatedIssueItems = updatedIssueItems.length ?
            updatedIssueItems.filter(item => item.id !== item.id) :
            preCheckoutChecks.quantityIssueItems.filter(item => item.id !== item.id);
        })
        .catch(error => {
          console.log("ERROR REMOVING ITEM FROM CART: ", error);
          ok = false;
        })
    });

    if (ok) {
      setPreCheckoutChecks({
        ...preCheckoutChecks,
        quantityIssueItems: preCheckoutChecks.quantityIssueItems.filter(item => item.id !== item.id)
        }
      );
    }
  };

  const selectMoreBoots = () => {
    setDiscountModalActive(false); 
    removeNotification(id);
  }
  
  useEffect(() => {
    document.getElementById("cart-page").style.height = `calc(100vh - ${document.getElementById("Actions").clientHeight + document.getElementById("Title").clientHeight + 16}px)`;
  }, []);

  useEffect(() => {
    // THIS IS WHERE WE NEED TO CHECK IF ALL ITEMS IN THE CART HAVE INVENTORY
    // ASK ABOUT THE DIFFERENT TYPE OF ITEMS THAT CAN BE IN THE CART TO VERIFY WHAT NEEDS TO BE DONE HERE
    const cartHasItems = state.cart.lineItems.physical_items !== undefined;
    const itemsWithInsufficientQuantity = cartHasItems ? state.cart.lineItems.physical_items.filter(item => item.quantity > item.variant.inventory_level) : [];

    let updatedChecks = {...preCheckoutChecks};

    if (itemsWithInsufficientQuantity.length) {
      updatedChecks = {
        ...updatedChecks,
        quantityIssues: true,
        quantityIssueItems: itemsWithInsufficientQuantity
      }
    }

    updatedChecks = {
      ...updatedChecks,
      discountNotApplied: state.cart.numberItems % 3 !== 0
    }

    updatedChecks = {
      ...updatedChecks,
      discountNotApplied: state.cart.numberItems % 3 !== 0
    }

    setPreCheckoutChecks(updatedChecks);
  }, [value]);

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
              <a className="bc-btn" onClick={() => value.state.cart.redirectUrls.checkout_url && checkDiscountAndAvailability(value.state.cart.redirectUrls.checkout_url)}>
                <img src={CartIconWhite} alt="Cart" />
                <span>Checkout</span>
              </a>
            </div>
          </div>
        </div>
      </article>
      {quantityModalActive && preCheckoutChecks.quantityIssueItems.length && (
        <div className="modal-opaque-background">
          <div className="quantity-issue-modal">
            <div className="modal-head">
              <button className="modal-close-btn" onClick={() => setQuantityModalActive(false)}>
                <img src={CloseIcon} alt="close"/>
              </button>
            </div>
            <div className="modal-body">
              <h3>{quantityIssueModalHeading}</h3>
              <p className="remove-items-from-cart">{removeItemsFromCartText}</p>
              <div className={`issues-display ${hasQuantityIssues && 'has-issue'}`}>
                <img
                  src={hasQuantityIssues ? alertIcon.url : checkIcon.url}
                  alt={hasQuantityIssues ? 'alert icon' : 'check icon'}/>
                {hasQuantityIssues && <p className="amount-of-issues">
                  {structureLineItems(preCheckoutChecks.quantityIssueItems).length}
                </p>}
                <p className="issues-text">{hasQuantityIssues ? issuesToFixText : issuesFixedText}</p>
              </div>
              <ul className="items-to-remove">
                {structureLineItems(preCheckoutChecks.quantityIssueItems).map(lineItems => lineItems.map((item, id) => {
                  if (id === 0) {
                    const { inventory_level } = item.variant;
                    const inventoryAboveZero = inventory_level >= 1;
                    const canAddQuantity = inventoryAboveZero && item.quantity < inventory_level;
                    const size = item.variant.option_values[1].label;
                    const reducer = (accu, currentValue) => (accu + currentValue.quantity);
                    const quantity = lineItems.reduce(reducer, 0);

                    return (
                      <li key={item.id}>
                        <img src={item.image_url} alt="Product Image"/>
                        <div className="item-content">
                          <p className="item-name">{item.name} - <span className="size-display">Size: {size}</span></p>
                          <div className={`actions-container ${inventoryAboveZero && "adjustment-action"}`}>
                            <div className="quantity-displays">
                              <p className={`cart-quantity-display ${inventory_level >= quantity ? 
                              'sufficient-inventory' : ''}`}>{quantityInCartText}: {quantity}</p>
                              <p className="inventory-level-display">{inventoryLevelText}: {inventory_level}</p>
                            </div>
                            <div className="quantity-adjustment-container">
                              {inventoryAboveZero && (
                                <>
                                  <div className="quantity-adjuster">
                                    <button
                                      className="reduce-quantity"
                                      onClick={() => updateCartItemQuantity(item, "minus")}>
                                      -
                                    </button>
                                    <p className="quantity-text">{quantity}</p>
                                    <button
                                      className={`add-quantity ${canAddQuantity ? "can-add-quantity" : ""}`}
                                      onClick={() => {
                                        if (canAddQuantity) updateCartItemQuantity(item)
                                      }}>
                                      +
                                    </button>
                                  </div>
                                </>
                              )}
                              <button className="remove-item" onClick={() => removeAllQuantityIssueItems(lineItems)}>{removeButtonText}</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  }
                }))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setQuantityModalActive(false)}
                className="quantity-issue-modal-done-btn bc-btn">
                {doneButtonText}
              </button>
            </div>
          </div>
        </div>
      )}
      {discountModalActive && (
        <div className="modal-opaque-background">
          <div className="discount-warning-modal">
            <div className="discount-warning-head">
              <img className="modal-close-btn" src={CloseIcon} alt="close" onClick={() => setDiscountModalActive(false)} />
            </div>
            <div>
                <h3>{discountModalHeading}</h3>
              {informationText.map((text,id) => (<p className="discount-warning-description">{text}</p>))}
            <div className="discount-warning-buttons-split">
                <button onClick={() => selectMoreBoots()}>{addMoreBootsButtonText}</button>
                <button className="btn-dark" onClick={() => window.location.href = value.state.cart.redirectUrls.checkout_url}>{checkoutButtonText}</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
