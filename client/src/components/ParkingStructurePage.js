import React from 'react'
import { useLocation } from 'react-router-dom'

const ParkingStructurePage = () => {
  const location = useLocation();
  console.log(location.state);
  const parkingStructureInfo = location.state;
  console.log(parkingStructureInfo);

  return (
    <div>ParkingStructurePage</div>
  )
}

export default ParkingStructurePage