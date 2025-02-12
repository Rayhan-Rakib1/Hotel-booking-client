import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  // Coordinates for Chittagong, Bangladesh
  const hotelLocation = [22.3569, 91.7832]; // Chittagong latitude and longitude

  return (
    <div className="w-full h-96 mb-7">
      <h1 className="text-2xl font-bold text-center mb-4">Our Location</h1>
      <MapContainer
        center={hotelLocation}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg shadow-md"
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Hotel Marker */}
        <Marker position={hotelLocation}>
          <Popup>
            Our Hotel Location <br /> Visit us anytime in Chittagong!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
