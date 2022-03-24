import React from 'react'
import LeafletMap from './LeafletMap';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { axiosPrivate } from '../api/axios';
import { useNavigate } from 'react-router';
import PrimaryButton from './PrimaryButton';

const MyReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [editReviewPoup, setEditReviewPopup] = useState(false);
    const [rating, setRating] = useState();
    const [textReview, setTextReview] = useState("");
    const [editReviewSelected, setEditReviewSelected] = useState({});
    const navigate = useNavigate();

    const getMyReviews = async () => {
        axiosPrivate.get('/login')
            .then(res => {
                if (res.data.loggedIn) {
                    axiosPrivate.get('/login')
                        .then(res => axiosPrivate.get(`/user/reviews?userId=${res.data.userId}`))
                        .then(res => setReviews(res.data));
                }
                else {
                    alert("Access Denied!");
                    navigate('/');
                }
            })
    }


    const selectReviewToEdit = (review) => {
        setEditReviewSelected(review);
        setEditReviewPopup(true);
    }

    const deleteReview = async (review_id) => {
        axiosPrivate.post('/review/delete', { reviewId: review_id })
            .then(res => {
                if (res.data.result === "success")
                    setReviews(reviews.filter((review) => review.review_id !== review_id))
                else alert("Error has occured!");
            })
    }

    const editReview = async () => {
        editReviewSelected.review_rating = rating;
        editReviewSelected.review_text = textReview;

        axiosPrivate.post('/review/edit', {
            reviewId: editReviewSelected.review_id,
            reviewRating: editReviewSelected.review_rating,
            reviewText: editReviewSelected.review_text
        })
            .then(res => {
                if (res.data.result === "success") {
                    setEditReviewPopup(false);
                    editReviewSelected.review_text = textReview;
                    editReviewSelected.review_rating = rating;
                    setEditReviewSelected({});
                    setRating();
                    setTextReview("");
                }
                else alert("Something went wrong!")
            });
    }

    const ratingChanged = (newRating) => setRating(newRating);

    useEffect(() => {
        try {
            getMyReviews();
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div>
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
                    <div className="review-modal">
                        <button className="close-modal-btn" onClick={() => setEditReviewPopup(false)}>
                            X
                        </button>


                        <h2>Edit Your Review!</h2>
                        <textarea onChange={(e) => setTextReview(e.target.value)} maxLength="250"></textarea>
                        <div className='rating'>
                            <ReactStars color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={true} onChange={ratingChanged} value={rating} />
                        </div>
                        <PrimaryButton text="Submit" func={editReview} />
                    </div>
                </div>
            }
            <LeafletMap />
        </div>
    )
}

export default MyReviewsPage