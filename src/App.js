import "./App.css";
import Intro from "./components/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Destination from "./components/Destination";
import { useStateContext } from "./Context/StateProvider";
import MobileNav from "./components/MobileNav";
import Crew from "./components/Crew";
import Technology from "./components/Technology";
import { CSSTransition } from "react-transition-group";

function App() {

  const routes = [
    { path: "/", name: 'Intro', Element: Intro },
    { path: "/destination", name: 'Destination', Element: Destination },
    { path: "/crew", name: 'Crew', Element: Crew },
    { path: "/technology", name: 'Technology', Element: Technology },
  ];
  const { showNav } = useStateContext();
  return (
    <div className="app text-white relative">
      <BrowserRouter>
        {showNav && (
          <div className="absolute top-0 right-0 z-10">
            <MobileNav />
          </div>
        )}

        <Routes>


          {routes.map(({ path, Element }) => (
            <Route key={path} exact path={path} element={<Element />} >
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames=""
                  unmountOnExit
                >
                  <Element />
                  {/* <div className="">
                    <Element />
                  </div> */}
                </CSSTransition>
              )}
            </Route>
          ))}
        </Routes>

        {/* <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
