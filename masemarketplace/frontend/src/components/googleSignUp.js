import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export default function Login()
{
   return (
                    <GoogleOAuthProvider clientId="28065806720-mr4ejasfu9plel4ff1b8g423masltllb.apps.googleusercontent.com" >
                        <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        />
                    </GoogleOAuthProvider>
) 
}



