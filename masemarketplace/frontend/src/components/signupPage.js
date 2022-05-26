//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'

import myImage from '/static/images/MaseSimracingLabs.png';
import ModalComponent from "./Modal.js";
import exampleReducer from "./ModalReducer.js";


function controlFields()
{
    if ($('#email').trim().length == 0) {
      console.log('input value is empty');
      dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring'  })
    } 
}

export default function SignupPage() {
    const containerStyle={color:"#6567a5"}
    const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state
  console.log(open)
  console.log(dimmer)
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <ModalComponent  
                dimmer={dimmer}
                open={open}
                message='Some error'
                title='Some title'
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
            </ModalComponent>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={myImage} size='medium' style={{margin:"auto"}}  />
                
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input id='email' icon='mail' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input id='usename'  icon='user' iconPosition='left' placeholder='Username' />
                    <Form.Input
                        id='password'
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                     <Form.Input
                        id='confirmPassword'
                        icon='checkmark'
                        iconPosition='left'
                        placeholder='Confirm password'
                        type='password'
                    />

                    <Button color="violet" style={{ color:"#ffffff"}}  size='large'
                    onClick={() => controlFields()}
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
