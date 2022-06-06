import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import exampleReducer from "./ModalReducer.js";

/*function exampleReducer(state, action) {
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
}*/


export default function ModalComponent(props) {
  let navigate = useNavigate();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    title:"test title",
    message: "test message",
    redirect:"test redirect"
  })

  const { open, dimmer, message, title, redirect } = state
  //console.log(props.open)
  //console.log(props.dimmer)

  
  return (
    <div>

      <Modal
        closeOnDimmerClick={false}
        dimmer={props.dimmer}
        open={props.open}
        onClose={() => {
            props.open=false; 
            dispatch({ type: 'CLOSE_MODAL' });
          }}
      >
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Content>
          {props.message}
        </Modal.Content>
        <Modal.Actions>
          <Button color='violet' onClick={() =>  {
              if(props.redirect!='')
              {
                console.log(props.redirect)
                navigate(props.redirect)
              }
              props.open=false;
              dispatch({ type: 'CLOSE_MODAL' })
              }
              }>
            Got it!
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}