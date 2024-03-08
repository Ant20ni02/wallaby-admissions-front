"use client";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import "./not-found.css";
import Sun from "../../public/sad-sun.png"
import './favicon.ico'
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="body">
      <div className="topBar"></div>
      <div className="centralElements">
        <div className="four">
        <Image
          className="sun"
          src={Sun}
          width={170}
          height={170}
          alt="solecito"
        />
        <div className="border"></div>
        <h1 className="fourofour">404</h1>
        </div>   
        <p className="text">
          No pudimos encontrar la página que estás buscando, por favor intenta
          de nuevo.
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
