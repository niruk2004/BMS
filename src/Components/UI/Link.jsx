import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { toggleDashBoard } from "../../redux/appSlice"

const NavlinkContainer = styled.div`

    font-weight:bold;
    font-family: sans-serif ;
    
    cursor: pointer;
    padding: 1 0 1em 0;
    margin: 0 3em;
    width: 9em;
    text-align:center;
    transition: all 50ms;

`

const NavLinkStyled = styled.div`
    color: ${(props)=>props.fontcolor||"black"};
    font-weight: 100;
    text-decoration: none;
    &.active{
        text-decoration: underline;
        font-weight: bold;
    }
`

export default function Link({title,fontColor}){

    
    const dispatch = useDispatch();
    
    function handleClick(){
        dispatch(toggleDashBoard());
    }

    
    return (
        <NavlinkContainer fontcolor={fontColor}>
            <NavLinkStyled fontcolor={fontColor}  onClick={handleClick}>{title}</NavLinkStyled>
        </NavlinkContainer>
    )
}