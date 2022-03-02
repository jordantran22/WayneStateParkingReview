import React from 'react';
import ReactStars from 'react-stars';

const DetailCard = ({ parkingStructureInfo }) => {
    return (
        <div className="detail-card">
            <div class="detail-card__info">
                <h1>{parkingStructureInfo.name}</h1>
                <div className='detail-card__review-count'>
                    <ReactStars count={5} edit={false} value={5} size={40} />
                    <span>58 reviews</span> {/* static placeholder */}
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