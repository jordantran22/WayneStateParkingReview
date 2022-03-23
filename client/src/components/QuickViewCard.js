import React from 'react';
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react';

const QuickViewCard = ({ structure, loggedInStatus }) => {
    let navigate = useNavigate();
    const [structureRate, setStructureRate] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    const navigateToStructureDetailsPage = () => {
        navigate(`/StructureDetailsPage/${structure.number}`, {
            // state: {
            //     structure: structure,
            //     loggedInStatus: loggedInStatus,
            //     structureRate: structureRate,
            //     totalReviews: totalReviews
            // }
        });
    }

    const getStructureRating = () => {
        const structureRatings = localStorage.getItem("ratings");
        const JSONArrayRatings = JSON.parse(structureRatings);
        //console.log(JSON.parse(structureRatings));

        JSONArrayRatings.map((structureRating) => {
            if (structure.number == structureRating.parking_structure_id) {
                setStructureRate(structureRating.rating);
                setTotalReviews(structureRating.total_reviews);
                return;
            }
        })
    }

    useEffect(() => {
        try {
            getStructureRating();
        } catch (e) {
            console.log(e);
        }
    }, [structureRate]);

    return (
        <button className="quick-view-card hoverable-card" onClick={() => navigateToStructureDetailsPage()}>
            <img src={structure.image} />
            <div className="quick-view-card__info">
                <h2>Parking Structure {structure.number}</h2>
                <div className='quick-view-card__subhead nowrap-ellipsis'>
                    {structure.name}<br />{structure.address}
                </div>
                <div className='rating'>
                    <ReactStars color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={false} value={structureRate} />
                    <span className='rating__count'>{totalReviews}</span>
                </div>
                <div className="quick-view-card__description nowrap-ellipsis">{structure.description}</div>
                <div className='quick-view-card__hours nowrap-ellipsis'><span className="green-span">Open: </span>{structure.operationHours}</div>
            </div>
        </button>
    )
}

export default QuickViewCard