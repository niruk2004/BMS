import styled from "styled-components"


const SelectContainer = styled.div`
   
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2em 1em;
    border: solid 1px;
`
const Label = styled.label`
    font-family: sans-serif;
    font-size: large;
    color:#003768;
    flex:1;
`
const SelectStyle = styled.select`
    font-family: sans-serif;
    font-size: large;
    color: #003768;
    border: none;
    border-bottom:solid 1px;
    background: #f0eeff;
    height: 1.5em;
    flex: 2;
    text-align: center;
`

export default function SelectInput({ onChange, options, label, name, style}) {
    return (
        <SelectContainer style={style}>
            <Label>{label}</Label>
            <SelectStyle name={name} id={name} onChange={onChange} required>
                <option value=''>----select----</option>
                {options.map((option) => (<option key={option} value={option}>{option}</option>))}


            </SelectStyle>
        </SelectContainer>
    );
}