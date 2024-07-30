import React, { useEffect, useState } from "react";
import image from "./Images/IMG_20240727_140353.png";
const Home = ({ scrollToPlaces }) => {
  const [Image, setImage] = useState(true);
  useEffect(() => {
    const timerFunction = () => {
      setTimeout(() => {
        setImage(false);
      }, 10000);
    };
    timerFunction();
  }, []);
  return (
    <div>
      <div className="Home">
        {Image ? <img src={image} alt="" /> : ""}
        <div className="Intro">
          <div className="Intro-1">Plan your journey wisely</div>

          <div className="Intro-3" onClick={scrollToPlaces}>
            <div className="Intro-3-button">Get started</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
