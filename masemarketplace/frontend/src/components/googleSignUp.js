import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { Button,Image} from 'semantic-ui-react'

export default function Login()
{

    
    const googleLogin = useGoogleLogin({
    onSuccess:  codeResponse => console.log(codeResponse),
                flow: 'auth-code',
    });

    return   (
                   
                        <Button color="blue" 
                                style={{width:'100%'}} 
                                icon='google'
                                onClick={() => googleLogin()} 
                                size='large'
                                content='Sign in with Google' 
                                ><Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' /> Sign in with google
                                
                        </Button>
                    
            ) 

       /* return (<GoogleLogin
                        onClick={() => console.log('click')}
                        />
                ) */
}



