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
import LeafletMapOneStructure from './LeafletMapOneStructure';
import { URL } from '../data/APIurl';

const StructureDetailsPage = ({structureInfo}) => {
  //const location = useLocation();
  // console.log(location.state);
  const parkingStructureInfo = structureInfo;
  //console.log(structureInfo)
  //const loggedInStatus = location.state.loggedInStatus;
  //const totalReviews = location.state.totalReviews;
  //const structureRate = location.state.structureRate;
  // const [structureRate, setStructureRate] = useState(location.state.structureRate);
  // const [totalReviews, setTotalReviews] = useState(location.state.totalReviews);

  const [structureRate, setStructureRate] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
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

    const res = await fetch(`${URL}/reviews?structure=${parkingStructureInfo.number}`, requestInfo);
    const data = await res.json();
    setReviews(data);
   // console.log(data);
  }

  const reviewButtonClicked = () => {
    getSessionLoginStatus();
  }


  const getSessionLoginStatus = async () => {
    const userInformation = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      credentials: "include"
    }

    const res = await fetch(`${URL}/login`, userInformation);
    const data = await res.json();
    //console.log(data);
    if (data.loggedIn === true) {
      setUserEmail(data.user);
      // console.log(data.user);
     // console.log(userEmail);
      setLoggedIn(true);
      setWriteReviewPopup(true);
    } else {
      setLoggedIn(false);
      alert("You must be logged in!");
    }
  }

  const ratingChanged = (newRating) => {
    setRating(newRating);
    //console.log(rating);
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
    const res = await fetch(`${URL}/review/submit`, userInformation);
    const data = await res.json();
    //console.log(data);

    if (data.result === "success") {
      // console.log(data.review);
      var date = new Date(data.review.review_date);
      var dateFormated = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
      data.review.review_date = dateFormated;

      setReviews(reviews => [...reviews, data.review])
      setWriteReviewPopup(false);
      var reviewCounter = totalReviews + 1;
      setTotalReviews(reviewCounter);

      if (reviews.length > 0) {
       // console.log(reviews.length);
        var averageRating = 0;
        reviews.map((review) => {
          averageRating += review.review_rating;
        })

        setStructureRate(averageRating / reviews.length);
       // console.log(averageRating / reviews.length);
      } else {
        setStructureRate(data.review.review_rating);
      }
    }
  }

  const getStructureRatingAndTotalReviews = () => {
   // console.log(parkingStructureInfo);
    JSON.parse(localStorage.getItem("ratings")).map((structure) => {
      if(structure.parking_structure_id == parkingStructureInfo.number) {
        // console.log(structure.total_reviews);
        // console.log(structure.rating)
        setTotalReviews(structure.total_reviews);
        setStructureRate(structure.rating);
      }
    })
  }

  useEffect(() => {
    try {
      getReviews();
      getStructureRatingAndTotalReviews();
    } catch (e) {
      console.log(e);
    }

    //  getSessionLoginStatus();
  }, []);


  return (
    <div>
      {/* <Navbar loggedInStatus={loggedInStatus} /> */}
      {/* <Navbar /> */}
      <div className='content-container'>
        <DetailCard parkingStructureInfo={parkingStructureInfo} totalReviews={totalReviews} structureRate={structureRate} />

        <p>
            {parkingStructureInfo.description}
        </p>

        <PricingTable parkingStructureInfo={parkingStructureInfo} />

        <PrimaryButton text='Write Review' func={reviewButtonClicked} />
        {
          writeReviewPopup &&
          <div className="login-modal-overlay">
            <div className="login-modal">
              <button className="close-modal-btn" onClick={() => setWriteReviewPopup(false)}>
                X
              </button>

              <h2>Rating:  <ReactStars color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={true} onChange={ratingChanged} value={rating} /></h2>

              <h2>Write Your Review!</h2>
              <textarea onChange={(e) => setTextReview(e.target.value)} maxlength="250"></textarea>

              <button onClick={() => submitReview()}>Submit!</button>
            </div>
          </div>
        }

        {
          reviews.map((review) => {
            return (
                <ReviewCard key={review.review_id} review={review} />
            )
          })
        }
      </div>
      {/* <LeafletMap /> */}

      <LeafletMapOneStructure structureInfo={parkingStructureInfo} />
    </div>
  )
}

export default StructureDetailsPage