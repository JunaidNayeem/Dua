import React, { useState, useEffect } from "react";
import { Card, Button, message, Space } from "antd";

const { Meta } = Card;

const LandingPage = () => {
  const [people, setPeople] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const allowedLocations = [
    {
      name: "Saudi Arabia",
      latRange: { min: 16.5, max: 32 },
      lonRange: { min: 34.5, max: 55 },
    },
    // {
    //   name: "Bhagalpur, Bihar, India",
    //   latRange: { min: 24.0, max: 26.0 },
    //   lonRange: { min: 86.0, max: 88.0 },
    // },
  ];

  useEffect(() => {
    const fetchDataAndLocation = async () => {
      try {
        const location = await fetchUserLocation();
        setUserLocation(location);
        fetchData(location);
      } catch (error) {
        handleError(error);
      }
    };
    fetchDataAndLocation();
    const intervalId = setInterval(fetchDataAndLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error.message || "Failed to get user location.");
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const fetchData = async (location) => {
    if (isLocationAllowed(location)) {
      try {
        const response = await fetch("https://dua-be.onrender.com/api/duas");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        handleError(error);
      }
    } else {
      message.error("Access to this page is restricted at Saudi Arabia ");
      setPeople([]); // Clear people data when location is not allowed
    }
  };

  const isLocationAllowed = ({ latitude, longitude }) => {
    return allowedLocations.some(
      (location) =>
        latitude >= location.latRange.min &&
        latitude <= location.latRange.max &&
        longitude >= location.lonRange.min &&
        longitude <= location.lonRange.max
    );
  };

  const handleError = (error) => {
    console.error("Error:", error);
    message.error(
      error.message || "An error occurred. Please try again later."
    );
  };

  const handleMarkAsRead = async (id, name) => {
    try {
      const response = await fetch(
        `https://dua-be.onrender.com/api/duas/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success(`Dua of ${name} marked as read!`);
        fetchData(userLocation);
      } else {
        throw new Error("Failed to mark dua as read");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const confirmMarkAsRead = (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to mark the dua of ${name} as read?`
      )
    ) {
      handleMarkAsRead(id, name);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {people.map((person) => (
        <Card key={person.id} style={{ marginBottom: "20px" }}>
          <Meta title={person.name} description={person.message} />
          <Space style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => confirmMarkAsRead(person._id, person.name)}
            >
              Mark as Read
            </Button>
          </Space>
        </Card>
      ))}
    </div>
  );
};

export default LandingPage;
