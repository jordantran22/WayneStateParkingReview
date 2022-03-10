import React from 'react'
import DetailCard from './DetailCard';
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import PrimaryButton from './PrimaryButton';
import Map from './Map';
import PricingTable from './PricingTable';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';

const StructureDetailsPage = () => {
  const location = useLocation();
  console.log(location.state);
  const parkingStructureInfo = location.state.structure;
  const loggedInStatus = location.state.loggedInStatus;
  const totalReviews = location.state.totalReviews;
  const structureRate = location.state.structureRate;
  console.log(location)
  console.log(parkingStructureInfo);

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
      const requestInfo = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      }
    
      const res = await fetch(`http://localhost:5000/reviews?structure=${parkingStructureInfo.number}`, requestInfo);
      const data = await res.json();
      setReviews(data);

      // fetch(`http://localhost:5000/reviews?structure=${parkingStructureInfo.number}`, requestInfo)
      // .then(response => {
      //     if(response.ok) {
      //         return response.json();
      //     }
      //     console.log(response);
      // }).then(data => {
      //     setReviews(data);
      //     console.log(data);
      //     console.log(reviews);
      // }).catch(err => {
      //     console.log(err);
      // })
  }

  useEffect(() => {
      getReviews();
  },[]);
  

  return (
    <div>
      <Navbar loggedInStatus={loggedInStatus} />
      <div className='content-container'>
        <DetailCard parkingStructureInfo={parkingStructureInfo} totalReviews={totalReviews} structureRate={structureRate}/>
        <PricingTable parkingStructureInfo={parkingStructureInfo} />
        <PrimaryButton text={"Write Review"} func={() => { }} />

        {
          reviews.map((review) => {
            return(
              <ReviewCard review={review}/>
            )
          })
        }
      </div>
      <Map />
    </div>
  )
}

export default StructureDetailsPage