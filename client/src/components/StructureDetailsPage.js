import React from 'react'
import DetailCard from './DetailCard';
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import PrimaryButton from './PrimaryButton';
import Map from './Map';
import PricingTable from './PricingTable';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

const StructureDetailsPage = () => {
  const location = useLocation();
 // console.log(location.state);
  const parkingStructureInfo = location.state.structure;
  const loggedInStatus = location.state.loggedInStatus;
  const totalReviews = location.state.totalReviews;
  const structureRate = location.state.structureRate;
 // console.log(location)
 // console.log(parkingStructureInfo);

  const [loggedIn, setLoggedIn] = useState();

  const [reviews, setReviews] = useState([]);
  const [writeReviewPopup, setWriteReviewPopup] = useState(false);
  const [rating, setRating] = useState();

  const getReviews = async () => {
      const requestInfo = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      }
    
      const res = await fetch(`http://localhost:5000/reviews?structure=${parkingStructureInfo.number}`, requestInfo);
      const data = await res.json();
      setReviews(data);
  }

    const reviewButtonClicked = () => {
         getSessionLoginStatus();
        // if(loggedIn) {
        //     setWriteReviewPopup(true);
        // } else {
        //   alert("You must be logged in!");
        // }
    }


    const getSessionLoginStatus = async () => {
      const userInformation = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
          credentials : "include"
      }
  
      const res = await fetch('http://localhost:5000/login', userInformation);
      const data = await res.json();
      console.log(data);
      if(data.loggedIn === true) {
        setLoggedIn(true);
        setWriteReviewPopup(true);
      } else {
        setLoggedIn(false);
        alert("You must be logged in!");
      }
  }

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(rating);
  }

  useEffect(() => {
      getReviews();
    //  getSessionLoginStatus();
  },[]);
  

  return (
    <div>
      <Navbar loggedInStatus={loggedInStatus} />
      <div className='content-container'>
        <DetailCard parkingStructureInfo={parkingStructureInfo} totalReviews={totalReviews} structureRate={structureRate}/>
        <PricingTable parkingStructureInfo={parkingStructureInfo} />
        {/* <PrimaryButton text={"Write Review"} func={() => { }} /> */}

        <button className='primary-btn' onClick={() => reviewButtonClicked()}>
            Write Review!
        </button>

        {
          writeReviewPopup &&
          <div className="login-modal-overlay">
                    <div className="login-modal">
                        <button className="close-modal-btn" onClick={() => setWriteReviewPopup(false)}>
                            X
                        </button>
                       
                       <h2>Rating:  <ReactStars color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={true} onChange={ratingChanged} value={rating}/></h2>

                       <h2>Write Your Review!</h2>
                       <textarea></textarea>
                    </div>
                </div>
        }

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