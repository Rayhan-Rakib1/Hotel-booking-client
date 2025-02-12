import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../layout/Header';
import PopularDes from '../layout/PopularDes';
import ChooseUs from '../layout/ChooseUs';
import Map from '../layout/Map';
import Rooms from './Rooms';
import SpecialOffers from './SpecialOffers';

const Home = () => {
    return (
        <div>
            {/* React Helmet for dynamic metadata */}
            <Helmet>
                <title>Hotel Booking - Home</title>
                <meta name="description" content="Discover luxurious rooms, popular destinations, and why you should choose us. Book your dream stay now!" />
            </Helmet>
<SpecialOffers></SpecialOffers>
            <Header />
            <Map />
            <div className='mt-36'>
                <h1 className='m-7 text-3xl font-bold text-center'>Rooms</h1>
                <Rooms />
            </div>
            <PopularDes />
            <ChooseUs />
        </div>
    );
};

export default Home;
