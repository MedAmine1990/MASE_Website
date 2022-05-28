//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";

function controlFields(values)
{
    //#region test empty fields
    for(let i=0; i<values.length; i++)
    {
        if(values[i]=='') return {
                result: false,
                message:'One of the fields is missing for your signup !'
            }
            /*dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })*/
    }
    //#endregion
    //#region test email format
    var emailSplits=values[0].split('@')
    if (emailSplits.length!=2)
    {
        return {
            result: false,
            message:'The email you set does not have an email format.'
        }
    }
    else
    {
        if(!emailSplits[1].includes('.'))
        {
            return {
                result: false,
                message:'The email you set does not have an email format.'
            }
        }
        else
        {
            console.log(emailSplits[1].split('.').length);
            if(emailSplits[1].split('.')[1].length==0)
            {
                return {
                    result: false,
                    message:'The email you set does not have an email format.'
                }
            }
        }
    }
    //#endregion 
    //#region test password format
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\?\$%\^&\*])(?=.{8,})");
    if(!strongRegex.test(values[2]))
    {
         return {
            result: false,
            message:'The password is not strong enough. You must use at least: a lowercase,an uppercase, and a symbol. The password length must be 8 characters minimum.'
        }
    }
    //endregion
    //#region test the password is matching
    if(values[2]!=values[3])
    {
        return {
            result: false,
            message:'Your confirmation does not match the original password.'
        }
    }
    //#endregion
    return {
        result:true,
        message:''
    }  
}

export default function SignupPage() {
    const containerStyle={color:"#6567a5"}
    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    message:'',
    title:''
  })
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const { open, dimmer, message, title} = state
  //console.log(open)
  //console.log(dimmer)
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <ModalComponent  
                dimmer={dimmer}
                open={open}
                message={message}
                title={title}>
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

                    <Button color="violet" style={{ color:"#ffffff"}}  size='large'
                    onClick={() => 
                                {
                                    if (!controlFields([email,username,password,passConfirm]).result) 
                                    {
                                        dispatch({ 
                                                    type: 'OPEN_MODAL',
                                                    dimmer: 'blurring', 
                                                    message:controlFields([email,username,password,passConfirm]).message,
                                                    title:'Signup error'
                                                })
                                    } 
                                } 
                            }
                    >
                        Sign up
                    </Button>
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
