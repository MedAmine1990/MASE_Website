import React, {useState} from 'react';


export default function DigitInputReducer(state, action) { 
    return { value: action.value }
}