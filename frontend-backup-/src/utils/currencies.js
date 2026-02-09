export const currencies = [
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.27 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 1.17 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.71 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.92 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 186.5 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 9.12 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 105.8 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 1602.3 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 23.8 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 6.31 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', rate: 21.4 }
];

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const from = currencies.find(c => c.code === fromCurrency);
  const to = currencies.find(c => c.code === toCurrency);
  
  if (!from || !to) return amount;
  
  // Convert to GBP first (base currency), then to target
  const amountInGBP = amount / from.rate;
  return amountInGBP * to.rate;
};

export const formatCurrency = (amount, currencyCode) => {
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return `${amount} GBP`;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2
  }).format(amount);
};