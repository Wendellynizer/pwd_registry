import React from 'react'
import 'leaflet/dist/leaflet.css';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';

const Map = () => {
  
  const mapStyle = 'h-full w-full';

  return (
    <div className='flex flex-col h-full overflow-hidden'>
			{/* <div className="text-xl font-bold p-4">Tagum City Map</div> */}

      <div className='absolute top-20 right-10 z-[1000]'>
        <select name="" id="" className='select select-sm shadow w-fit'>
          <option value="">Speech and Language</option>
          <option value="">Visual</option>
          <option value="">Learning</option>
          <option value="">Mental</option>
          <option value="">Intellectual</option>
          <option value="">Physical</option>
          <option value="">Psychosocial</option>
          <option value="">Hearing or Deaf</option>
          <option value="">Cancer</option>
          <option value="">Rare Disease</option>
        </select>
      </div>

      <div className='absolute bottom-10 right-10 z-[1000] bg-white px-5 py-5 space-y-4 rounded'>
        <div className='flex items-center gap-4'>
          <div className='bg-[#fdd0a2] w-6 h-6'></div>
          <p>Low</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='bg-[#fdae6b] w-6 h-6'></div>
          <p>Medium</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='bg-[#fd8d3c] w-6 h-6'></div>
          <p>High</p>
        </div>

        <div className='flex items-center gap-4'>
          <div className='bg-[#e6550d] w-6 h-6'></div>
          <p>Very High</p>
        </div>
      </div>

      <div className='flex-1 relative'>
        <MapContainer 
          center={[7.437412412336513, 125.80314327952668]} 
          zoom={13.2}
          scrollWheelZoom={true}
          className={mapStyle}
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
		</div>
  )
}

export default Map