import React from 'react';
import LeafletMap from './LeafletMap';
import { parkingStructuresData } from '../data/parkingStructuresData';
import QuickViewCard from './QuickViewCard';
import { useEffect, useState } from 'react';
import { axiosPrivate, axiosPublic } from '../api/axios';

const HomePage = () => {
  const getStructureRatings = async () => {
    axiosPublic.get('/ratings')
      .then(res => localStorage.setItem("ratings", JSON.stringify(res.data)));
  }

  useEffect(() => {
    try {
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
              <QuickViewCard key={structure.id} structure={structure} />
            )
          })
        }

      </div>
      <LeafletMap />
    </div>
  )
};

export default HomePage;
