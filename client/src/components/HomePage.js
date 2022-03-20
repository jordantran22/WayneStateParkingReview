import React from 'react';
import NavBar from './NavBar';
import LeafletMap from './LeafletMap';
import { parkingStructuresData } from '../data/parkingStructuresData';
import QuickViewCard from './QuickViewCard';
import { useEffect, useState } from 'react';
import { axiosPrivate, axiosPublic } from '../api/axios';

const HomePage = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  
  const getSessionLoginStatus = async () => {
    axiosPrivate.get('/login')
      .then(res => res.data.loggedIn === true ? setLoggedInStatus(true) : setLoggedInStatus(false));
  }

  const getStructureRatings = async () => {
    axiosPublic.get('/ratings')
      .then(res => localStorage.setItem("ratings", JSON.stringify(res.data)));
  }

  useEffect(() => {
    try {
      getSessionLoginStatus();
      getStructureRatings();
    } catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <div>
      <NavBar loggedInStatus={loggedInStatus} />

      <div className="content-container">
        <h1>Parking Structures!</h1>
        {
          parkingStructuresData.map((structure) => {
            return (
              <QuickViewCard key={structure.id} structure={structure} loggedInStatus={loggedInStatus} />
            )
          })
        }

      </div>
      <LeafletMap />
    </div>
  )
};

export default HomePage;
