//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import axios from 'axios';

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";
import Login from "./googleSignUp.js"
import { GoogleOAuthProvider } from '@react-oauth/google';
import DigitInput from './digitInput.js'


export default function CodeConfirmationPage()
{
    const [digit1, setdigit1] = useState('')
    const [password, setPassword] = useState('')

    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    message:'',
    title:'',
    redirect:''
    })
    const { open, dimmer, message, title, redirect} = state
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
                        <Message>
                            Verify your identity with the code received in your email.
                        </Message>
                        <DigitInput />
                        <DigitInput />
                        <DigitInput />
                        <DigitInput />
                        <DigitInput />
                        <DigitInput />
                        <Button color="violet" 
                            style={{ color:"#ffffff", marginTop:'15px', width:'200px' }}  
                            size='large' 
                            content='Verify'
                            onClick={async ()=>{
                            var loginResult= await loginStandard([useremailorname,password]);
                                if(!loginResult.result)
                                {
                                    dispatch({ 
                                                type: 'OPEN_MODAL',
                                                dimmer: 'blurring', 
                                                message:loginResult.message,
                                                title:'Signup error',
                                                redirect:''
                                            })
                                }
                                else
                                {
                                    dispatch({ 
                                                type: 'OPEN_MODAL',
                                                dimmer: 'blurring', 
                                                message:loginResult.message,
                                                title:'Signup success !',
                                                redirect:'/'
                                            })
                                }
                                }}
                        />
                        <Button 
                                color="standard" 
                                content='Resend' 
                                size='large' 
                                style={{width:'200px', marginTop:'15px'}} /> 
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
        )
}