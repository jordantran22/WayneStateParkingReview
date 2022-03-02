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
                <div className="quick-view-card__title">Parking Structure {structure.number}</div>
                <ReactStars count={5} edit={false} value={5} size={40} />

                <div className="quick-view-card__address">
                    <strong>{structure.name}</strong>
                    <div>{structure.address}</div>
                </div>

                <div className="quick-view-card__description">{structure.description}</div>
                <div><span className="greenSpan">Open: </span><strong>{structure.operationHours}</strong></div>

            </div>

        </div>
    )
}

export default QuickViewCard