import React, { useState, useEffect } from 'react';
import './MarketData.css';

const MarketData = () => {
  const [marketData, setMarketData] = useState({
    carIndex: '+2.2%',
    electronics: '+1.5%',
    evDemand: '+20%',
    lastUpdate: '23:08'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setMarketData(prev => ({
        ...prev,
        lastUpdate: `${hours}:${minutes}`
      }));
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    // Simulate market changes
    const marketInterval = setInterval(() => {
      const carChange = (Math.random() * 0.4 - 0.2).toFixed(1);
      const electronicsChange = (Math.random() * 0.3 - 0.15).toFixed(1);
      
      setMarketData(prev => ({
        ...prev,
        carIndex: (parseFloat(prev.carIndex) + parseFloat(carChange)).toFixed(1) + '%',
        electronics: (parseFloat(prev.electronics) + parseFloat(electronicsChange)).toFixed(1) + '%'
      }));
    }, 10000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(marketInterval);
    };
  }, []);

  return (
    <div className="market-data-container">
      <div className="market-data-grid">
        <div className="data-item">
          <div className="data-label">Car Index</div>
          <div className={`data-value ${marketData.carIndex.includes('+') ? 'positive' : 'negative'}`}>
            {marketData.carIndex}
          </div>
        </div>
        <div className="data-item">
          <div className="data-label">Electronics</div>
          <div className={`data-value ${marketData.electronics.includes('+') ? 'positive' : 'negative'}`}>
            {marketData.electronics}
          </div>
        </div>
        <div className="data-item">
          <div className="data-label">EV Demand</div>
          <div className="data-value positive">
            {marketData.evDemand}
          </div>
        </div>
      </div>
      <div className="update-time">
        Last Update: {marketData.lastUpdate}
      </div>
    </div>
  );
};

export default MarketData;