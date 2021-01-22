const CurrencyFormatter = ({ currency, amount, type = 'item' }) => {
  const languageCode =
    typeof window !== 'undefined'
      ? window.navigator.language || 'en-US'
      : 'en-US';
  const formattedPrice = new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency
  }).format(amount);
  return amount === 0 && type !== 'total' ? 'FREE' : amount && formattedPrice;
};

export default CurrencyFormatter;
