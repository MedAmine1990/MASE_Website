import React, {useState} from 'react';


export default function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer, message:action.message, title: action.title }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}