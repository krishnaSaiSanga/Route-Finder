import React from "react";
import Places from "./Places";

const matter = () => {
  return (
    <div>
      <div className="matter">
        <div className="matter-headding">Route Planner</div>
        <div className="matter-footer">
          <div className="matter-steps">
            <h1>About :</h1>
            <p className="steps-points">
              Welcome to our innovative route planning website designed to help
              you find the shortest and most fuel-efficient routes. Whether
              you're planning a road trip, running errands, or managing
              deliveries, our tool ensures you cover all your destinations in
              the most optimal way possible.
            </p>
            <h1>Steps :</h1>
            <div className="steps-points">
              1. Make a list of places that you would like to visit.
            </div>
            <div className="steps-points">
              2. Enter the starting point(the place from where you are about to
              start).
            </div>
            <div className="steps-points">3. Enter all the other places</div>
            <div className="steps-points">4. Click on Find Route button</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default matter;
