import React, {useState} from 'react';


export default function exampleReducer(state, action) {
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