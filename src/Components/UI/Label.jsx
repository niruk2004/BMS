import styled from "styled-components"

const LabelStyle = styled.div`
    display : flex ;
    font-family: sans-serif;
    font-size: 1.15em;
    border: solid 1px;
`
const DetailStyle=styled.div`
    margin: 0.5em;
`

export default function Label({label,value,isdescription,isInvalid}){
    
    return (
       <LabelStyle style={isdescription ? {flex:2}:{flex:1}}>
            <div style={{margin:'0.5em',fontWeight:'bolder'}}>{label} : </div>
            <div style={{margin:'0.5em',color:isInvalid?'red':'black'}}>{value}</div>
       </LabelStyle> 
    )
}