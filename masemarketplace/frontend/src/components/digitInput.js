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
                                            if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                            }
                                            else if(digit.length>=1){
                                                        event.preventDefault();
                                            }
                                            else
                                            {
                                                props.value=event.key
                                            }
                                    }}
                                    size='huge'
                                    style={{  width: "55px", marginRight:"5px" }} />
    )
}