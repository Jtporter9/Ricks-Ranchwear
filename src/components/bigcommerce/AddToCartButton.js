import React, { useContext } from 'react';
import CartContext from '../../context/CartProvider';

const AddToCartButton = ({ children, productId, variant, disabled, id, showTooltip, simulateDisabled }) => {
  const value = useContext(CartContext);
  const addToCart = value && value.addToCart;
  const addingToCart = value && value.state.addingToCart;
  const simulatedDisabledStyling = {
    opacity: "0.5",
    cursor: "not-allowed"
  };
  const onlClickCallback = e => {
    if(simulateDisabled) {
      showTooltip();
    } else {
      addToCart(productId, variant);
    }
  }

  return (
    <div className="bc-product-card">
      <div className="bc-product__actions" data-js="bc-product-group-actions">
        <div className="bc-form bc-product-form">
          <div className="bc-product-form__product-message"></div>
          <button
            style={simulateDisabled ? simulatedDisabledStyling : {}}
            id={id || ""}
            className="bc-btn bc-btn--form-submit bc-btn--add_to_cart"
            type="submit"
            disabled={(addingToCart === productId || disabled)}
            onClick={onlClickCallback}>
            {addingToCart === productId ? 'Adding to Cart' : children}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartButton;
