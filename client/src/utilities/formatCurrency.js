import React from 'react';

export function formatPrice(price) {
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  
    return formattedPrice;
}
  
export function PriceDisplay(props) {
    const { price } = props;
  
    const formattedPrice = formatPrice(price);
  
    return <span className='product_price'>{formattedPrice}</span>;
}