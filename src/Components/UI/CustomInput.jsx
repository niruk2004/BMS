import styled from "styled-components"

const Label = styled.label`
    font-family: sans-serif;
    font-size: large;
    color:#003768;
    flex:1;
   
   
`
const InputStyle = styled.input`
    font-family: sans-serif;
    font-size: large;
    color: #003768;
    border: none;
    border:solid 1px;
    background: #f0eeff;
    height: 1.5em;
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

export default function CustomInput({ type, label, onChange, value ,name,style,configs,notRequired}) {
    var placeholder = 'ENTER '+label;
    var configs={...configs,required:true};
    if(notRequired) configs.required=false;
    if(name=='confirm_password'){
        placeholder="RE-ENTER PASSWORD"
    }
    if(name=='phone'){
        placeholder='91+----------'
        configs={...configs,
            pattern:"[0-9]{10}",
            maxLength:10
        }
    }
    if(name=='confirm_pin'){
        placeholder='RE-ENTER PIN'
        configs={
            ...configs,
            pattern:"[0-9]{6}",
            maxLength:6
        }
    }
    if(name=='pin'){
        placeholder="ENTER SECURITY PIN"
        configs={
            ...configs,
            pattern:"[0-9]{6}",
            maxLength:6
        }
    }
    return (
        <InputContainerStyle style={style}>
            <Label htmlFor={label}>{label} :</Label>
            <InputStyle type={type} name={name} id={name} onChange={onChange} value={value} placeholder={placeholder} {...configs} />
        </InputContainerStyle>
    )


}