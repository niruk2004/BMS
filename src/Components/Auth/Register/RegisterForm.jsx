import Button from "../../UI/Button";
import CustomInput from "../../UI/CustomInput";
import styled from "styled-components";
import SelectInput from "../../UI/SelectInput";

import { collection , addDoc,updateDoc,doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import CustomTextArea from "../../UI/CustomTextArea";


const LoginFormStyle = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
`;

export default function RegisterForm({ setFormData, handleSubmit,formData, userType }) {

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }




    const handleFirestoreSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Register user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user; // Firebase-authenticated user
            const collectionName = userType === "employee" ? "employees" : "clients";

            // Step 2: Add additional details to Firestore
            const docRef =await addDoc(collection(db, collectionName), {
                uid: user.uid, // Link Firestore entry with the Firebase auth user
                personalInfo:{
                    firstName: formData.first_name,
                    lastName: formData.last_name,
                    DOB:formData.DOB,
                },
                contactInfo:{
                    email: formData.email,
                    phone: formData.phone,
                    address:formData.address
                },
                userType,
                accounts:[],
                branch: formData.branch,
                ...(userType === "employee" && {employeeDetails: {employeeId: formData.employeeId, position: formData.position} }),
                ...(userType === "client" && { pin: formData.pin }),
            });
            if(userType==='client'){
                await updateDoc(doc(db, collectionName, docRef.id), {
                    clientId: docRef.id,
                });
            }else{
                await updateDoc(doc(db, collectionName, docRef.id), {
                    employeeId: docRef.id,
                });
            }
           

       
            alert("User registered and logged in successfully!");

            if (handleSubmit){
                handleSubmit(e)
            }

        } catch (error) {
            console.error("Error during registration: ", error);
            alert(error.message); // Show an error message to the user
        }
    };



    return (
        <LoginFormStyle>
            <form onSubmit={handleFirestoreSubmit} className="auth-form" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomInput style={{ flex: 1 }} label={"FIRST NAME"} type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                    <CustomInput style={{ flex: 1 }} label={"LAST NAME"} type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <CustomInput label={'DATE OF BIRTH'} type={'date'} name={'DOB'} value={formData.DOB} onChange={handleChange} required/>
                <CustomTextArea label={'ADDRESS'} name={'address'} value={formData.address} onChange={handleChange} required/>
                {userType === 'employee' && (
                    <>
                        <CustomInput label={"EMPLOYEE-ID"} type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                    </>
                )}
                <CustomInput label={"E-MAIL"} type="email" name="email" value={formData.email} onChange={handleChange} required />
                <CustomInput label={'PHONE NUMBER:'} type={"tel"} name={'phone'} value={formData.phone} onChange={handleChange} required />

                

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomInput style={{ flex: 1 }} label={"PASSWORD"} type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <CustomInput style={{ flex: 1 }} label={"CONFIRM PASSWORD"} type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
                </div>
                {userType === 'client' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomInput style={{ flex: 1 }} label={"6 DIGIT SECURITY PIN"} type="password" name="pin" value={formData.pin} onChange={handleChange} required />
                    <CustomInput style={{ flex: 1 }} label={"CONFIRM SECURITY PIN"} type="password" name="confirm_pin" value={formData.confirm_pin} onChange={handleChange} required />
                </div>}


                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SelectInput style={{ flex: 1 }} onChange={handleChange} label={'BRANCH'} name={'branch'} options={['Branch1', 'Branch2', 'Branch3', 'Branch4']} />
                    {userType === 'employee' && (
                        <>
                            <SelectInput style={{ flex: 1 }} onChange={handleChange} label={'POSITION'} name={'position'} options={['Manager', 'Administrator']} />
                        </>
                    )}
                </div>



                <Button title={'Register'} type={'submit'} />
            </form>
        </LoginFormStyle>

    );
}