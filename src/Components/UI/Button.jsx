import styled from "styled-components"
import { motion } from "framer-motion"

const ButtonStyle = styled(motion.button)`
    font-family: sans-serif;
    width: 100%;
    display: block;
    font-weight: 500;
    padding: 30px;
    background-color :${(props)=>props.color?props.color:'#75bfff'};
    cursor: pointer;
    text-align: center;
    font-size: large;
    &:hover{
        opacity: 0.75;
    }
`

export default function Button({title,onClick,type,color}){
    return (
        <ButtonStyle color={color} onClick={onClick} type={type}>
            {title.toUpperCase()}
        </ButtonStyle>
    )
}