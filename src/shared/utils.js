/**
 * Returns all the line items passed to the function restructured to have all products put into a array
 * sorted by price
 * @param {array} lineItems
 * @returns {array}
 */
export const structureLineItems = lineItems => {
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

export default {
  structureLineItems
};
