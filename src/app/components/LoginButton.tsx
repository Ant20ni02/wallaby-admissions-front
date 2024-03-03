"use client";

import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import page from "../page.module.css"
import googleLogo from "../../../public/google-logo.png";
import Image from 'next/image';


const LoginButton = ({}) => {

    const [user, setUser] = useState<any>([]);
    const [profile, setProfile] = useState<any>([]);


    const triggerLogin = useGoogleLogin ({
        onSuccess : codeResponse => setUser(codeResponse),
        onError : (e) => console.log("Login failed: ", e)
    })

    console.log(Object.keys(user).length);

    useEffect(
        () => {
            if (Object.keys(user).length) {

                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        

    },
    [user])

    const logOut = () => {
        googleLogout();
        setProfile([]);
    };

    return (
        <>
    
            {profile!=null && (
                Object.keys(profile).length ? (
                
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
                ) : (

                    <div className={page.loginItemsWrap}>
                        <div className={page.topBand}></div>


                        <img src="https://wallaby.edu.mx/wp-content/uploads/thegem-logos/logo_4c4b74d94dc18e7b988f3224ed408701_2x.png" alt="wallabyLogo" width="200em"/>

                        <span className={page.upperText}>¿Estás preparado para comenzar el proceso de admisión?</span>
                        <span className={page.lowerText}> Inicia sesión con la cuenta que te proporcionamos y así podremos guiarte paso a paso en los procedimientos clave para la inscripción de tu pequeño</span>

                        <button onClick={() => triggerLogin()} className={page.googleLoginButton}>
                            <div style={{ paddingRight: "1em" }}>
                                <Image src={googleLogo} width="40" alt="folder" />
                            </div>

                            Iniciar sesión con Google

                        </button>
                    
                                <div className={page.bottomBand}></div>
                    </div>

                    
                            
                    )
                )
             }

        </>
    )
    
}

export default LoginButton;

