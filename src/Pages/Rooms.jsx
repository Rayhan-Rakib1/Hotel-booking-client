import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import { Helmet } from 'react-helmet';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('https://hotel-booking-server-blond.vercel.app/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [])


    
    return (
        <div> 
            <Helmet>
                <title>Hotel Booking- Home</title>
            </Helmet>
            <h1 className='text-xl font-bold text-center mb-3 mt-12'>rooms: {rooms.length}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    rooms.map(room => <RoomCard key={room._id} room={room}></RoomCard>)
                }
            </div>
        </div>
    );
};

export default Rooms;