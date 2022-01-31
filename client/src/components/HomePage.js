import React from 'react';
import NavBar from './NavBar';
import Map from './Map';

const HomePage = () => {
  return (
    <div className="homepage">
        <NavBar />

        <div className="homepageContainer">
          <Map />
        </div>
    </div>
  )
};

export default HomePage;
