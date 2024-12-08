import React from "react";
import "./AnimatedEarth.css";
interface AnimatedEarthProps extends React.HTMLProps<HTMLDivElement> {
  }
const AnimatedEarth: React.FC<AnimatedEarthProps> = (props) => {
  return (
    <div {...props} className="earth-container">
    <div className="planet-container">
      <div className="night"></div>
      <div className="day"></div>
      <div className="clouds"></div>
      <div className="inner-shadow"></div>
    </div>
  </div>
  );
};

export default AnimatedEarth;
