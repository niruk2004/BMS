import Button from "../../UI/Button";
import CustomInput from "../../UI/CustomInput";
import styled from "styled-components";
import SelectInput from "../../UI/SelectInput";

import { query, where ,collection , getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../../firebase";
import { setAuthToken } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";

const LoginFormStyle = styled.div`
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
`;

export default function LoginForm({ setFormData, handleSubmit, formData, userType }) {

    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Step 1: Authenticate the user with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const idToken = await user.getIdToken(); // Retrieve the ID token
           // console.log("Session Token (ID Token):", idToken);

    
            // Step 2: Define the collection based on userType
            const collectionName = userType === "employee" ? "employees" : "clients";
            const userCollectionRef = collection(db, collectionName);
    
            // Step 3: Query Firestore for documents matching the email
            const q = query(userCollectionRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                alert("No matching user found in Firestore.");
                return;
            }

            
            const userData = querySnapshot.docs[0].data(); // Assuming only one matching document
    
            // Step 4: Validate additional fields
            if (userType === "client") {
                if (userData.branch !== formData.branch) {
                    alert("Branch mismatch.");
                    return;
                }
            } else if (userType === "employee") {
                // if (userData.employeeId !== formData.employeeId || userData.branch !== formData.branch) {
                //     alert("Employee ID or branch mismatch.");
                //     return;
                // }
            }
            // Step 5: Call handleSubmit 
            if(handleSubmit){
                localStorage.setItem("authToken",idToken);
                dispatch(setAuthToken(idToken))
                handleSubmit(e);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message);
        }
    };




    return (
        <LoginFormStyle>
            <form onSubmit={handleLogin} className="auth-form" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>

                <CustomInput  label={"E-MAIL"} type="email" name="email" value={formData.email} onChange={handleChange} required />
                <CustomInput label={"PASSWORD"} type="password" name="password" value={formData.password} onChange={handleChange} required configs={{minLength:5}}/>

                {userType === 'employee' && (
                    <>
                        <CustomInput label={"EMPLOYEE-ID"} type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                    </>
                )}
                <SelectInput onChange={handleChange} label={'BRANCH'} name={'branch'} options={['Branch1','Branch2','Branch3','Branch4']}/>



                <Button title={'Login'} type={'submit'} />
            </form>
        </LoginFormStyle>

    );
}