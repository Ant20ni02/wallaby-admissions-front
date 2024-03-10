"use client";

import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import page from "../page.module.css";
import googleLogo from "../../../public/google-logo.png";
import Image from "next/image";
import Loading from "./SunLoader/SunLoader";
import { useRouter } from "next/navigation";

const LoginButton = ({}) => {
  const router = useRouter();

  const [user, setUser] = useState<any>([]);
  const [profile, setProfile] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const triggerLogin = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: (e) => console.log("Login failed: ", e)
    })

  useEffect(() => {
    if (Object.keys(user).length) {
        setLoading(true);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.hd === "tec.mx") {
            //HARDCODED TO TEC, NEED TO CHANGE IT TO WALLABY
            axios
              .get(`/api/checkForAdmin/${res.data.email}`)
              .then((adminRes) => {

                if (adminRes.data.index === 0) {
                  axios
                    .get(`/api/getRowByEmail/${res.data.email}`)
                    .then((res2) => {

                      if(res2.data.row[33] === 'INSCRITO'){
                        setLoading(false);
                        router.replace("/admissionOnly");
                      }
                      else{
                        setProfile(res.data);
                        localStorage.setItem("email", res.data.email);
                        localStorage.setItem("name", `${res.data.given_name} ${res.data.family_name}`)
                        localStorage.setItem("hd", res.data.hd);
                        localStorage.setItem("index", res2.data.index);
                        localStorage.setItem("status", res2.data.row[33]);
                        setLoading(false);
                        router.push("/Timeline");
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                      router.replace('/admissionOnly');
                    });
                } else {
                  //ROUTE TO ADMIN INTERFACE
                  localStorage.setItem("email", res.data.email);
                  router.replace("/admin");
                }
              })
              .catch((e) => console.log(e));
          } else {
            //router to hd incorrect page
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile([]);
  };

  return (
    <>
      <div className={page.loginItemsWrap}>
        <div className={page.topBand}></div>

        <img
          src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png"
          alt="wallabyLogo"
          width="200em"
        />

        <span className={page.upperText}>
          ¿Estás preparado para comenzar el proceso de admisión?
        </span>
        <span className={page.lowerText}>
          {" "}
          Inicia sesión con la cuenta que te proporcionamos y así podremos
          guiarte paso a paso en los procedimientos clave para la inscripción de
          tu pequeño
        </span>

        <button
          onClick={() => triggerLogin()}
          className={page.googleLoginButton}
        >
          <div style={{ paddingRight: "1em" }}>
            <Image src={googleLogo} width="40" alt="folder" />
          </div>
          Iniciar sesión con Google
        </button>

        <div className={page.bottomBand}></div>
        {loading && <Loading />}
      </div>
    </>
  );
};

export default LoginButton;
