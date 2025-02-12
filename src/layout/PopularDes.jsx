import React from 'react';
import paris from '../assets/paris.jpeg'
import newYork from '../assets/newYork.jpeg'
import tokyo from '../assets/tokyo.jpeg'

const PopularDes = () => {
    return (
        <div>
            <section className="popular-destinations py-12 bg-gray-500 text-white mt-24 mb-24">
    <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="destination-card">
                <img src={paris} alt="Paris" className="w-full rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Paris</h3>
                <p>Experience the city of love and lights.</p>
            </div>
            <div className="destination-card">
                <img src={newYork} alt="New York" className="w-full rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">New York</h3>
                <p>Explore the city that never sleeps.</p>
            </div>
            <div className="destination-card">
                <img src={tokyo} alt="Tokyo" className="w-full rounded-lg" />
                <h3 className="text-2xl font-semibold mt-4">Tokyo</h3>
                <p>Dive into the culture and technology of Japan.</p>
            </div>
        </div>
    </div>
</section>

        </div>
    );
};

export default PopularDes;