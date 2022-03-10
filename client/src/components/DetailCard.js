import React from 'react';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';

const DetailCard = ({ parkingStructureInfo, totalReviews, structureRate }) => {
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
        <div className="detail-card">
            <div class="detail-card__info">
                <h1>{parkingStructureInfo.name}</h1>
                <div className='detail-card__review-count'>
                    <ReactStars count={5} edit={false} value={structureRate} size={40} />
                    <span>{totalReviews} reviews</span> {/* static placeholder */}
                </div>
                <a href="https://goo.gl/maps/MCUmvVbq1EpstMFc7" target="_blank">
                    <img src={parkingStructureInfo.image} />
                </a>
                <a href="https://goo.gl/maps/MCUmvVbq1EpstMFc7" target="_blank">
                    {parkingStructureInfo.address}
                </a>
            </div>
            <div class="detail-card__hours">
                <span>Mon: </span>
                <span>Tue: </span>
                <span>Wed: </span>
                <span>Thu: </span>
                <span>Fri: </span>
                <span>Sat: </span>
                <span>Sun: </span>
            </div>
        </div>

    )
}

export default DetailCard