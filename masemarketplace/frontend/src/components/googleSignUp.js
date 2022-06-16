import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { Button} from 'semantic-ui-react'

export default function Login()
{

    
    const googleLogin = useGoogleLogin({
    onSuccess:  codeResponse => console.log(codeResponse),
                flow: 'auth-code',
    });

    return   (
                   
                        <Button color="standard" onClick={() => googleLogin()}>
                                Sign in with Google 🚀{' '}
                        </Button>
                    
            ) 

       /* return (<GoogleLogin
                        onClick={() => console.log('click')}
                        />
                ) */
}



