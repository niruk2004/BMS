import styled from "styled-components"

const HeaderStyle=styled.div`
    background-color: ${(props)=>props.color?props.color:'#a1c7ff'};
    color: black;
    border: solid 1px;
    font-family: sans-serif;
    text-align: center;
`

export default function Header({title,color}){
    return (
        <HeaderStyle color={color}>
            <h1>{title}</h1>
        </HeaderStyle>
    )
}