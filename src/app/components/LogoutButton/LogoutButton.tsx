"use client";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import "./LogoutButton.css";

export default function LogoutButton() {
  const router = useRouter();

  const logOut = () => {
    router.replace("/");
    localStorage.clear();
    googleLogout();
  };

  return (
      <FontAwesomeIcon icon={faRightFromBracket } onClick={() => logOut()} className="logout"/>
  );
}
