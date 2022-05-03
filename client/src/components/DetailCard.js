import React from 'react';
import ReactStars from 'react-stars';
import { useEffect } from 'react';


const DetailCard = ({ parkingStructureInfo, totalReviews, structureRate }) => {
    useEffect(() => {
       // console.log(structureRate);
    }, [structureRate]);

    //console.log(parkingStructureInfo);
    const date = new Date();
    const day = date.getDay();
   // const day = 0;
    return (
        <div key={parkingStructureInfo.name}>
            <h1>{parkingStructureInfo.name}</h1>
            <div className='rating'>
                <ReactStars color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={false} value={structureRate} />
                <span>{totalReviews} reviews</span>
            </div>
            <div className="detail-card">
                <div className="detail-card__info">
                    <a href="https://goo.gl/maps/MCUmvVbq1EpstMFc7" target="_blank">
                        <img src={parkingStructureInfo.image} />
                    </a>
                    <a href="https://goo.gl/maps/MCUmvVbq1EpstMFc7" target="_blank" className='nowrap-ellipsis'>
                        {parkingStructureInfo.name}<br />
                        {parkingStructureInfo.address}
                    </a>
                </div>
                <table className="detail-card__hours">
                    <tbody>
                        <tr>
                            <th className='current-day'>Mon</th>
                            <td>{parkingStructureInfo.hours.monday}</td>
                            {
                                day == 1 && parkingStructureInfo.hours.monday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                        <tr>
                            <th>Tue</th>
                            <td>{parkingStructureInfo.hours.tuesday}</td>
                            <td></td>
                            {
                                day == 2 && parkingStructureInfo.hours.tuesday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                        <tr>
                            <th>Wed</th>
                            <td>{parkingStructureInfo.hours.wednesday}</td>
                            <td></td>
                            {
                                day == 3 && parkingStructureInfo.hours.wednesday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                        <tr>
                            <th>Thu</th>
                            <td>{parkingStructureInfo.hours.thursday}</td>
                            <td></td>
                            {
                                day == 4 && parkingStructureInfo.hours.thursday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                        <tr>
                            <th>Fri</th>
                            <td>{parkingStructureInfo.hours.friday}</td>
                            <td></td>
                            {
                                day == 5 && parkingStructureInfo.hours.friday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                        <tr>
                            <th>Sat</th>
                            <td>{parkingStructureInfo.hours.saturday}</td>
                            <td></td>
                            {
                                day == 6 && parkingStructureInfo.hours.saturday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                        <tr>
                            <th>Sun</th>
                            <td>{parkingStructureInfo.hours.sunday}</td>
                            <td></td>
                            {
                                day == 0 && parkingStructureInfo.hours.sunday !== "Closed" &&
                                <td className='green-span'>Open</td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailCard