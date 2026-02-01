import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PaymentMethodsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>
          <p>Universal payment methods page will be implemented here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PaymentMethodsPage;