import React, { useState, useEffect } from "react";
import { Card, Button, message, Space } from "antd";

const { Meta } = Card;

const LandingPage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 50000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      // Make API call to fetch duas
      const response = await fetch("https://dua-be.onrender.com/api/duas");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data. Please try again later.");
    }
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
        // Refresh data after marking dua as read
        fetchData();
      } else {
        throw new Error("Failed to mark dua as read");
      }
    } catch (error) {
      console.error("Error marking dua as read:", error);
      message.error("Failed to mark dua as read. Please try again later.");
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
