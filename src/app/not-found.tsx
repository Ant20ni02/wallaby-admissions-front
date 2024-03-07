"use client";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import "./not-found.css";
import Sun from "../../public/sun-state2.png"
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="body">
      <div className="topBar"></div>
      <div className="centralElements">
        <div>
          </div>        
        <Image
          src={Sun}
          width={100}
          height={100}
          alt="solecito"
        />
        <h1 className="fourofour">404</h1>
        <p className="text">
          No pudimos encontrar la página que estás buscando, por favor intenta
          de nuevo.
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
