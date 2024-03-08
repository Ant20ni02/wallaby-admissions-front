import React, { useState } from "react";
import "./NoData.css";

const NoDataAdmin = () => {
  return (
    <div className="card">
      <div className="bg">
        <p className="text">Realiza una búsqueda válida del correo electrónico para ver la información referente.</p>
      </div>
      <div className="blob"></div>
    </div>
  );
};

export default NoDataAdmin;
