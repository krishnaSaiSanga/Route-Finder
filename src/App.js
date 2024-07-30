import { useRef } from "react";
import "./App.css";
import Home from "./Home";
import Details from "./Details";
import Places from "./Places";

function App() {
  const placesRef = useRef(null);

  const scrollToPlaces = () => {
    placesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Home scrollToPlaces={scrollToPlaces} />

      <Details />

      <div ref={placesRef} id="places">
        <Places />
      </div>
    </div>
  );
}

export default App;
