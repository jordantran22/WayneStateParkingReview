import React from 'react'
import ParkingStructureDetailCard from './ParkingStructureDetailCard';
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import PrimaryButton from './PrimaryButton';
import Map from './Map';

const ParkingStructurePage = () => {
  const location = useLocation();
  console.log(location.state);
  const parkingStructureInfo = location.state;
  console.log(parkingStructureInfo);

  return (
    <div className="parkingStructureInfoPage">
      <Navbar />
      <div className='content-container'>
        <ParkingStructureDetailCard parkingStructureInfo={parkingStructureInfo} />
        <PrimaryButton text={"Write Review"} func={() => { }} />
      </div>
      <Map />
    </div>
  )
}

export default ParkingStructurePage