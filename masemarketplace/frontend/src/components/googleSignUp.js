import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { Button,Image} from 'semantic-ui-react'
import googleicon from '/static/images/googleIcon.png';

export default function Login()
{

    
    const googleLogin = useGoogleLogin({
    onSuccess:  codeResponse => console.log(codeResponse),
                flow: 'auth-code',
    });

    return   (
                   
                        <Button color="standard" 
                                style={{width:'100%'}} 
                                icon='google'
                                onClick={() => googleLogin()} 
                                size='large'
                                content='Sign in with Google' 
                                >
                                <div>
                                        <Image src={googleicon} avatar />{' '}
                                        <span>Sign in with Google</span>
                                </div>
                        </Button>
                    
            ) 

       /* return (<GoogleLogin
                        onClick={() => console.log('click')}
                        />
                ) */
}



