import React from 'react';
import NavBar from './NavBar';
import Map from './Map';
import { parkingStructuresData } from '../data/parkingStructuresData';
import ParkingStructureTab from './ParkingStructureTab';

const HomePage = () => {
  return (
    <div className="homepage">
        <NavBar />
    
        <div className="homepageContainer">

          <div className="parkingStructuresContainer">
            {
              parkingStructuresData.map((structure) => {
                console.log(structure);
                return(
                  <ParkingStructureTab structure={structure}/>
                )
              })
            }
          </div>


          <Map />
        </div>
    </div>
  )
};

export default HomePage;
