import React from 'react'
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import LeafletMap from './LeafletMap';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

const MyReviewsPage = () => {
    const location = useLocation();
    const [reviews, setReviews] = useState([]);
    const [editReviewPoup, setEditReviewPopup] = useState(false);
    const [rating, setRating] = useState();
    const [textReview, setTextReview] = useState("");
    const [editReviewSelected, setEditReviewSelected] = useState({});
    
    const loggedInStatus = location.state.loggedInStatus;

    const getMyReviews = async () => {
        const userInformation = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            credentials: "include"
        }

        const res = await fetch('http://localhost:5000/login', userInformation);
        const userData = await res.json();
        if (userData.loggedIn === true) {
            const requestInfo = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            }

            const res2 = await fetch(`http://localhost:5000/myreviews?userId=${userData.userId}`, requestInfo);
            const reviewsData = await res2.json();
            setReviews(reviewsData);
        } else {
            alert("You must be logged in!");
        }
    }

    const selectReviewToEdit = (review) => {
        setEditReviewSelected(review);
        setEditReviewPopup(true);
    }

    const deleteReview = async (review_id) => {
        const reviewInformation = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
          body: JSON.stringify({
            reviewId: review_id
          }),
        }
        const res = await fetch('http://localhost:5000/review/delete', reviewInformation);
        const data = await res.json();
        console.log(data);

        if(data.result === "success") {
            setReviews(reviews.filter((review) => review.review_id !== review_id));
        } 
    }

    const editReview = async () => {
        editReviewSelected.review_rating = rating;
        editReviewSelected.review_text = textReview;

        const reviewInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({
              reviewId: editReviewSelected.review_id,
              reviewRating: editReviewSelected.review_rating,
              reviewText: editReviewSelected.review_text
            }),
          }
          const res = await fetch('http://localhost:5000/review/edit', reviewInformation);
          const data = await res.json();

          if(data.result === "success") {
              setEditReviewPopup(false);
              editReviewSelected.review_text = textReview;
              editReviewSelected.review_rating = rating;
              setEditReviewSelected({});
              setRating();
              setTextReview("");
          } else {
              alert("Something went wrong!")
          }
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
      }

    useEffect(() => {
        try {
            getMyReviews();
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div>
            <Navbar loggedInStatus={loggedInStatus} />
            <div className='content-container'>
                {
                    reviews.map((review) => {
                        return (
                            <div className='my-review-card'>
                                <h2>
                                    {review.structure_name}
                                </h2>
                                <ReviewCard key={review.review_id} review={review} />
                                <div>
                                    <button onClick={() => selectReviewToEdit(review)}>Edit</button>
                                    <button onClick={() => deleteReview(review.review_id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


            {
                editReviewPoup &&
                <div className="login-modal-overlay">
                        <div className="login-modal">
                        <button className="close-modal-btn" onClick={() => setEditReviewPopup(false)}>
                            X
                        </button>

                        <h2>Rating:  <ReactStars color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={true} onChange={ratingChanged} value={rating} /></h2>

                        <h2>Edit Your Review!</h2>
                        <textarea onChange={(e) => setTextReview(e.target.value)}></textarea>

                        <button onClick={() => editReview()}>Edit!</button>
                    </div>
                </div>
            }
            <LeafletMap />
        </div>
    )
}

export default MyReviewsPage