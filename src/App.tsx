import "./App.css";
import Intro from "./components/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Destination from "./components/Destination";
import { useStateContext } from "./Context/StateProvider";
import MobileNav from "./components/MobileNav";
import Crew from "./components/Crew";
import Technology from "./components/Technology";
import { AnimatePresence } from "framer-motion";

function App() {
  const { showNav } = useStateContext();
  return (
    <div className="app text-white relative">
      <BrowserRouter>
        {showNav && (
          <div className="absolute top-0 right-0 z-10">
            <MobileNav />
          </div>
        )}
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/technology" element={<Technology />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
