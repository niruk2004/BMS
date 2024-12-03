import styled from "styled-components"

const UserInfoContainer = styled.div`
    flex: 1;
    place-self: center;
    font-family: sans-serif;
    padding: 1em;
    display: flex;
    align-items: center;
`

export default function UserInfo({label,value}){
    return (
        <UserInfoContainer>
            <h2 style={{fontSize:'1.5em'}}>{label}:</h2>
            <h2 style={{fontSize:'1.25em'}}>{value}</h2>
        </UserInfoContainer>
    )
}