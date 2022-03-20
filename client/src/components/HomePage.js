import React from 'react';
import NavBar from './NavBar';
import LeafletMap from './LeafletMap';
import { parkingStructuresData } from '../data/parkingStructuresData';
import QuickViewCard from './QuickViewCard';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const getSessionLoginStatus = async () => {
    const userInformation = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      credentials: "include"
    }

    fetch('http://localhost:5000/login', userInformation)
      .then(res => res.json())
      .then(data => (data.loggedIn === true) ? setLoggedInStatus(true) : setLoggedInStatus(false));
  }

  const getStructureRatings = async () => {
    const requestInfo = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }

    fetch('http://localhost:5000/ratings', requestInfo)
      .then(res => res.json())
      .then(data => localStorage.setItem("ratings", JSON.stringify(data)));
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
