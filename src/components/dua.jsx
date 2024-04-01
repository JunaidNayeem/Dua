import React, { useState, useEffect } from "react";
import { Card, Button, message, Space } from "antd";

const { Meta } = Card;

const LandingPage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make API call to fetch duas
      const response = await fetch("https://dua-be.onrender.com/api/duas"); // Update URL with your backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPeople(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show message, etc.
      message.error("Failed to fetch data. Please try again later.");
    }
  };

  const handleMarkAsRead = (name) => {
    // Logic to mark dua as read
    message.success(`Dua of ${name} marked as read!`);
    // You can implement logic here to update the state or send a request to your backend
  };

  return (
    <div style={{ padding: "20px" }}>
      {people.map((person) => (
        <Card key={person.id} style={{ marginBottom: "20px" }}>
          <Meta title={person.name} description={person.message} />
          <Space style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => handleMarkAsRead(person.name)}
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
