import React from 'react';
import ReactStars from 'react-stars';

const DetailCard = ({ parkingStructureInfo, totalReviews, structureRate }) => {
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