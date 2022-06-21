import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { Button,Image} from 'semantic-ui-react'
import googleicon from '/static/images/googleIcon.png';
import axios from 'axios';


async function GoogleSignin(codeResponse)
{
    var data = {
                    result: false,
                    message:'No google auth performed by user'
                }
    await axios.post('googleauth/getuserdata', {
                                code:codeResponse.code
                })
}


export default function googleSignIn()
{
    const googleLogin = useGoogleLogin({ onSuccess: codeResponse =>})
}