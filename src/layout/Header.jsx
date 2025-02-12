import React from 'react';
import pic1 from '../assets/pic1.webp'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div
  className="hero h-[700px]"
  style={{
    backgroundImage:`url(${pic1})`,
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-xl">
      <h1 className="mb-5 text-5xl font-bold">Find Your Perfect Stay - Booking.com Hotel Booking Platform</h1>
      <p className="mb-5">
      Discover the best hotels at unbeatable prices with booking.com. Book your next stay effortlessly with our user-friendly platform, offering secure and seamless hotel reservations worldwide.
      </p>
      <Link to='rooms' className="btn bg-gray-500 text-white hover:bg-gray-600">Booked now</Link>
    </div>
  </div>
</div>
    );
};

export default Header;