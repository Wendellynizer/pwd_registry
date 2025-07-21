import React from 'react'
import 'leaflet/dist/leaflet.css';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';

const Map = () => {
  
  const mapStyle = 'h-full w-full';

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
			{/* <div className="text-xl font-bold p-4">Tagum City Map</div> */}

      <div className='flex-1'>
        <MapContainer 
          center={[7.437412412336513, 125.80314327952668]} 
          zoom={13.2}
          scrollWheelZoom={true}
          className={mapStyle}
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
        </MapContainer>
      </div>
		</div>
  )
}

export default Map