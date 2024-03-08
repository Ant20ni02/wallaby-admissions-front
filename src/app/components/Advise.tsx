import React, { useState } from "react";
import "./Advise.css";

interface AdviseProps{
  message: string;
}

const AdviseAdmin: React.FC <AdviseProps> = ({message}) => {
  return (
    <div className="card">
      <div className="bg">
        <p className="text">{message}</p>
      </div>
      <div className="blob"></div>
    </div>
  );
};

export default AdviseAdmin;
