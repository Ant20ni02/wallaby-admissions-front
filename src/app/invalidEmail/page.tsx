"use client";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import "./invalidEmail.css";

export default function admissionOnly() {
  return (
    <div className="body">
      <div className="topBar"></div>
      <div className="centralElements">
        <p className="text">
          El correo con el que ingresaste no es válido. Por favor contacta a tu
          asesor(a) de Wallaby para que te proporcione uno
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
