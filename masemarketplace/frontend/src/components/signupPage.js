//test
import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'

import myImage from '/static/images/MaseSimracingLabs.png';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      console.log('CLOSE_MODAL')
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      console.log('CLOSE_MODAL')
      return { open: false }
    default:
      throw new Error()
  }
}




function ErrorModal(props) {
  
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state
  console.log(props.open)
  console.log(props.dimmer)
  return (
    <div>

      <Modal
        dimmer={props.dimmer}
        open={props.open}
        onClose={() => {props.open=false; dispatch({ type: 'CLOSE_MODAL' })}}
      >
        <Modal.Header>Use Google's location service?</Modal.Header>
        <Modal.Content>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() =>  {
              props.open=false;
              dispatch({ type: 'CLOSE_MODAL' })
              }
              }>
            Disagree
          </Button>
          <Button positive onClick={() =>  {
              props.open=false;
              dispatch({ type: 'CLOSE_MODAL' })
              }
              }>
            Agree
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
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
            <ErrorModal  
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
            </ErrorModal>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={myImage} size='medium' style={{margin:"auto"}}  />
                
                <Form size='large'>
                    <Segment stacked>
                    <Form.Input icon='mail' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input  icon='user' iconPosition='left' placeholder='Username' />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                     <Form.Input
                        
                        icon='checkmark'
                        iconPosition='left'
                        placeholder='Confirm password'
                        type='password'
                    />

                    <Button color="violet" style={{ color:"#ffffff"}}  size='large'
                    onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring'  })}
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
