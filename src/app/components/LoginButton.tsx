"use client";

import { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const LoginButton = ({}) => {

    return (
    
        <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) => {

                if (credentialResponse.credential != undefined) {
                    const decodedCredentials = jwtDecode(credentialResponse.credential);
                    console.log(decodedCredentials);

                }
            }}

            onError={() => {
                console.log("Login Failed");
            }}

        />
    )
    
}

export default LoginButton;

