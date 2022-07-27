//test
import React, {useEffect,useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";
import Login from "./googleSignUp.js"
import { GoogleOAuthProvider } from '@react-oauth/google';
import DigitInput from './digitInput.js'
import DigitInputReducer from './digitInputReducer.js'

async function checkUserEmail()

{
    var result= false
    await axios.get('usermanagement/getsessionemail').then(res =>{
                                                        if(res.data.email!=null)
                                                            result = true;
                                                        })
    return result;
}

export default function CodeConfirmationPage()
{
    const [password, setPassword] = useState('')
    const [stateDigit, dispatchDigit]=React.useReducer(DigitInputReducer,{
        value:'',
        isReset: false
    })
    const [emailExists, setEmailExists] = useState();
    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    message:'',
    title:'',
    redirect:''
    })
    const {value, isReset} = stateDigit
    const { open, dimmer, message, title, redirect} = state
    
    const emailexists = async () => {
        var result= await checkUserEmail()
        setEmailExists(result)
    }
    useEffect(() => {
        emailexists();
    }, []);
    console.log(emailExists)
    
    
    return (
         <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <ModalComponent  
                dimmer={dimmer}
                open={open}
                message={message}
                title={title}
                redirect={redirect}>
            </ModalComponent>
            
            { emailExists == true && <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={myImage} size='medium' style={{margin:"auto"}}  />
                    <Message>
                        Verify your identity with the code received in your email.
                    </Message>
                    <Form size='large' autoComplete="off">
                        <Segment stacked>
                        <DigitInput value={value} isReset={isReset} />
                        <DigitInput value={value} isReset={isReset} />
                        <DigitInput value={value} isReset={isReset} />
                        <DigitInput value={value} isReset={isReset} />
                        <DigitInput value={value} isReset={isReset} />
                        <DigitInput value={value} isReset={isReset} />
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
                                                                    //window.location.reload(false)
                                                                    dispatch({ 
                                                                                type: 'OPEN_MODAL',
                                                                                dimmer: 'blurring', 
                                                                                message:'Confirmation code mismatch. Make sure to input the code you received in your email.',
                                                                                title:'Email verification error',
                                                                                redirect:''
                                                                            })
                                                                    console.log(res.data.error)
                                                                }
                                                                else
                                                                {
                                                                    //console.log('code verified')
                                                                     dispatch({ 
                                                                                type: 'OPEN_MODAL',
                                                                                dimmer: 'blurring', 
                                                                                message:'Congrats ! You can now join the community of MASE simracing labs.',
                                                                                title:'Email verification success',
                                                                                redirect:'/'
                                                                            })
                                                                }
                                                            })
                                        //console.log(confirmationCode);
                                        dispatchDigit({ value: '', isReset:true });
                                }}
                        />
                        <Button 
                                color="standard" 
                                content='Resend' 
                                size='large' 
                                icon='mail'
                                style={{width:'200px', marginTop:'15px'}} 
                                onClick={async ()=>{
                                        dispatchDigit({ value: '', isReset:true });
                                        await axios.get('usermanagement/resendverifyemail')
                                        .then(res =>{
                                            if(res.data.error!=null)
                                                {
                                                    //console.log(res.data.error)
                                                }
                                                else
                                                {
                                                    //console.log('confirmation code reset')
                                                }
                                        })
                                }}>
                                </Button> 
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid> }
            { emailExists == false && <Grid textAlign='left' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' style={{color:"#ffffff", fontSize:"100px"}}>Oops!</Header>
                        <Header as='h2' style={{color:"#ffffff"}}>Page unavailable</Header>
                        <Header as='h4' style={{color:"#ffffff"}}>The page you are trying to acces cannot be accessed unless you are logged in !</Header>
                </Grid.Column>
            </Grid> }
        </div>
        )
}