//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";

function controlFields(values)
{
    for(let i=0; i<values.length; i++)
    {
        if(values[i]=='') return false
            /*dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })*/
    }
    return true
    
}

export default function SignupPage() {
    const containerStyle={color:"#6567a5"}
    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined
  })
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const { open, dimmer} = state
  //console.log(open)
  //console.log(dimmer)
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <ModalComponent  
                dimmer={dimmer}
                open={open}
                message='Some error'
                title='Some title'>
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
                    onClick={() => {if (!controlFields([email,username,password,passConfirm])) dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' }) /*console.log('aa')*/} }
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
