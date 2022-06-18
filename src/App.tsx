import React from "react";
import "./App.css";
import Header from "./components/Header";
import Intro from "./components/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app text-white">
      {/* <Header /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
