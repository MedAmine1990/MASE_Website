import React, {useState} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { Button,Image} from 'semantic-ui-react'
import googleicon from '/static/images/googleIcon.png';
import axios from 'axios';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";

async function GoogleSignup(codeResponse)
{
                var createUserEmail="";
                //console.log(codeResponse.code);
                var data = {
                        result: false,
                        message:'No google auth performed by user'
                        }
                await axios.post('googleauth/getuserdata', {
                                code:codeResponse.code
                }).then(async res =>{
                        if(res.data.error!=null)
                        {
                                //console.log(res.data.error)
                                data.message=res.data.error
                        }
                        else
                        {
                                //console.log('success')
                                //console.log(res.data)
                                createUserEmail=res.data.email
                                await axios.post('usermanagement/createuser', {
                                        useremail:res.data.email,
                                        username:res.data.email,
                                        password:null,
                                        source:'GoogleAuth'
                                }).then(async res =>{
                                        if(res.data.error!=null)
                                        {
                                                //console.log(res.data.error)
                                                data.message=res.data.error
                                                if (res.data.error=='username already exists.' || res.data.error=='user email already exists.')
                                                {
                                                        await axios.post('usermanagement/googleloginuser',{
                                                                useremail:createUserEmail
                                                        }).then(res => {
                                                                if(res.data.error!=null)
                                                                {
                                                                        data.message='An error happenend while logging you in.'
                                                                        data.result=false
                                                                }
                                                                else
                                                                {
                                                                        data.message='You are successfully logged in. Welcome back !'
                                                                        data.result=true
                                                                }
                                                        })
                                                        
                                                }
                                        }
                                        else
                                        {
                                                //console.log('success')
                                                data.message='You are successfully logged in with google. You can add your user details later on.'
                                                data.result=true
                                        }
                                })
                        }

                });
                return data;
}

export default function Login()
{
        const [state, dispatch] = React.useReducer(exampleReducer, {
                open: false,
                dimmer: undefined,
                message:'',
                title:'',
                redirect:''
        })
        const { open, dimmer, message, title, redirect} = state
    
    const googleLogin = useGoogleLogin({
    onSuccess: async  codeResponse => {var signupResult=await GoogleSignup(codeResponse); 
    //console.log("GoogleAuthResult:"+signupResult.message);
    if (!signupResult.result) 
        {
                dispatch({ 
                                type: 'OPEN_MODAL',
                                dimmer: 'blurring', 
                                message:signupResult.message,
                                title:'Signup error',
                                redirect:''
                        })
        }
        else
        {
                dispatch({ 
                                type: 'OPEN_MODAL',
                                dimmer: 'blurring', 
                                message:signupResult.message,
                                title:'Signup success !',
                                redirect:'/'
                         })
        }},
                flow: 'auth-code',
    });

    return   (
                        <div>
                         <ModalComponent  
                                dimmer={dimmer}
                                open={open}
                                message={message}
                                title={title}
                                redirect={redirect}>
                        </ModalComponent>
                                <Button color="standard" 
                                        style={{width:'100%'}} 
                                        icon='google'
                                        onClick={() => googleLogin()} 
                                        size='large'
                                        content='Continue with Google' 
                                        >
                                        <div>
                                                <Image src={googleicon} verticalAlign='bottom' />{' '}
                                                <span>Continue with Google</span>
                                        </div>
                                </Button>
                        </div>
                    
            ) 

       /* return (<GoogleLogin
                        onClick={() => //console.log('click')}
                        />
                ) */
}



