import React from 'react'
import DetailCard from './DetailCard';
import { useLocation } from 'react-router-dom'
import PrimaryButton from './PrimaryButton';
import PricingTable from './PricingTable';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import LeafletMapOneStructure from './LeafletMapOneStructure';
import { axiosPublic, axiosPrivate } from '../api/axios';

const StructureDetailsPage = () => {
  const location = useLocation();

  const parkingStructureInfo = location.state.structure;
  const [structureRate, setStructureRate] = useState(location.state.structureRate);
  const [totalReviews, setTotalReviews] = useState(location.state.totalReviews);
  const [reviews, setReviews] = useState([]);
  const [writeReviewPopup, setWriteReviewPopup] = useState(false);
  const [rating, setRating] = useState();
  const [textReview, setTextReview] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getReviews = async () => {
    axiosPublic.get(`/reviews?structure=${parkingStructureInfo.number}`)
      .then(res => setReviews(res.data));
  }

  const reviewButtonClicked = () => getSessionLoginStatus();

  const getSessionLoginStatus = async () => {
    axiosPrivate.get('/login')
      .then(res => {
        if (res.data.loggedIn === true) {
          setUserEmail(res.data.user);
          setWriteReviewPopup(true);
        } else {
          alert("You must be logged in!");
        }
      })
  }

  const ratingChanged = (newRating) => setRating(newRating);

  const submitReview = async () => {
    axiosPrivate.post('/review/submit', {
      parkingStructure: parkingStructureInfo.number,
      email: userEmail,
      rating: rating,
      textReview: textReview
    })
      .then(res => {
        if (res.data.result === "success") {
          let date = new Date(res.data.review.review_date);
          res.data.review.review_date = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();

          setReviews(reviews => [...reviews, res.data.review]);
          setWriteReviewPopup(false);
          setTotalReviews(reviews.length + 1);

          if (reviews.length > 0) {
            let averageRating = 0;
            reviews.map(review => averageRating += review.review_rating);
            setStructureRate(averageRating / reviews.length);
          }
          else setStructureRate(res.data.review.review_rating);
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

              <button onClick={submitReview}>Submit!</button>
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