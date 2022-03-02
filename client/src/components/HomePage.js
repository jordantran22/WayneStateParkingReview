import React from 'react';
import NavBar from './NavBar';
import Map from './Map';
import { parkingStructuresData } from '../data/parkingStructuresData';
import QuickViewCard from './QuickViewCard';

const HomePage = () => {
  return (
    <div>
      <NavBar />

      <div class="content-container">
          <h1>Parking Structures!</h1>
          {
            parkingStructuresData.map((structure) => {
              return (
                <QuickViewCard structure={structure} />
              )
            })
          }

      </div>
      <Map />
    </div>
  )
};

export default HomePage;
