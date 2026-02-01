import React, { useState } from 'react';
import { X, CreditCard, Globe, Link, Check, Shield, Smartphone, Wallet, Zap, Bitcoin, Building, Send } from 'lucide-react';

function PaymentModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('cards');
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  // Universal payment methods - no specific banks listed
  const globalPaymentMethods = {
    cards: [
      {
        name: 'Any Visa Card',
        icon: '💳',
        description: 'All Visa cards worldwide',
        countries: 'Global',
        processing: 'Instant'
      },
      {
        name: 'Any MasterCard',
        icon: '💳',
        description: 'All MasterCard variants',
        countries: 'Global',
        processing: 'Instant'
      },
      {
        name: 'American Express',
        icon: '💳',
        description: 'All Amex cards',
        countries: 'Global',
        processing: 'Instant'
      },
      {
        name: 'UnionPay',
        icon: '💳',
        description: 'China & Asia cards',
        countries: 'Asia',
        processing: 'Instant'
      },
      {
        name: 'Discover/Diners',
        icon: '💳',
        description: 'Discover & Diners Club',
        countries: 'Global',
        processing: 'Instant'
      },
      {
        name: 'JCB',
        icon: '💳',
        description: 'Japanese cards',
        countries: 'Japan/Global',
        processing: 'Instant'
      },
      {
        name: 'Any Local Card',
        icon: '💳',
        description: 'All regional card networks',
        countries: 'Regional',
        processing: '1-2 days'
      }
    ],
    digital: [
      {
        name: 'PayPal',
        icon: '🔵',
        description: 'PayPal account or card',
        countries: '200+ countries',
        processing: 'Instant'
      },
      {
        name: 'Apple Pay',
        icon: '🍎',
        description: 'Apple devices payment',
        countries: '60+ countries',
        processing: 'Instant'
      },
      {
        name: 'Google Pay',
        icon: 'G',
        description: 'Android devices payment',
        countries: '40+ countries',
        processing: 'Instant'
      },
      {
        name: 'Samsung Pay',
        icon: '📱',
        description: 'Samsung devices',
        countries: '25+ countries',
        processing: 'Instant'
      },
      {
        name: 'Amazon Pay',
        icon: '📦',
        description: 'Amazon account',
        countries: '20+ countries',
        processing: 'Instant'
      },
      {
        name: 'AliPay',
        icon: '💰',
        description: 'Chinese payments',
        countries: 'China/Global',
        processing: 'Instant'
      },
      {
        name: 'WeChat Pay',
        icon: '💬',
        description: 'Chinese payments',
        countries: 'China/Global',
        processing: 'Instant'
      }
    ],
    crypto: [
      {
        name: 'Bitcoin (BTC)',
        icon: '₿',
        description: 'Bitcoin cryptocurrency',
        networks: 'Bitcoin Network',
        processing: '10-30 mins'
      },
      {
        name: 'Ethereum (ETH)',
        icon: 'Ξ',
        description: 'Ethereum cryptocurrency',
        networks: 'Ethereum Network',
        processing: '2-5 mins'
      },
      {
        name: 'USDT/Tether',
        icon: '💲',
        description: 'Stablecoin (USD pegged)',
        networks: 'Multiple networks',
        processing: '2-5 mins'
      },
      {
        name: 'USDC',
        icon: '🔄',
        description: 'Stablecoin (USD pegged)',
        networks: 'Multiple networks',
        processing: '2-5 mins'
      },
      {
        name: 'BNB',
        icon: '🅱',
        description: 'Binance Coin',
        networks: 'BNB Chain',
        processing: 'Instant'
      },
      {
        name: 'Solana (SOL)',
        icon: '⚡',
        description: 'Solana blockchain',
        networks: 'Solana Network',
        processing: 'Instant'
      },
      {
        name: 'Any ERC-20 Token',
        icon: '🪙',
        description: 'All Ethereum tokens',
        networks: 'Ethereum Network',
        processing: '2-5 mins'
      }
    ],
    banks: [
      {
        name: 'Global Bank Transfer',
        icon: '🏦',
        description: 'Any bank worldwide',
        countries: 'All countries',
        processing: '1-3 business days'
      },
      {
        name: 'SWIFT Transfer',
        icon: '🌐',
        description: 'International wire',
        countries: 'All banks',
        processing: '2-5 business days'
      },
      {
        name: 'SEPA Transfer',
        icon: '🇪🇺',
        description: 'European banks',
        countries: 'Eurozone',
        processing: '1-2 business days'
      },
      {
        name: 'Faster Payments',
        icon: '⚡',
        description: 'UK banks',
        countries: 'UK',
        processing: 'Instant'
      },
      {
        name: 'ACH Transfer',
        icon: '🇺🇸',
        description: 'US banks',
        countries: 'USA',
        processing: '1-2 business days'
      },
      {
        name: 'Instant Bank Transfer',
        icon: '🚀',
        description: 'Open Banking',
        countries: '30+ countries',
        processing: 'Instant'
      },
      {
        name: 'Any Local Bank',
        icon: '🏛️',
        description: 'Regional bank transfer',
        countries: 'All regions',
        processing: '1-3 days'
      }
    ],
    other: [
      {
        name: 'Western Union',
        icon: '💵',
        description: 'Cash pickup worldwide',
        countries: '200+ countries',
        processing: 'Minutes'
      },
      {
        name: 'MoneyGram',
        icon: '📨',
        description: 'Money transfer',
        countries: '200+ countries',
        processing: 'Minutes'
      },
      {
        name: 'Remittance Services',
        icon: '🔄',
        description: 'All remittance providers',
        countries: 'Global',
        processing: 'Hours'
      },
      {
        name: 'Cash on Delivery',
        icon: '📦',
        description: 'Pay when delivered',
        countries: 'Selected regions',
        processing: 'Delivery time'
      },
      {
        name: 'Mobile Money',
        icon: '📱',
        description: 'M-Pesa, Orange Money, etc.',
        countries: 'Africa/Asia',
        processing: 'Instant'
      },
      {
        name: 'Gift Cards',
        icon: '🎁',
        description: 'All gift card brands',
        countries: 'Global',
        processing: 'Instant'
      },
      {
        name: 'Vouchers',
        icon: '🎫',
        description: 'Payment vouchers',
        countries: 'Global',
        processing: 'Instant'
      }
    ]
  };

  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    country: '',
    save: true
  });

  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const currencies = ['GBP', 'USD', 'EUR', 'CAD', 'AUD', 'JPY', 'CNY', 'INR', 'NGN', 'ZAR', 'BRL', 'MXN'];

  if (!isOpen) return null;

  const handleAddCard = (e) => {
    e.preventDefault();
    // API call to add card
    console.log('Adding card:', newCard);
    setConnectedAccounts([...connectedAccounts, {
      type: 'card',
      last4: newCard.number.slice(-4),
      brand: 'Card',
      country: newCard.country
    }]);
    setNewCard({ number: '', expiry: '', cvv: '', name: '', country: '', save: true });
  };

  const handleConnectBank = () => {
    setConnectedAccounts([...connectedAccounts, {
      type: 'bank',
      name: 'Bank Account',
      country: 'Any Country'
    }]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Global Payment Methods</h2>
            <p className="text-gray-600">Accepting payments from anywhere in the world</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Left Sidebar */}
          <div className="w-64 border-r bg-gray-50 p-6">
            <div className="space-y-2">
              {['cards', 'digital', 'crypto', 'banks', 'other'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium capitalize ${
                    activeTab === tab
                      ? 'bg-white text-primary shadow border'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {tab === 'cards' && <CreditCard size={18} className="mr-3" />}
                    {tab === 'digital' && <Smartphone size={18} className="mr-3" />}
                    {tab === 'crypto' && <Bitcoin size={18} className="mr-3" />}
                    {tab === 'banks' && <Building size={18} className="mr-3" />}
                    {tab === 'other' && <Wallet size={18} className="mr-3" />}
                    {tab === 'cards' ? 'Credit/Debit Cards' :
                     tab === 'digital' ? 'Digital Wallets' :
                     tab === 'crypto' ? 'Cryptocurrency' :
                     tab === 'banks' ? 'Bank Transfers' : 'Other Methods'}
                  </div>
                </button>
              ))}
            </div>

            {/* Currency Selector */}
            <div className="mt-8 pt-8 border-t">
              <label className="block text-gray-700 mb-3 font-medium">Preferred Currency</label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center text-green-600 mb-3">
                <Globe size={18} className="mr-2" />
                <span className="font-medium">Global Acceptance</span>
              </div>
              <p className="text-sm text-gray-600">
                Accepting payments from 200+ countries in 50+ currencies.
                No restrictions on banks or card issuers.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'cards' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Accept Any Card Worldwide</h3>

                {/* Card Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {globalPaymentMethods.cards.map(card => (
                    <div key={card.name} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{card.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{card.name}</div>
                            <div className="text-sm text-gray-600">{card.description}</div>
                          </div>
                        </div>
                        <Check className="text-green-500" size={24} />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{card.countries}</span>
                        <span>{card.processing}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Card Form */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-800 mb-6">Add New Card (Any Country)</h4>
                  <form onSubmit={handleAddCard}>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          value={newCard.name}
                          onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Card Issuer Country</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          value={newCard.country}
                          onChange={(e) => setNewCard({...newCard, country: e.target.value})}
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="UK">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="EU">European Union</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                          <option value="NG">Nigeria</option>
                          <option value="ZA">South Africa</option>
                          <option value="BR">Brazil</option>
                          <option value="MX">Mexico</option>
                          <option value="OTHER">Other Country</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          value={newCard.number}
                          onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={newCard.expiry}
                            onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            value={newCard.cvv}
                            onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800"
                    >
                      Add Card (Any Country Accepted)
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'digital' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Digital Wallets Worldwide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {globalPaymentMethods.digital.map(wallet => (
                    <div key={wallet.name} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{wallet.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{wallet.name}</div>
                            <div className="text-sm text-gray-600">{wallet.description}</div>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-800">
                          Connect
                        </button>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{wallet.countries}</span>
                        <span>{wallet.processing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'crypto' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Cryptocurrency Payments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {globalPaymentMethods.crypto.map(crypto => (
                    <div key={crypto.name} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{crypto.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{crypto.name}</div>
                            <div className="text-sm text-gray-600">{crypto.description}</div>
                          </div>
                        </div>
                        <Zap className="text-yellow-500" size={24} />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{crypto.networks}</span>
                        <span>{crypto.processing}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-900 text-white rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">Pay with Any Cryptocurrency</div>
                    <p className="text-gray-300 mb-4">
                      We accept 100+ cryptocurrencies through our payment partners
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="font-mono text-sm break-all">
                        0x742d35Cc6634C0532925a3b844Bc9e98e7a5F2b3
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        Send any cryptocurrency to this address
                      </div>
                    </div>
                    <button className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-600">
                      Generate Payment Address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'banks' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Bank Transfers - Any Bank Worldwide</h3>

                {/* Bank Transfer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {globalPaymentMethods.banks.map(bank => (
                    <div key={bank.name} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{bank.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{bank.name}</div>
                            <div className="text-sm text-gray-600">{bank.description}</div>
                          </div>
                        </div>
                        <Check className="text-green-500" size={24} />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{bank.countries}</span>
                        <span>{bank.processing}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connect Any Bank */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <Link size={32} className="mr-4" />
                    <div>
                      <h4 className="text-xl font-bold">Connect Any Bank Account</h4>
                      <p className="text-blue-100">No restrictions - Any country, any bank</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/20 p-4 rounded-lg">
                      <div className="font-medium mb-2">How it works:</div>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Enter your bank name (any bank worldwide)</li>
                        <li>Select your country</li>
                        <li>Connect via secure Open Banking or manual details</li>
                        <li>Start accepting payments immediately</li>
                      </ol>
                    </div>
                    <button
                      onClick={handleConnectBank}
                      className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100"
                    >
                      Connect Your Bank (Any Bank)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'other' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Other Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {globalPaymentMethods.other.map(method => (
                    <div key={method.name} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{method.icon}</span>
                          <div>
                            <div className="font-bold text-lg">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                          </div>
                        </div>
                        <Send className="text-primary" size={24} />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{method.countries}</span>
                        <span>{method.processing}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Money Section */}
                <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
                  <h4 className="text-xl font-bold mb-4">Mobile Money (Africa & Asia)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['M-Pesa', 'Orange Money', 'MTN Mobile Money', 'Airtel Money', 'Vodafone Cash', 'Tigo Pesa', 'Ecocash', 'bKash'].map(service => (
                      <div key={service} className="bg-white/20 p-4 rounded-lg text-center">
                        <div className="font-bold">{service}</div>
                        <div className="text-sm opacity-90">Accepted</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Connected Accounts */}
            {connectedAccounts.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h4 className="font-bold text-gray-900 mb-4">Your Connected Payment Methods</h4>
                <div className="space-y-3">
                  {connectedAccounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        {account.type === 'card' ? (
                          <CreditCard size={24} className="text-primary mr-4" />
                        ) : (
                          <Building size={24} className="text-primary mr-4" />
                        )}
                        <div>
                          <div className="font-medium">
                            {account.type === 'card' ? `Card •••• ${account.last4}` : account.name}
                          </div>
                          <div className="text-sm text-gray-600">{account.country}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-blue-800 text-sm font-medium">
                          Default
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <Globe size={16} className="mr-2" />
              <span>Accepting payments from 200+ countries • 50+ currencies • No bank restrictions</span>
            </div>
            <div className="flex space-x-3">
              <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg font-medium">
                Close
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-800 flex items-center">
                <Shield size={18} className="mr-2" />
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;