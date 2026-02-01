import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ElectronicsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Electronics</h1>
          <p>Electronics page will be implemented here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ElectronicsPage;