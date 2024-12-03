import styled from "styled-components";
import Label from "../Label";

const DetailBlockContainer = styled.div`
    font-family: sans-serif;
    margin: 2em 0;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 1em;
`
const LabelBlock = styled.div`
    display: flex;
`
const TitleStyled = styled.h1`
    padding: 0 0.5em;
    background-color: #a1d3ff;
    border: solid 1px;
    font-size:1.75em;
    margin: 0;
    font-weight: 100;

`

export default function UserDetailBlock({datas,title}){
    return (
        <DetailBlockContainer>
                <TitleStyled>{title}</TitleStyled>
                <LabelBlock>
                {datas.map((data)=>{
                    return <Label key={data.label} label={data.label} value={data.value}/>
                })}
                </LabelBlock>
        </DetailBlockContainer>
    )
}