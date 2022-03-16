import React from 'react'
import Navbar from './NavBar';
import { useLocation } from 'react-router-dom'
import LeafletMap from './LeafletMap';
import ReviewCard from './ReviewCard';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

const MyReviewsPage = () => {
    const location = useLocation();
    const [userId, setUserId] = useState();
    const [reviews, setReviews] = useState([]);
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
                            <div>
                                <h2>
                                   { review.structure_name }
                                </h2>
                                <ReviewCard key={review.review_id} review={review} />
                            </div>
                        )
                    })
                }
            </div>
            <LeafletMap />
        </div>
    )
}

export default MyReviewsPage