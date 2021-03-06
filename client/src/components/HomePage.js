import React from 'react';
import NavBar from './NavBar';
import LeafletMap from './LeafletMap';
import { parkingStructuresData } from '../data/parkingStructuresData';
import QuickViewCard from './QuickViewCard';
import { useEffect, useState } from 'react';
import { URL } from '../data/APIurl';

const HomePage = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [structureRatings, setStructureRatings] = useState([]);
  const [structure1, setStructure1] = useState();

  const getSessionLoginStatus = async () => {
    const userInformation = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
      credentials: "include"
    }

    const res = await fetch(`${URL}/login`, userInformation);
    const data = await res.json();
    if (data.loggedIn === true) {
      setLoggedInStatus(true);
    } else {
      setLoggedInStatus(false);
    }
  }

  const getStructureRatings = async () => {
    const requestInfo = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
    }

    const res = await fetch(`${URL}/ratings`, requestInfo);
    const data = await res.json();
    localStorage.setItem("ratings", JSON.stringify(data));
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
