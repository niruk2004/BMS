import styled from "styled-components"
import homeImage from '../assets/images/homescreen2.jpg'

// const StyledHeader = styled.img`
//     background-size: contain;
//     opacity: 0.25;
//     width: 100%;
//     z-index: 0;
//     @media (max-width: 800px){
//         display: none;
//     }
    
// `
const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    background-image: url(${homeImage});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 1200px;

`

const HomeTitle = styled.h1`
    font-family: sans-serif;
    color: white;
    z-index: 2;
    font-weight: 100;
    font-size: 4em;
    text-align: center;

    @media (min-width: 1000px){
        font-size: 7em;
        top: -800px;
    }
`

export default function HomePage() {

    return (
        <HeaderContainer>       
                <HomeTitle>BANK MANAGEMENT SYSTEM</HomeTitle>
        </HeaderContainer>
    )
}