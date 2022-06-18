//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import axios from 'axios';

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";
import Login from "./googleSignUp.js"
import { GoogleOAuthProvider } from '@react-oauth/google';

async function controlFields(values)
{
    var data = {
        result: false,
        message:'User input verficiation not executed'
    }
    //#region test empty fields
    for(let i=0; i<values.length; i++)
    {
        if(values[i]=='')
        {
            data.message='One of the fields is missing for your signup !'
            return data
        }
        
            /*dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })*/
    }
    //#endregion
    //#region test email format
    var emailSplits=values[0].split('@')
    if (emailSplits.length!=2)
    {
        console.log('aa')
        data.message='The email you set does not have an email format.'
        return data
    }
    else
    {
        if(!emailSplits[1].includes('.'))
        {
                data.message='The email you set does not have an email format.'
                return data
        }
        else
        {
            console.log(emailSplits[1].split('.').length);
            if(emailSplits[1].split('.')[1].length==0)
            {
                data.message='The email you set does not have an email format.'
                return data
            }
        }
    }
    //#endregion 
    //#region test password format
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\?\$%\^&\*])(?=.{8,})");
    if(!strongRegex.test(values[2]))
    {
        data.message='The password is not strong enough. You must use at least: a lowercase,an uppercase, and a symbol. The password length must be 8 characters minimum.'
        return data
    }
    //endregion
    //#region test the password is matching
    if(values[2]!=values[3])
    {
        data.message='Your confirmation does not match the original password.'
        return data
    }
    //#endregion
    console.log('aa')
    await axios.post('usermanagement/createuser', {
        useremail:values[0],
        username:values[1],
        password:values[2],
        source:'ManualInput'
    }).then(res =>{
        if(res.data.error!=null)
        {
            console.log(res.data.error)
            data.message=res.data.error
        }
        else
        {
            console.log('success')
            data.message='User registration successful. A confirmation email is sent to your address in order in order to access your account.'
            data.result=true
        }
    })
    return data
}



export default function SignupPage() {
    const containerStyle={color:"#6567a5"}
    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    message:'',
    title:'',
    redirect:''
  })
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const { open, dimmer, message, title, redirect} = state
  //console.log(open)
  //console.log(dimmer)
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <ModalComponent  
                dimmer={dimmer}
                open={open}
                message={message}
                title={title}
                redirect={redirect}>
            </ModalComponent>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={myImage} size='medium' style={{margin:"auto"}}  />
                
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input id='email' icon='mail' iconPosition='left' placeholder='E-mail address' onChange={event => {setEmail(event.target.value); dispatch({ type: 'CLOSE_MODAL' });} } />
                    <Form.Input id='usename'  icon='user' iconPosition='left' placeholder='Username' onChange={event => {setUsername(event.target.value); dispatch({ type: 'CLOSE_MODAL' });}}/>
                    <Form.Input
                        id='password'
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        onChange={event => {setPassword(event.target.value); dispatch({ type: 'CLOSE_MODAL' });}}
                    />

                     <Form.Input
                        id='confirmPassword'
                        icon='checkmark'
                        iconPosition='left'
                        placeholder='Confirm password'
                        type='password'
                        onChange={event => {setPassConfirm(event.target.value); dispatch({ type: 'CLOSE_MODAL' });}}
                    />
                    <div style={{width:'30vh'}} verticalAlign='middle' textAlign='center'>
                    <Button color="violet" style={{ color:"#ffffff", marginBottom:'14px', width:'100%', marginLeft:'auto' }}  size='large'
                    onClick={async () => 
                                {
                                    var signupResult= await controlFields([email,username,password,passConfirm])
                                    console.log(signupResult)
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
                                    }
                                } 
                            }
                    >
                        Signup
                    </Button>
                    <GoogleOAuthProvider clientId="28065806720-mr4ejasfu9plel4ff1b8g423masltllb.apps.googleusercontent.com" >
                                        <Login/>
                    </GoogleOAuthProvider>
                    </div>
                    </Segment>
                </Form>
                  
                <Message>
                    Already a member? <a href='#'>Sign in</a>
                </Message>
                </Grid.Column>
            </Grid>
        </div>
    
    )
}
