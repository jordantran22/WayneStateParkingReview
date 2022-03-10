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
            </div>
            <div className="detail-card">
                <div class="detail-card__info">
                    <a href="https://goo.gl/maps/MCUmvVbq1EpstMFc7" target="_blank">
                        <img src={parkingStructureInfo.image} />
                    </a>
                    <a href="https://goo.gl/maps/MCUmvVbq1EpstMFc7" target="_blank" className='nowrap-ellipsis'>
                        {parkingStructureInfo.name}<br />
                        {parkingStructureInfo.address}
                    </a>
                </div>
                <table class="detail-card__hours">
                    <tr>
                        <th className='current-day'>Mon</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td className='green-span'>Open</td>
                    </tr>
                    <tr>
                        <th>Tue</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Wed</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Thu</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Fri</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Sat</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Sun</th>
                        <td>12:00 a.m. - 12:00 a.m.</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>

    )
}

export default DetailCard