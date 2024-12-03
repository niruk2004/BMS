
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const TabContainer = styled.div`
 
    background-color: #8ac8ff;
    font-family: sans-serif;
    font-size: 1.5em;
    border:solid 1px black;
    text-align: center;
    padding: 0.5em 0;
    cursor: pointer;

    &:hover{
        opacity: 0.75;
    }

`



export default function DashboardTab({link,title}){
    
    const navigate = useNavigate();
    
    function handleClick(){
        navigate(link);
    }
    
    return (
        <TabContainer onClick={handleClick}>
            {title}
        </TabContainer>
    )
}
