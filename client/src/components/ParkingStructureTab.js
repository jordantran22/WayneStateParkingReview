import React from 'react';
import ReactStars from 'react-stars';

const ParkingStructureTab = ({structure}) => {
    return (
    <div className="parkingStructureTabContainer">
        <img src={structure.image} />


        <div className="parkingStructureTabInfo">
            <div className="parkingStructureTitle">Parking Structure {structure.number}</div>
            <ReactStars count={5} edit={false} value={5} size={40}/>

            <div className="parkingStructureTabLocationInfo">
                <strong>{structure.name}</strong>
                <div>{structure.address}</div>
            </div>
        
            <div className="parkingStructureTabDescription">{structure.description}</div>
            <div><span className="greenSpan">Open: </span><strong>{structure.operationHours}</strong></div>
        
        </div>
      
      
    </div>
  )
}

export default ParkingStructureTab