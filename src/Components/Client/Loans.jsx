import { useDispatch, useSelector } from "react-redux"
import LoansBlock from "./LoansBlock";
import styled from "styled-components";
import Header from "../UI/Header";
import { useEffect } from "react";
import { fetchLoansByAccountId, fetchLoansByBranch } from "../../firestoreMethods";
import { setLoans } from "../../redux/employeeSlice";
import { setLoans as setClientLoans } from "../../redux/clientSlice";


const LoansStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function Loans({userType,branch}){
    
    let selectedAccount,client,accounts,account,loans;
    if(userType==='client'){
        selectedAccount = useSelector(state=>state.client.selectedAccount);
        client = useSelector(state=>state.client.client);
        accounts = client.accounts
        account = accounts.find(acc => acc.accountId === selectedAccount);
        loans = account.loans;
    }else{
        selectedAccount = useSelector(state=>state.employee.selectedAccount);
    }
    
    const branchId = useSelector(state=>state.employee.employee.branch);
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchData = async()=>{
            let loansFirebase;
            if(branch){
                loansFirebase = await fetchLoansByBranch(branchId);
                // console.log(loansFirebase)
                dispatch(setLoans(loansFirebase))
            }
            else{
                loansFirebase = await fetchLoansByAccountId(selectedAccount);
                // console.log(loansFirebase)
                if(userType==='employee')
                dispatch(setLoans(loansFirebase));
                else
                dispatch(setClientLoans({loans:loansFirebase,accountId:selectedAccount}))
            }
        }
        fetchData();
    },[dispatch])

    if(userType=='employee'){
        loans = useSelector(state=>state.employee.loans);
    }

    // console.log(loans)
    return (
        <LoansStyle>
             <Header title={'LOANS'} color={'#73ff51'}/>
            {loans.map((loan)=> <LoansBlock key={loan.loanId} loan={loan} branch={branch}/>)}
        </LoansStyle>
    )
}