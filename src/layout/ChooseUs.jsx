import React from 'react';
import easyBooking from '../assets/easy-booking.jpeg'
import bestDeal from '../assets/Best-deal.jpeg'
import support from '../assets/service.jpeg'
import trusted from '../assets/trusted.jpeg'

const ChooseUs = () => {
    return (
        <div>
            <section className="why-choose-us py-12 bg-gray-800 text-white">
    <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Booking.com?</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card">
                <img  src={easyBooking} alt="Easy Booking" className="mx-auto mb-4 h-[200px]" />
                <h3 className="text-2xl font-semibold">Easy Booking</h3>
                <p>Quick and hassle-free hotel booking process.</p>
            </div>
            <div className="feature-card">
                <img src={bestDeal} alt="Best Deals" className="mx-auto mb-4 h-[200px]" />
                <h3 className="text-2xl font-semibold">Best Deals</h3>
                <p>Unbeatable prices and exclusive discounts.</p>
            </div>
            <div className="feature-card">
                <img src={support} alt="24/7 Support" className="mx-auto mb-4 h-[200px]" />
                <h3 className="text-2xl font-semibold">24/7 Support</h3>
                <p>We're here to assist you anytime, anywhere.</p>
            </div>
            <div className="feature-card">
                <img src={trusted} alt="Trusted Platform" className="mx-auto mb-4 h-[200px] w-[200px]" />
                <h3 className="text-2xl font-semibold">Trusted Platform</h3>
                <p>Millions of happy customers worldwide.</p>
            </div>
        </div>
    </div>
</section>

        </div>
    );
};

export default ChooseUs;