import React from 'react';
import { useEffect, useState } from "react";


function UserLocation() {
  // Get coordinates
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      setLocation({ latitude: null, longitude: null }); // Set to a default value or handle the error.
    }
  }, []);

  // Get name place
  const [namePlace, setNamePlace] = useState(null);

  useEffect(() => {
    if (location && location.latitude !== null && location.longitude !== null) {
      const apiKey = import.meta.env.VITE_LOCATION_IQ;
      const apiUrl = `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${location.latitude}&lon=${location.longitude}&format=json`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setNamePlace(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [location]);

  return (
    <div>
      icon
      <div>{namePlace ? `${namePlace.address.state} ${namePlace.address.country}` : 'Permitenos acceder a tu ubicación'}</div>
    </div>
  );
}

export default UserLocation;
