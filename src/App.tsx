import React from "react";
import "./App.css";
import Intro from "./components/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Destination from "./components/Destination/Destination";
import { useStateContext } from "./Context/StateProvider";
import MobileNav from "./components/MobileNav";

function App() {
  const { showNav } = useStateContext();
  return (
    <div className="app text-white relative">
      {/* <Header /> */}

      <BrowserRouter>
        {showNav && (
          <div className="absolute top-0 right-0 z-10">
            <MobileNav />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/destination" element={<Destination />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
