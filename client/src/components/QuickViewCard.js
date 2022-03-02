import React from 'react';
import ReactStars from 'react-stars';
import { useNavigate } from 'react-router'

const QuickViewCard = ({ structure }) => {
    let navigate = useNavigate();

    const navigateToStructureDetailsPage = () => {
        navigate('/StructureDetailsPage', { state: structure });
    }

    return (
        <div className="quick-view-card" onClick={() => navigateToStructureDetailsPage()}>
            <img src={structure.image} />
            <div className="quick-view-card__info">
                <h2>Parking Structure {structure.number}</h2>
                <div className='quick-view-card__subhead nowrap-ellipsis'>
                    {structure.name}<br />{structure.address}
                </div>
                <ReactStars className={"rating"} color2={"#FDC741"} color1={"#E5E5E5"} count={5} size={30} edit={false} value={4.5} />
                <div className="quick-view-card__description nowrap-ellipsis">{structure.description}</div>
                <div className='quick-view-card__hours'><span className="greenSpan">Open: </span>{structure.operationHours}</div>
            </div>
        </div>
    )
}

export default QuickViewCard