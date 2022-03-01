import React from 'react';
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router';

const ParkingStructureDetailCard = ({ parkingStructureInfo }) => {
    return (
        <div className="parkingStructureDetailCard">
            <div class="structure-details">
                <h1>{parkingStructureInfo.name}</h1>
                <div className='review-count'>
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
            <div class="structure-hours">
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

export default ParkingStructureDetailCard