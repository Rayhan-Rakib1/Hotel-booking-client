import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { ready } from 'localforage';
import axios from 'axios';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const BookedRooms = () => {
  const { user } = useContext(AuthContext);
  const [bookedRooms, setBookedRooms] = useState([]);
  const AxiosSecure = UseAxiosSecure();



  // Fetch booked rooms for the logged-in user
  useEffect(() => {
    // fetch(`https://hotel-booking-server-blond.vercel.app/bookedRooms?email=${user.email`}`)
    //   .then((res) => res.json())
    //   .then((data) => setBookedRooms(data));


    // axios.get(`https://hotel-booking-server-blond.vercel.app/bookedRooms?email=${user.email}`, {withCredentials: true})
    //   .then(res => setBookedRooms(res.data))

    AxiosSecure.get(`/bookedRooms?email=${user.email}`)
      .then(res => setBookedRooms(res.data))

  }, [user.email]);

  // Handle Cancel Booking
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this booking!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://hotel-booking-server-blond.vercel.app/bookedRooms/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your booking has been canceled.', 'success');
              setBookedRooms(bookedRooms.filter((room) => room._id !== id));
            }
          });
      }
    });
  };

  // Handle Update Date
  const handleUpdateDate = (data) => {

    const cancelOneDayBefore = new Date(data.date) > new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (cancelOneDayBefore) {
      console.log('delete');
    }


    Swal.fire({
      title: 'Select a New Date',
      input: 'date',
      inputLabel: 'New Booking Date',
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (newDate) => {
        return fetch(`https://hotel-booking-server-blond.vercel.app/bookedRooms/${data._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: newDate }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.modifiedCount) {
              throw new Error('Failed to update booking.');
            }
            return data;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Updated!', 'The booking date has been updated.', 'success');
        fetch(`https://hotel-booking-server-blond.vercel.app/bookedRooms?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => setBookedRooms(data));
      }
    });
  };

  // Handle Post Review
  const handlePostReview = (id) => {
    Swal.fire({
      title: 'Post a Review',
      html: `
        <textarea id="review-text" class="swal2-textarea" placeholder="Write your review here..."></textarea>
        <div id="star-rating" class="flex justify-center mt-2">
          <span class="star" data-value="1">&#9733;</span>
          <span class="star" data-value="2">&#9733;</span>
          <span class="star" data-value="3">&#9733;</span>
          <span class="star" data-value="4">&#9733;</span>
          <span class="star" data-value="5">&#9733;</span>
        </div>
        <input type="hidden" id="review-rating" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const review = document.getElementById('review-text').value;
        const rating = document.getElementById('review-rating').value;
        if (!review || !rating) {
          Swal.showValidationMessage('Please enter a valid review and rating (1-5).');
        }
        return { review, rating };
      },
      didOpen: () => {
        // Add click event to the stars
        const stars = document.querySelectorAll('.star');
        stars.forEach((star) => {
          star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            document.getElementById('review-rating').value = value;
            // Update the star colors
            stars.forEach((s) => s.classList.remove('text-yellow-500'));
            for (let i = 0; i < value; i++) {
              stars[i].classList.add('text-yellow-500');
            }
          });
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { review, rating } = result.value;
        const email = user.email;
        const roomId = id;
        const reviewSection = { review, rating, roomId, email };
        console.log(reviewSection);
        fetch(`https://hotel-booking-server-blond.vercel.app/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewSection),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire('Thank you!', 'Your review and rating have been submitted.', 'success');
          });
      }
    });
  };


  return (
    <div className=" bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Booked Rooms: {bookedRooms.length}</h1>
      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Current Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms.map((room) => (
            <tr key={room._id} className="border-b">
              <td className="p-4">
                <img src={room.image} alt={room.type} className="w-20 rounded-md" />
              </td>
              <td className="p-4">{room.type}</td>
              <td className="p-4">
                {room.pricePerNight} {room.currency}
              </td>
              <td className="p-4">{room.date}</td>
              <td className="p-4 flex gap-4">
                <button
                  onClick={() => handleCancel(room)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateDate(room._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update Date
                </button>
                <button
                  onClick={() => handlePostReview(room._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookedRooms;
