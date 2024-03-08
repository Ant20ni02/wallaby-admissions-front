"use client";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import "./admissionOnly.css";

export default function admissionOnly() {
  return (
    <div className="body">
      <div className="topBar"></div>
      <div className="centralElements">
        <p className="text">
          Esta página está dedicada exclusivamente a tu proceso de admisión
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
