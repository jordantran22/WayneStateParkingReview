import React from 'react'
import DetailCard from './DetailCard';
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import PrimaryButton from './PrimaryButton';
import Map from './Map';
import PricingTable from './PricingTable';
import ReviewCard from './ReviewCard';

const StructureDetailsPage = () => {
  const location = useLocation();
  console.log(location.state);
  const parkingStructureInfo = location.state;
  console.log(parkingStructureInfo);

  return (
    <div>
      <Navbar />
      <div className='content-container'>
        <DetailCard parkingStructureInfo={parkingStructureInfo} />
        <PricingTable parkingStructureInfo={parkingStructureInfo} />
        <PrimaryButton text={"Write Review"} func={() => { }} />
        <ReviewCard />
      </div>
      <Map />
    </div>
  )
}

export default StructureDetailsPage