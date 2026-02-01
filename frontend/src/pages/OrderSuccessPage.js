import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Order Success</h1>
          <p>Thank you for your order! Your order has been successfully placed.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default OrderSuccessPage;