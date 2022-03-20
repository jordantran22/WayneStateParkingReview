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

const StructureDetailsPage = () => {
  const location = useLocation();

  const parkingStructureInfo = location.state.structure;
  const loggedInStatus = location.state.loggedInStatus;
  const [structureRate, setStructureRate] = useState(location.state.structureRate);
  const [totalReviews, setTotalReviews] = useState(location.state.totalReviews);
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

    fetch(`http://localhost:5000/reviews?structure=${parkingStructureInfo.number}`, requestInfo)
      .then(res => res.json())
      .then(data => setReviews(data));
  }

  const reviewButtonClicked = () => getSessionLoginStatus();


  const getSessionLoginStatus = async () => {
    const userInformation = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      credentials: "include"
    }

    fetch('http://localhost:5000/login', userInformation)
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn === true) {
          setUserEmail(data.user);
          setLoggedIn(true);
          setWriteReviewPopup(true);
        } else {
          setLoggedIn(false);
          alert("You must be logged in!");
        }
      })
  }

  const ratingChanged = (newRating) => setRating(newRating);

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

    fetch('http://localhost:5000/review/submit', userInformation)
      .then(res => res.json())
      .then(data => {
        if (data.result === "success") {
          let date = new Date(data.review.review_date);
          data.review.review_date = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();

          setReviews(reviews => [...reviews, data.review]);
          setWriteReviewPopup(false);
          setTotalReviews(reviews.length + 1);

          if (reviews.length > 0) {
            let averageRating = 0;
            reviews.map(review => averageRating += review.review_rating);
            setStructureRate(averageRating / reviews.length);
          }
          else setStructureRate(data.review.review_rating);
        }
      });
  }

  useEffect(() => {
    try {
      getReviews();
    } catch (e) {
      console.log(e);
    }
  }, []);


  return (
    <div>
      <Navbar loggedInStatus={loggedInStatus} />
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
              <textarea onChange={(e) => setTextReview(e.target.value)} maxLength="250"></textarea>

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