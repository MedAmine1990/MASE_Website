//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";
import Login from "./googleSignUp.js"
import { GoogleOAuthProvider } from '@react-oauth/google';
import DigitInput from './digitInput.js'
import DigitInputReducer from './digitInputReducer.js'


export default function CodeConfirmationPage()
{
    const [password, setPassword] = useState('')
    const [stateDigit, dispatchDigit]=React.useReducer(DigitInputReducer,{
        value:''
    })
    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    message:'',
    title:'',
    redirect:''
    })
    const {value} = stateDigit
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
                    <Message>
                        Verify your identity with the code received in your email.
                    </Message>
                    <Form size='large'>
                        <Segment stacked>
                        <DigitInput value={value} />
                        <DigitInput value={value} />
                        <DigitInput value={value} />
                        <DigitInput value={value} />
                        <DigitInput value={value} />
                        <DigitInput value={value} />
                        <Button color="violet" 
                            style={{ color:"#ffffff", marginTop:'15px', width:'200px' }}  
                            size='large' 
                            content='Verify'
                            icon='checkmark'
                            onClick={async ()=>{
                                        var confirmationCode=digit[0]['value']+digit[1]['value']+digit[2]['value']+digit[3]['value']+digit[4]['value']+digit[5]['value'];
                                        await axios.post('usermanagement/verifyemail', {
                                                            code:confirmationCode
                                                        }).then(res =>{
                                                                if(res.data.error!=null)
                                                                {
                                                                    console.log(res.data.error)
                                                                }
                                                                else
                                                                {
                                                                    console.log('code verified')
                                                                }
                                                            })
                                        console.log(confirmationCode);
                                        dispatchDigit({ value: '' });
                                }}
                        />
                        <Button 
                                color="standard" 
                                content='Resend' 
                                size='large' 
                                icon='mail'
                                style={{width:'200px', marginTop:'15px'}} 
                                onClick={async ()=>{
                                        dispatchDigit({ value: '' });
                                        await axios.get('usermanagement/resendverifyemail')
                                        .then(res =>{
                                            if(res.data.error!=null)
                                                {
                                                    console.log(res.data.error)
                                                }
                                                else
                                                {
                                                    console.log('confirmation code reset')
                                                }
                                        })
                                }}>
                                </Button> 
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
        )
}