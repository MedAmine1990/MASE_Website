import React, {useState} from 'react'
import {Image} from 'semantic-ui-react'

import myImage from '/static/images/MaseSimracingLabs.png';

export default function Init() {
    const containerStyle={color:"#6567a5"}
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',backgroundColor:"#5544D4", height:"100vh"}}>
            <Image src={myImage} size='medium' style={{margin:"auto"}}  />
        </div>
    
    )
}