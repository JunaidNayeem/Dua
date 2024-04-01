import React, { useState } from "react";
import { Input, Button, message } from "antd";

const MakeDuaPage = () => {
  const [name, setName] = useState("");
  const [dua, setDua] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDuaChange = (e) => {
    setDua(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make API call to submit dua
      const response = await fetch("https://dua-be.onrender.com/api/duas", {
        // Updated endpoint URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message: dua }), // Adjusted dua property name
      });

      if (response.ok) {
        message.success("Dua submitted successfully!");
        // Reset form fields
        setName("");
        setDua("");
      } else {
        message.error("Failed to submit dua. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting dua:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Make Dua at Kabba</h1>
      <Input
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
        style={{ marginBottom: "20px" }}
      />
      <Input.TextArea
        placeholder="Write down your dua..."
        value={dua}
        onChange={handleDuaChange}
        rows={4}
        style={{ marginBottom: "20px" }}
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit Dua
      </Button>
      <div
        style={{
          fontFamily: "cursive",
          textAlign: "center",
          marginBlock: "20%",
        }}
      >
        As Muslims, we endeavor to convey your heartfelt messages to Allah's
        sacred home, the Kaaba. إن شاء الله (Insha'Allah), may Allah accept all
        your supplications and bestow upon you His blessings. آمين (Ameen).
      </div>
    </div>
  );
};

export default MakeDuaPage;