import React, { useState, useEffect } from 'react';

const SpecialOffers = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Open modal on page load
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Modal background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-3/4 sm:w-1/2 md:w-1/3"
            onClick={(e) => e.stopPropagation()}
            
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">Special Offers </h2>
            <img
              src="https://th.bing.com/th/id/OIP.0xZqr5rv59ytlNRDGaMwRQHaEP?w=308&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Special Offer"
              className="w-full h-auto mb-4 rounded-lg"
            />
            <p className="mb-4 text-center">
              Exclusive discounts on bookings! Get 20% off your next stay. Hurry, limited time offer!
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
