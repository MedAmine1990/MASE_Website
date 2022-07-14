import React, {useState} from 'react'
import { Input } from "semantic-ui-react";


export default function DigitInput()
{
    const [digit, setdigit] = useState('')
    return (
        <Input id='digit'
                                    onChange={event => {
                                        setdigit(event.target.value);
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
                                    }}
                                    size='huge'
                                    style={{  width: "55px", marginRight:"5px" }} />
    )
}