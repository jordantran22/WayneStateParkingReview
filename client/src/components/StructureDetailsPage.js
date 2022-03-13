import React from 'react'
import DetailCard from './DetailCard';
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import PrimaryButton from './PrimaryButton';
import LeafletMap from './LeafletMap';
import PricingTable from './PricingTable';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

const StructureDetailsPage = () => {
  const location = useLocation();
 // console.log(location.state);
  const parkingStructureInfo = location.state.structure;
  const loggedInStatus = location.state.loggedInStatus;
  //const totalReviews = location.state.totalReviews;
  //const structureRate = location.state.structureRate;
  const [structureRate, setStructureRate] = useState(location.state.structureRate);
  const [totalReviews, setTotalReviews] = useState(location.state.totalReviews);
 // console.log(location)
 // console.log(parkingStructureInfo);

  const [loggedIn, setLoggedIn] = useState();

  const [reviews, setReviews] = useState([]);
  const [writeReviewPopup, setWriteReviewPopup] = useState(false);
  const [rating, setRating] = useState();
  const [textReview, setTextReview] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getReviews = async () => {
      const requestInfo = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      }
    
      const res = await fetch(`http://localhost:5000/reviews?structure=${parkingStructureInfo.number}`, requestInfo);
      const data = await res.json();
      setReviews(data);
      console.log(data);
  }

    const reviewButtonClicked = () => {
         getSessionLoginStatus();
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
        setUserEmail(data.user);
       // console.log(data.user);
        console.log(userEmail);
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

  const submitReview = async () => {
      const userInformation = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        body: JSON.stringify({
            parkingStructure: parkingStructureInfo.number,
            email: userEmail,
            rating: rating,
            textReview: textReview
        }),
    }
    const res = await fetch('http://localhost:5000/review/submit', userInformation);
    const data = await res.json();
    console.log(data);

    if(data.result === "success") {
      console.log(data.review);
      var date = new Date(data.review.review_date);
      var dateFormated = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
      data.review.review_date = dateFormated;

      setReviews(reviews => [...reviews, data.review])
      setWriteReviewPopup(false);
      var reviewCounter = totalReviews + 1;
      setTotalReviews(reviewCounter);

      if(reviews.length > 0 ) {
        console.log(reviews.length);
        var averageRating = 0;
        reviews.map((review) => {
          averageRating += review.review_rating;
        })
  
        setStructureRate(averageRating / reviews.length);
        console.log(averageRating / reviews.length);
      } else {
        setStructureRate(data.review.review_rating);
      }
    } 
  }

  useEffect(() => {
    try {
      getReviews();
    } catch (e) {
      console.log(e);
    }

    //  getSessionLoginStatus();
  },[]);
  

  return (
    <div>
      <Navbar loggedInStatus={loggedInStatus} />
      <div className='content-container'>
        <DetailCard parkingStructureInfo={parkingStructureInfo} totalReviews={totalReviews} structureRate={structureRate}/>
        <PricingTable parkingStructureInfo={parkingStructureInfo} />

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
                       <textarea onChange={(e) => setTextReview(e.target.value)}></textarea>

                       <button onClick={() => submitReview()}>Submit!</button>
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
      <LeafletMap />
    </div>
  )
}

export default StructureDetailsPage