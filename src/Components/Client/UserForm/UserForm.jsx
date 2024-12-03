import styled from "styled-components"
import CustomInput from "../../UI/CustomInput"
import SelectInput from "../../UI/SelectInput"
import Button from "../../UI/Button"
import Header from "../../UI/Header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAccount, addTransaction,addLoan } from "../../../redux/clientSlice"
import { useNavigate } from "react-router-dom"


import { collection, addDoc ,query,where} from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust based on your Firebase config file
import { getAuth } from "firebase/auth"
import { getDocs, doc } from "firebase/firestore";




const FormContainerStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const FormStyle = styled.form`
    width: 90%;
`

export default function UserForm({ type }) {

    const [formData, setFormData] = useState();
    const client = useSelector(state => state.client.client);
    const selectedAccount = useSelector(state => state.client.selectedAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Perform any additional actions with the latest formData here
       
    }, [formData]);

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    function addYearsToDate(yearsToAdd) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + yearsToAdd);
        return date.toISOString().split('T')[0];
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prev) => {
            const updatedData = { ...prev, [name]: value };
    
            if (type === 'loan' && name === 'loanTerm') {
                updatedData.startDate = getCurrentDate();
                updatedData.endDate = addYearsToDate(parseInt(value, 10));
                updatedData.status = "Pending";
                updatedData.loanId = 'newlyAdded';
                updatedData.accountId = selectedAccount;
                updatedData.branch = client.branch;
                updatedData.interestRate = null;
                updatedData.monthlyPayment=null;
            }
    
            if (type === 'transaction') {
                updatedData.date = getCurrentDate();
                updatedData.status = 'Completed';
                updatedData.accountId = selectedAccount;
                updatedData.branch = client.branch;
            }
    
            if (type === 'account') {
                let interestRate = 0;
                if (updatedData.accountType === 'Savings') {
                    interestRate = 2.5;
                }
    
                updatedData.interestRate = interestRate;
                updatedData.accountHolder = `${client.personalInfo.firstName} ${client.personalInfo.lastName}`;
                updatedData.balance = 0;
                updatedData.transactions = [];
                updatedData.loans = [];
                updatedData.createdDate = getCurrentDate();
            }
    
            return updatedData;
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
            console.error("No authenticated user found");
            alert("Please log in again.");
            return;
        }
    
        const uid = currentUser.uid; // Firebase Auth UID
        
    try {
        let dataToSubmit = {};
        let collectionName = "";
        let navigationPath = "";
        let reduxAction;

        if (type === "account") {
            // Prepare account data
            const userCollectionRef = collection(db, "clients");
            const clientDocRef = query(userCollectionRef, where("uid", "==", uid));
            const clientDocs = await getDocs(clientDocRef);

            if (clientDocs.empty) {
                alert("Client data not found in Firestore. Please contact support.");
                return;
            }

            const clientData = clientDocs.docs[0].data();
            dataToSubmit = {
                ...formData,
                uid,
                accountHolder: `${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName}`,
                branch: clientData.branch,
                balance: 0,
                transactions: [],
                loans: [],
                createdDate: getCurrentDate(),
                clientId:client.clientId
            };
            collectionName = "accounts";
            navigationPath = "../";
            reduxAction = addAccount;

        } else if (type === "loan") {
            // Prepare loan data
            dataToSubmit = {
                accountId: formData.accountId,
                branch: formData.branch,
                interestRate: formData.interestRate,
                loanType: formData.loanType,
                loanAmount:parseInt(formData.loanAmount),
                loanPurpose: formData.loanPurpose,
                loanTerm: formData.loanTerm,
                monthlyPayment: formData.monthlyPayment,
                startDate: getCurrentDate(),
                uid,
                status: "Pending",
            };
            collectionName = "loans";
            navigationPath = "../loans";
            reduxAction = addLoan;

        } else if (type === "transaction") {
            // Prepare transaction data
            dataToSubmit = {
                accountId: formData.accountId,
                amount: parseInt(formData.amount),
                branch: formData.branch,
                uid,
                date: getCurrentDate(),
                description: formData.description,
                recipient: formData.recipient,
                status: "Completed",
                type: formData.type,
            };
            collectionName = "transactions";
            navigationPath = "../transactions";
            reduxAction = addTransaction;
        } else {
            console.error("Invalid type specified");
            alert("Invalid submission type. Please try again.");
            return;
        }

       

        // Add data to Firestore
        const docRef = await addDoc(collection(db, collectionName), dataToSubmit);

        // Update the data object with Firestore-generated ID
        const generatedId = docRef.id;
        dataToSubmit[`${type}Id`] = generatedId;


        console.log(`Final ${type} data (with ID):`, dataToSubmit);

        // Update Redux and navigate
        dispatch(reduxAction({ [type]: dataToSubmit ,accountId:selectedAccount}));
        navigate(navigationPath);

    } catch (error) {
        console.error(`Error during ${type} submission:`, error);
        alert(`Failed to add ${type}. Please try again.`);
    }
    };
    


    
    return (
        <FormContainerStyle>

            <FormStyle onSubmit={handleSubmit}>
                <Header title={type.toUpperCase()} color={type !== 'account' ? '#8eff77ff' : '#a7ffec'} />

                {type === 'transaction' && <div>
                    <SelectInput label={'TRANSACTION TYPE'} options={['debit', 'credit']} name={'type'} onChange={handleChange} />
                    <CustomInput label={'DESCRIPTION'} type={'textarea'} name={'description'} onChange={handleChange} notRequired={true} />
                    <CustomInput label={'AMOUNT(in Ruppees)'} type={'number'} name={'amount'} configs={{ step: 100, min: 0 }} onChange={handleChange} />
                    <CustomInput label={'RECIPIENT ACCOUNT ID'} type={'text'} name={'recipient'} onChange={handleChange} />
                    <Button type={'submit'} title={'MAKE PAYMENT'} color={'#8eff77ff'} />
                </div>}
                {type == 'loan' && <div>
                    <SelectInput onChange={handleChange} label={'LOAN TYPE'} options={['personal', 'education', 'auto']} name={'loanType'} />
                    <CustomInput onChange={handleChange} label={'LOAN AMOUNT'} type={'number'} name={'loanAmount'} configs={{ step: 100, min: 0 }} />
                    <CustomInput onChange={handleChange} label={'LOAN TERM (in years)'} type={'number'} name={'loanTerm'} configs={{ min: 1 }} />
                    <CustomInput onChange={handleChange} label={'LOAN PURPOSE'} name={'loanPurpose'} configs={{}} />
                    <Button type={'submit'} title={'APPLY LOAN'} color={'#8eff77ff'} />
                </div>}
                {type == 'account' && <div>
                    <SelectInput onChange={handleChange} label={'ACCOUNT TYPE'} options={['Savings', 'Current']} name={'accountType'} />
                    <Button type={'submit'} title={'ADD ACCOUNT'} color={'#a7ffec'} />
                </div>}



            </FormStyle>
        </FormContainerStyle>
    )
}