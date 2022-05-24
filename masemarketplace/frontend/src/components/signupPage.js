import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import myImage from '/static/images/MaseSimracingLabs.png';


export default function SignupPage() {
    const containerStyle={color:"#6567a5"}
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={myImage} size='medium' style={{margin:"auto"}}  />
                
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                     <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirm password'
                        type='password'
                    />

                    <Button color="violet" style={{ color:"#ffffff"}} fluid size='large'>
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