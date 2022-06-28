//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import axios from 'axios';

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";
import Login from "./googleSignUp.js"
import { GoogleOAuthProvider } from '@react-oauth/google';

async function loginStandard(values)
{
    var data = {
        result: false,
        message:'User login not executed'
    }
    await axios.post('usermanagement/loginuser', {
        useremailorname:values[0],
        password:values[1]
    }).then(res =>{
        if(res.data.error!=null)
        {
            console.log(res.data.error)
            data.message=res.data.error
        }
        else
        {
            console.log('success')
            data.message='You are successfully logged in, welcome back !'
            data.result=true
        }
    })
    return data;
}

export default function SigninPage()
{
    const [useremailorname, setUseremailorname] = useState('')
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
                        <Form.Input id='userid' 
                                    icon='user' 
                                    iconPosition='left' 
                                    placeholder='E-mail or username' 
                                    onChange={event => {setUseremailorname(event.target.value)} } />
                        <Form.Input
                            id='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={event => {setPassword(event.target.value)} }
                        />
                        <div style={{width:'30vh'}} verticalAlign='middle' textAlign='center'>
                            <Button color="violet" 
                                    style={{ color:"#ffffff", marginBottom:'14px', width:'100%', marginLeft:'auto' }}  
                                    size='large' 
                                    content='Signin'
                                    onClick={async ()=>{
                                        loginStandard([useremailorname,password]);
                                    }}
                                    />
                            
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