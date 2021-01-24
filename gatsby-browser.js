import React from 'react';
import { CartProvider } from './src/context/CartProvider';
import { PriceProvider } from './src/context/PriceProvider';
import { CookiesProvider } from 'react-cookie';

export const wrapRootElement = ({ element }) => (
  <CookiesProvider>
    <PriceProvider>
      <CartProvider>{element}</CartProvider>
    </PriceProvider>
  </CookiesProvider>
);
