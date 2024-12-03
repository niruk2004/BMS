
import styled from "styled-components"
import Navlink from "./NavLink"
import { useSelector } from "react-redux"
import Link from "./Link"
import { useLocation } from "react-router-dom"

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #8ac9ff;
    height: 70px;
    align-items: center;
    justify-content: center;
    border-bottom:solid 2px #021f38;
    position: fixed ;
    top:0;
    left: 0;
    width: 100%;
    z-index: 40;
`
const NavLeft = styled.div`
    flex: 1;
    display: flex;
`

const NavRight = styled.div`
    flex:4;
    background-color: #ffffff;
    display: flex;
    height: 100%;
    justify-content: end;
    align-items: center;
    border-bottom:solid 2px #8bc9ff;
`

export default function NavBar() {
    const isLoggedin = useSelector(state=>state.auth.isLoggedin);
    const location = useLocation();
    const firstParam = location.pathname.split('/')[1];

    return (
        <div>
            <NavContainer>
            <NavLeft>
                <Navlink linkTitle={"HOME"} />
            </NavLeft>
            <NavLeft>
                {isLoggedin && (firstParam=='client' || firstParam=='employee') ? <Link title={'DASHBOARD'}/>: <Navlink linkTitle={"ABOUT"} />}
                
            </NavLeft>
            {isLoggedin &&  <Navlink linkTitle={"ACCOUNT"} /> }
            <NavRight>
                {!isLoggedin?<Navlink linkTitle={"LOGIN/REGISTER"}  />:<Navlink linkTitle={"LOGOUT"} fontColor={"#000000"}></Navlink>}
            </NavRight>
        </NavContainer>
        </div>
        
    )
}