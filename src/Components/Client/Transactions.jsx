import { useDispatch, useSelector } from "react-redux"
import TransactionBlock from "./TransactionBlock";
import styled from "styled-components";
import Header from "../UI/Header";
import { useEffect } from "react";
import { fetchtransactionsByAccountId, fetchtransactionsByBranch } from "../../firestoreMethods";
import { setTransactions } from "../../redux/employeeSlice";
import { setTransactions as setClientTransactions } from "../../redux/clientSlice";
const TransactionStyle = styled.div`
    overflow-y: scroll;
    height: 90vh;
    
`

export default function Transactions({branch,userType}){
    
    let selectedAccount,client,accounts,account,transactions;
    if(userType==='client'){
        selectedAccount = useSelector(state=>state.client.selectedAccount);
        client = useSelector(state=>state.client.client);
        accounts = client.accounts
        account = accounts.find(acc => acc.accountId === selectedAccount);
        transactions = account.transactions;
    }else{
        selectedAccount = useSelector(state=>state.employee.selectedAccount)
    }
    // console.log(selectedAccount)
    const branchId = useSelector(state=>state.employee.employee.branch)
    // console.log(branchId)
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchData = async()=>{
            let transactionsFirebase;
            if(branch){
                transactionsFirebase = await fetchtransactionsByBranch(branchId)   
                // console.log(transactionsFirebase);
                dispatch(setTransactions(transactionsFirebase));
            }
            else{
                // console.log("this condition")
                // console.log(selectedAccount)
                transactionsFirebase = await fetchtransactionsByAccountId(selectedAccount)
                // console.log(transactionsFirebase);
                if(userType=='employee')
                dispatch(setTransactions(transactionsFirebase));
                else
                dispatch(setClientTransactions({transactions:transactionsFirebase,accountId:selectedAccount}))
            }
        }
        fetchData()
    },[dispatch])

    if(userType=='employee'){
        transactions = useSelector(state=>state.employee.transactions);
    }
 

    return (
        <TransactionStyle>
            <Header title={'TRANSACTIONS'} color={'#73ff51'}/>
            {transactions.map((transaction)=><TransactionBlock key={transaction.transactionId} transaction={transaction}/>)}
        </TransactionStyle>
    )
}