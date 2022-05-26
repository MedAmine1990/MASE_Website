import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'

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

export default function ModalComponent(props) {
  
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
    title:"test title",
    message: "test message"
  })
  const { open, dimmer, message, title } = state
  //console.log(props.open)
  //console.log(props.dimmer)
  return (
    <div>

      <Modal
        dimmer={props.dimmer}
        open={props.open}
        onClose={() => {props.open=false; dispatch({ type: 'CLOSE_MODAL' })}}
      >
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Content>
          {props.message}
        </Modal.Content>
        <Modal.Actions>
          <Button color='violet' onClick={() =>  {
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