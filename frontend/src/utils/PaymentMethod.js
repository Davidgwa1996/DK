export const universalPaymentMethods = {
  cards: [
    { id: 'visa', name: 'Any Visa Card' },
    { id: 'mastercard', name: 'Any MasterCard' },
    { id: 'amex', name: 'American Express' },
    { id: 'unionpay', name: 'UnionPay' },
  ],
  
  digitalWallets: [
    { id: 'paypal', name: 'PayPal' },
    { id: 'applepay', name: 'Apple Pay' },
    { id: 'googlepay', name: 'Google Pay' },
  ],
  
  cryptocurrencies: [
    { id: 'bitcoin', name: 'Bitcoin (BTC)' },
    { id: 'ethereum', name: 'Ethereum (ETH)' },
    { id: 'usdt', name: 'USDT/Tether' },
  ],
};

export const getPaymentMethodById = (id) => {
  const allMethods = Object.values(universalPaymentMethods).flat();
  return allMethods.find(method => method.id === id);
};