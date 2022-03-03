import React from 'react';
import NavBar from './NavBar';
import Map from './Map';
import { parkingStructuresData } from '../data/parkingStructuresData';
import QuickViewCard from './QuickViewCard';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const getSessionLoginStatus = async () => {
    const userInformation = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        credentials : "include"
    }

    const res = await fetch('http://localhost:5000/login', userInformation);
    const data = await res.json();
    console.log(data);
    if(data.loggedIn === true) {
        setLoggedInStatus(true);
    }
}

useEffect(()=> {
  getSessionLoginStatus();
},[])


  return (
    <div>
      <NavBar loggedInStatus={loggedInStatus}/>

      <div class="content-container">
          <h1>Parking Structures!</h1>
          {
            parkingStructuresData.map((structure) => {
              return (
                <QuickViewCard structure={structure} loggedInStatus={loggedInStatus} />
              )
            })
          }

      </div>
      <Map />
    </div>
  )
};

export default HomePage;
