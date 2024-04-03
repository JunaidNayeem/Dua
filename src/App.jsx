import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dua from "./components/dua";
import MakeDua from "./components/requestDua";
import Landing from "./components/landing";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dua" element={<Dua />} />
          <Route path="/makedua" element={<MakeDua />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
