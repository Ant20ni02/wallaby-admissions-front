"use client";
import { useRouter } from "next/navigation";
import "./LogoutButton.css";

export default function LogoutButton() {
  const router = useRouter();

  const logOut = () => {
    router.replace("/");
    localStorage.clear();
  };

  return (
    <button className="logout" onClick={() => logOut()}>
      Salir
    </button>
  );
}
