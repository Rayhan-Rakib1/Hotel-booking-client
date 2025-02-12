import React, { useEffect, useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetails = () => {
  const room = useLoaderData(); // Assuming you're using React Router's loader
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch reviews for the room
  useEffect(() => {
    fetch(`https://hotel-booking-server-blond.vercel.app/reviews?roomId=${room._id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [room._id]);

  // Handle Booking
  const handleBooking = () => {
    if (!selectedDate) {
      Swal.fire('Error', 'Please select a booking date.', 'error');
      return;
    }

    const booking = {
      booked_id: room._id,
      booked_email: user.email,
      date: selectedDate,
    };

    Swal.fire({
      title: 'Confirm Booking',
      html: `
        <div>
          <p><strong>Room:</strong> ${room.type}</p>
          <p><strong>Date:</strong> ${selectedDate.toLocaleDateString()}</p>
          <p><strong>Price:</strong> ${room.pricePerNight} ${room.currency}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://hotel-booking-server-blond.vercel.app/bookedRooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(booking),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire('Success', 'Your room has been booked!', 'success');
              navigate('/bookedRooms');
            } else {
              Swal.fire('Error', 'Room booking failed. Please try again.', 'error');
            }
          });
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Room Details */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{room.type}</h1>
        <img src={room.images[0]} alt={room.type} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p>{room.description}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p><strong>Price:</strong> {room.pricePerNight} {room.currency} / night</p>
          <p><strong>Capacity:</strong> {room.capacity} persons</p>
          <p><strong>Smoking Allowed:</strong> {room.smokingAllowed ? 'Yes' : 'No'}</p>
          <p><strong>Pet Friendly:</strong> {room.petFriendly ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>{review.email}:</strong> {review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this room.</p>
        )}
      </div>

      {/* Booking Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Book This Room</h2>
        <div className="flex items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            placeholderText="Select a booking date"
            className="border p-2 rounded"
          />
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
