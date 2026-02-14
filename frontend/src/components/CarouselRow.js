import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AIPriceBadge from './AIPriceBadge';

const CarouselRow = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items || items.length === 0) return null;

  const item = items[currentIndex];
  const trend = item.aiChange > 0 ? 'up' : item.aiChange < 0 ? 'down' : 'neutral';

  return (
    <div className="w-full mb-6 md:mb-8">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-white px-4 mb-3 md:mb-4">{title}</h2>

      {/* Full‑width background container */}
      <div className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800 py-6 md:py-8">
        {/* Left Arrow – positioned with more space on mobile */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-3xl md:text-4xl hover:bg-black/90 focus:outline-none shadow-lg"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-3xl md:text-4xl hover:bg-black/90 focus:outline-none shadow-lg"
          aria-label="Next"
        >
          ›
        </button>

        {/* Card container – full width with horizontal padding */}
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
          <Link
            to={item.link}
            className="block w-full bg-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 hover:scale-[1.01] md:hover:scale-[1.02] transition-transform duration-200"
          >
            {/* Stack vertically on mobile, row on larger screens */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-center">
              {/* Image – full width on mobile, half on desktop */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover rounded-xl md:rounded-2xl shadow-xl"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/1e293b/94a3b8?text=No+Image';
                  }}
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 lg:mb-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed mb-3 md:mb-4">
                  {item.specs}
                </p>

                {/* AI Price Badge */}
                {item.aiChange !== undefined && (
                  <div className="flex justify-center md:justify-start">
                    <AIPriceBadge
                      changePercent={item.aiChange}
                      location={item.aiLocation || 'Unknown'}
                      updatedAt={item.aiUpdated || '3m ago'}
                      trend={trend}
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Dots indicator – always visible, no need for hover */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${
                i === currentIndex ? 'bg-blue-500' : 'bg-slate-600'
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselRow;