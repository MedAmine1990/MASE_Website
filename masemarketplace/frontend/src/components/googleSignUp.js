import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { Button,Image} from 'semantic-ui-react'
import googleicon from '/static/images/googleIcon.png';
import axios from 'axios';

export default function Login()
{

    
    const googleLogin = useGoogleLogin({
    onSuccess:  codeResponse => {
                console.log(codeResponse.code);
                axios.post('googleauth/getuserdata', {
                                code:codeResponse.code
                }).then(res =>{
                        if(res.data.error!=null)
                        {
                                console.log(res.data.error)
                                data.message=res.data.error
                        }
                        else
                        {
                                console.log('success')
                                console.log(res.data)
                                axios.post('usermanagement/createuser', {
                                        useremail:res.data.email,
                                        username:res.data.email,
                                        password:null,
                                        source:'GoogleAuth'
                                }).then(res =>{
                                        if(res.data.error!=null)
                                        {
                                                console.log(res.data.error)
                                        }
                                        else
                                        {
                                                console.log('success')
                                        }
                                })
                        }

                });
    },
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
                                        <Image src={googleicon} verticalAlign='bottom' />{' '}
                                        <span>Sign in with Google</span>
                                </div>
                        </Button>
                    
            ) 

       /* return (<GoogleLogin
                        onClick={() => console.log('click')}
                        />
                ) */
}



