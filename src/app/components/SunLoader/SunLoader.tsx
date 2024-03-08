import React from "react";
import "./SunLoader.css"; // Asegúrate de tener el archivo CSS correspondiente

const SunLoader = () => {
  return (
    <div ng-app="sun-loader">
      <div className="custom-spinner">
        <div className="overlay"></div>
        <div className="sun-loader">
          <div className="sun"></div>
          <div className="rays">
            <div className="ray ray1"></div>
            <div className="ray ray2"></div>
            <div className="ray ray3"></div>
            <div className="ray ray4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunLoader;
