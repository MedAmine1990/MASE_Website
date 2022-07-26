import React, {useState} from 'react'
import { Input } from "semantic-ui-react";


export default function DigitInput(props)
{
    const [digit, setdigit] = useState('')
    return (
        <Input id='digit' value={props.value}
                                    onChange={event => {
                                        setdigit(event.target.value);
                                        props.digit=digit;
                                        const form = event.target.form;
                                        const index = [...form].indexOf(event.target);
                                        form.elements[index + 1].focus();
                                    } }
                                    onKeyPress={(event) => {
                                            console.log(event.key)
                                            if (!/[0-9]/.test(event.key)) {
                                                 console.log('!/[0-9]/')
                                                        event.preventDefault();
                                            }
                                            else if(digit.length>=1 && props.isReset == false){
                                                console.log(props.value)
                                                        event.preventDefault();
                                            }
                                            else
                                            {
                                                console.log('value update')
                                                props.value=event.key
                                                setdigit(props.value);
                                                if (props.isReset == true)
                                                {
                                                    props.isReset=false
                                                }
                                            }
                                    }}
                                    size='huge'
                                    style={{  width: "55px", marginRight:"5px" }} />
    )
}