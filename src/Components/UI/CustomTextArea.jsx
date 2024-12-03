import styled from "styled-components"

const Label = styled.label`
    font-family: sans-serif;
    font-size: large;
    color:#003768;
    flex:1;
   
   
`
const InputStyle = styled.textarea`
    font-family: sans-serif;
    font-size: large;
    color: #003768;
    border: none;
    border:solid 1px;
    background: #f0eeff;
    height: 4em;
    flex:1;
    
`
const InputContainerStyle = styled.div`
    display: flex;
    align-items: center;
    padding: 2em 1em;
    justify-content: space-around;
    border-bottom: solid 1px;
    border: solid 1px;
`

export default function CustomTextArea({ label, onChange, value ,name,style,configs,notRequired}) {
    var placeholder = 'ENTER '+label;
    var configs={...configs,required:true};
    if(notRequired) configs.required=false;
    
    return (
        <InputContainerStyle style={style}>
            <Label htmlFor={label}>{label} :</Label>
            <InputStyle  name={name} id={name} onChange={onChange} value={value} placeholder={placeholder} {...configs} />
        </InputContainerStyle>
    )


}