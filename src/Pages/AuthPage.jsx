import { useEffect, useState } from "react";
import LoginForm from "../Components/Auth/Login/LoginForm";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Toggle from "../Components/UI/Toggle";
import AuthImage from "../assets/images/homescreen2.jpg"
import {GiBanknote} from "react-icons/gi"
import RegisterForm from "../Components/Auth/Register/RegisterForm";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";



// Styled Components
const FormContainer = styled.div`
    
    position: relative; /* Required for absolute positioning of the background */
    backdrop-filter: blur(0.5px);
    width: 1080px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  
`;

const PageStyle = styled.div`
    background:#4b5bbb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${AuthImage});
    background-position: center;
    background-size: cover;
    margin-top: 70px;
`
const IconStyle = styled.div`
    font-size: 8em;
    color: white;
    display: flex;
    align-items: center;
`

// AuthPage Component
export default function AuthPage() {
    const [formData, setFormData] = useState({});
    const [formType, setFormType] = useState("login");
    const [userType, setUserType] = useState('client');
    const [formValidity,setformValidity]=useState({
        isInvalid:false,
        message:''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        setFormData({})
        setformValidity({
            isInvalid:false,
            message:''
        })
    },[userType,formType])
    useEffect(()=>{
      if(formValidity.isInvalid===false)return;
      else{

      }      
    },[formValidity])





    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        if(formType=='register' && formData.password!==formData.confirm_password){
            console.log("invalid")
            setformValidity({
                isInvalid:true,
                message:"Passwords Do not Match !"
            })
        }
        dispatch(login({userType}));
        if(userType=='client'){
            navigate('/client/c1');
        }else{
            navigate('/employee/e1');
        }
    };





    return (
        <PageStyle>
            <FormContainer>
            
            <IconStyle>
            <GiBanknote/>
            </IconStyle>
            

            <div style={{display:"flex",flexDirection:"column",flex1 :2}}>
            <Toggle tabs={['client', 'employee']} setTab={setUserType} currentTab={userType} />
            <Toggle tabs={['login', 'register']} currentTab={formType} setTab={setFormType} />
            </div>
            
            <main style={{width:'100%',overflow:"hidden",minHeight:700}}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${formType}-${userType}`} // Use both formType and userType as the key for unique animation
                        initial={{ y: -200, opacity: 1 }} // Initial state
                        animate={{ y: 0, opacity: 1 }} // Animation state
                        transition={{ duration: 0.3 }} // Transition duration
                    >
                        {formType === 'login' ? (
                            (<LoginForm userType={userType} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />)
                        ) : (
                            <RegisterForm userType={userType} handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} /> // Placeholder for registration form
                        )}
                    </motion.div>
                </AnimatePresence>
                <h1 style={{color:'red'}}>{formValidity.message}</h1>
            </main>
            
        </FormContainer>
        </PageStyle>
        
    );
}
