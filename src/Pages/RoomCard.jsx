import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { type, pricePerNight, currency, capacity, floorNumber, images, _id } = room;
  const [bookedRooms, setBookedRooms] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isUnavailable) return; // Prevent navigation if the room is unavailable
    navigate(`/room/${_id}`);
  };

  useEffect(() => {
    fetch('https://hotel-booking-server-blond.vercel.app/bookedRooms/all')
      .then(res => res.json())
      .then(data => setBookedRooms(data));
  }, []);

  // Check if the room is unavailable
  const isUnavailable = bookedRooms.some(booked => booked.booked_id === _id);

  return (
    <div
      onClick={handleCardClick}
      className={`card group relative bg-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
        isUnavailable ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      {/* Room Image */}
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={images}
          alt={type}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {type}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Capacity: {capacity} people | Floor: {floorNumber}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">
            {pricePerNight} {currency} / night
          </span>
        </div>
      </div>

      {/* Unavailable Overlay */}
      {isUnavailable && (
        <div className="absolute inset-0 bg-red-600 bg-opacity-70 flex justify-center items-center text-white font-bold text-lg">
          Unavailable
        </div>
      )}

      {/* "View Details" Button */}
      {!isUnavailable && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 flex justify-center items-center text-white font-medium opacity-0 group-hover:opacity-100 group-hover:bg-opacity-90 transition-opacity duration-300">
          View Details
        </div>
      )}
    </div>
  );
};

export default RoomCard;
