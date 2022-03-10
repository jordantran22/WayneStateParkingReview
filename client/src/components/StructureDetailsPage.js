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
  const parkingStructureInfo = location.state.structure;
  const loggedInStatus = location.state.loggedInStatus;
  const totalReviews = location.state.totalReviews;
  const structureRate = location.state.structureRate;
  console.log(location)
  console.log(parkingStructureInfo);

  return (
    <div>
      <Navbar loggedInStatus={loggedInStatus} />
      <div className='content-container'>
        <DetailCard parkingStructureInfo={parkingStructureInfo} totalReviews={totalReviews} structureRate={structureRate}/>
        <PricingTable parkingStructureInfo={parkingStructureInfo} />
        <PrimaryButton text={"Write Review"} func={() => { }} />
        <ReviewCard />
      </div>
      <Map />
    </div>
  )
}

export default StructureDetailsPage