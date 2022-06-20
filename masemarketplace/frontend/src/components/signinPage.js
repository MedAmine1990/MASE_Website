//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import axios from 'axios';

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";
import Login from "./googleSignUp.js"
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function SigninPage()
{
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={myImage} size='medium' style={{margin:"auto"}}  />
                    <Form size='large'>
                        <Segment stacked>
                        <Form.Input id='userid' icon='user' iconPosition='left' placeholder='E-mail or username' onChange={event => {setEmail(event.target.value); dispatch({ type: 'CLOSE_MODAL' });} } />
                        <Form.Input
                            id='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <div style={{width:'30vh'}} verticalAlign='middle' textAlign='center'>
                            <Button color="violet" style={{ color:"#ffffff", marginBottom:'14px', width:'100%', marginLeft:'auto' }}  size='large' content='Signin'/>
                            
                            <GoogleOAuthProvider clientId="28065806720-mr4ejasfu9plel4ff1b8g423masltllb.apps.googleusercontent.com" >
                                                <Login/>
                            </GoogleOAuthProvider>
                        </div>
                        </Segment>
                    </Form>
                <Message>
                    Not registred ?<a href='#'> Join the community now!</a>
                </Message> 
                </Grid.Column>
            </Grid>
        </div>
        )
}