import styled from "styled-components";
import { motion } from "framer-motion";



const Tab = styled(motion.li)` /* Make Tab a motion component */
    padding: 20px;
    background-color: white;
    color: #003768;
    list-style: none;
    font-family: sans-serif;
    width: 500px;
    text-align: center;
    transition: all 200ms;
    position: relative; /* Required for proper positioning of the background */
    z-index: 1; /* Ensure the tab is above the background */
    border: solid 1px #032d52;
    cursor: pointer;
    font-size: large;
   
    &.selected {
        background-color: #84c6ff;
    }
`;




export default function Toggle({tabs,setTab,currentTab}){
    return (
        <nav>
                <ul style={{ display: "flex", position: "relative" ,margin:0,padding:0}}>
                    <Tab
                        key={tabs[0]}
                        className={currentTab === tabs[0] ? "selected" : ""}
                        onClick={() => setTab(tabs[0])}
                        // Assigning layoutId for animation
                        whileHover={{opacity:0.75}}
                    >
                        { tabs[0].toUpperCase()}
                    </Tab>
                    <Tab
                        key={"tabs[1]"}
                        className={currentTab === tabs[1] ? "selected" : ""}
                        onClick={() => setTab(tabs[1])}
                        // Assigning layoutId for animation
                        whileHover={{opacity:0.75}}
                    >
                        {tabs[1].toUpperCase()}
                    </Tab>
                  
                </ul>
            </nav>
    )
}