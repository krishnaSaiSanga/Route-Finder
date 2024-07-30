import { useRef, Suspense, lazy } from "react";
import "./App.css";

const Home = lazy(() => import("./Home"));
const Details = lazy(() => import("./Details"));
const Places = lazy(() => import("./Places"));

function App() {
  const placesRef = useRef(null);

  const scrollToPlaces = () => {
    placesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Home scrollToPlaces={scrollToPlaces} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Details />
      </Suspense>
      <div ref={placesRef} id="places">
        <Suspense fallback={<div>Loading...</div>}>
          <Places />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
