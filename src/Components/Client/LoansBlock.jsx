import styled from "styled-components"
import Label from "../UI/Label"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { updateLoanDetails } from "../../firestoreMethods"
import CustomInput from "../UI/CustomInput"
import Button from "../UI/Button"
import {setLoans} from "../../redux/employeeSlice"
import { setLoans as setClientLoans } from "../../redux/clientSlice"

const LoansBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    
`
const LoansIdStyle = styled.div`
    background-color:${(props) => props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

const LoansHeaderStyle = styled.div`
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`




export default function LoansBlock({ loan,branch }) {

    const [showDropDown, setShowDropdown] = useState(false);
    const userType = useSelector(state => state.auth.userType);
    const selectedAccount = useSelector(state=>state.employee.selectedAccount);
    const [loanUpdatedFields, setLoanUpdatedFields] = useState();
    const dispatch = useDispatch();
    function handleChange(e) {
        const { name, value } = e.target;
        setLoanUpdatedFields((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(loanUpdatedFields)
    }
    const handleApproval = async (e) => {
        e.preventDefault();
        if (!loanUpdatedFields.interestRate || !loanUpdatedFields.monthlyPayment){
            console.log("plaese fill everything");
            return;
        } 
        const {loans,allLoans} = await updateLoanDetails(loan.loanId, { ...loanUpdatedFields, status: 'Active' },selectedAccount);
        console.log(loans);
        if(!branch)
        dispatch(setLoans(loans));
        else
        dispatch(setLoans(allLoans));
    }
    const handleRejection = async () => {
        const {loans,allLoans} = await updateLoanDetails(loan.loanId, { status: 'Rejected' },selectedAccount);
        console.log(loans)
        if(!branch)
        dispatch(setLoans(loans));
        else
        dispatch(setLoans(allLoans));
    }

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    }
    let backgroundColor;
    if (loan.status == 'Active') {
        backgroundColor = '#73ff51'
            ;
    } else if (loan.status == 'Closed' || loan.status ==='Rejected') {
        backgroundColor = '#ff8d8d'
    } else {
        backgroundColor = '#ffba79'
    }

    // loanId: 'loan003',
    // amount: 200000,
    // interestRate: 7.2,
    // startDate: '2022-11-01',
    // endDate: '2027-11-01',
    // monthlyPayment: 3500,
    // status: 'Active',
    const dropdownVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
    };


    return (
        <LoansBlockContainer >
            <LoansHeaderStyle onClick={toggleDropdown}>
                <LoansIdStyle backgroundcolor={backgroundColor}>loan_ID : {loan.loanId}</LoansIdStyle>
                <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <Label label={'Amount'} value={loan.loanAmount} />
                    <Label label={"Status"} value={loan.status} />
                    <Label label={"Loan Term"} value={loan.loanTerm} />
                    <Label label={'Type'} value={loan.loanType.toUpperCase()} />
                </div>
            </LoansHeaderStyle>

            <AnimatePresence>
                {showDropDown && <motion.div initial="hidden" animate="visible" exit={"hidden"} variants={dropdownVariants} transition={{ duration: 0.1 }}>
                    <div style={{ display: 'flex', cursor: 'pointer' }}>
                        <Label label={'Interest_Rate'} value={loan.interestRate ? loan.interestRate : 'WAITING'} isInvalid={!loan.interestRate && true} />
                        <Label label={'Monthly_Payment'} value={loan.monthlyPayment ? loan.monthlyPayment : 'WAITING'} isInvalid={!loan.monthlyPayment && true} />
                    </div>
                    <div style={{ display: 'flex', cursor: 'pointer' }}>
                        <Label label={"Start-Date"} value={loan.startDate} />
                        <Label label={'End-Date'} value={loan.endDate} />
                    </div>
                    {(userType === 'employee' && loan.status==='Pending') &&
                        <form >
                            <CustomInput name={'interestRate'} label={"SET INTEREST RATE"} onChange={handleChange} value={loanUpdatedFields && loanUpdatedFields.interestRate} type={"number"} configs={{ min: 1, step: 0.1 }} required/>
                            <CustomInput name={'monthlyPayment'} label={"SET MONTHLY PAYMENT"} onChange={handleChange} value={loanUpdatedFields && loanUpdatedFields.monthlyPayment} type={"number"} configs={{ min: 1000, step: 1000 }} required/>
                            <div style={{ display: "flex" }}>
                                <Button title={'REJECT'} color={'#ff8d8d'} onClick={handleRejection} />
                                <Button type={"submit"} title={'APPROVE'} color={'#73ff51'} onClick={handleApproval} />
                            </div>
                        </form>
                    }

                </motion.div>
                }
            </AnimatePresence>




        </LoansBlockContainer>
    )
}