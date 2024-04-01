import React from "react";
import { Select, Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Kabba from "/dua.png";

const { Option } = Select;

export default function Landing() {
  const navigate = useNavigate();

  const handleChange = (value) => {
    if (value === "I am at Kabba") {
      navigate("/dua");
    } else {
      navigate("/makedua");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const value = formData.get("option");
    handleChange(value);
  };

  return (
    <Flex justify="center" align="center" vertical>
      <h1>Dua</h1>
      <img className="hover-img" src={Kabba} alt="" />
      <form style={{ width: "100%", marginTop: "20%" }} onSubmit={handleSubmit}>
        <Select
          name="option"
          style={{ width: "100%", marginBottom: "20px" }}
          placeholder="Select an option"
          onChange={handleChange}
        >
          <Option value="I am at Kabba">I am at Kabba</Option>
          <Option value="I want to make dua at Kabba">
            I want to make dua at Kabba
          </Option>
        </Select>
      </form>
      <div style={{ fontFamily: "cursive", textAlign: "center" }}>
        Please feel free to share your prayers and wishes with us, and we will
        do our utmost to deliver them to the Kaaba, the House of Allah. May
        Allah answer all your prayers with His mercy and grace. آمين (Ameen).
      </div>
    </Flex>
  );
}
