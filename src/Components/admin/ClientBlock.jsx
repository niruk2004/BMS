import styled from "styled-components"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Label from "../UI/Label"

const ClientBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    cursor: pointer;
    &:hover{
        opacity: 0.75;
    }
`
const ClientIdStyle = styled.div`
    background-color:#ffa75e;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`


export default function ClientBlock({client,onClick}){

    // console.log(client)

    return (
        <ClientBlockContainer onClick={()=>onClick(client.clientId)}>
            <ClientIdStyle>
                Client_ID : {client.clientId}
            </ClientIdStyle>
            <div style={{display:'flex'}}>
               <Label label={"Name"} value={client.personalInfo.firstName+' '+client.personalInfo.lastName}/>
            </div>
            <div style={{display:'flex'}}>
                <Label label={"E-mail"} value={client.contactInfo.email}/>
                <Label label={"Phone-no"} value={client.contactInfo.phone}/>
            </div>
            <div style={{display:'flex'}}>
                <Label label={"ADDRESS"} value={client.contactInfo.address}/>
            </div>
        </ClientBlockContainer>
    )
}