import { useSelector } from "react-redux"
import styled from "styled-components"
import ClientBlock from "./ClientBlock";
import Header from "../UI/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "../../redux/employeeSlice";

const ClientsStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    font-family: sans-serif;
`


export default function Clients(){
    
    const clients = useSelector(state=>state.employee.clients);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(clients)
    const handleClick = (clientId)=>{
        dispatch(setSelectedClient({selectedClient:clientId}));
        navigate(`${clientId}/accounts`);
    }

    return (
        <ClientsStyle>
            <Header title={"CLIENTS"} color={'#fddfb3'}/>
            {clients.map((client)=>{
                return <ClientBlock key={client.clientId} client={client} onClick={handleClick}/>
            })}
        </ClientsStyle>
    )
}