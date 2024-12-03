import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name: 'client',
    initialState: {
        client: {
            clientId:null,
            accounts:[],
            personalInfo:{
                firstName:'',
                lastName:'',
                DOB:''
            },
            contactInfo:{
                email:'',
                phone:'',
                address:'',
            }
        },
        isEditting: false,
        selectedAccount: null,
    },
    reducers: {
        deleteAccount(state, action) {
            state.accountId = null;
            state.branchId = null;
        },
        editContactInfo(state, action) {
            state.contactInfo = {
                email: state.contactInfo.email,
                phoneNo: action.payload.phoneNo,
                address: action.payload.address
            };
        },
        setSelectedAccount(state, action) {
            const account_ID = action.payload.selectedAccount;
            if (account_ID == '') state.selectedAccount = null;
            else state.selectedAccount = action.payload.selectedAccount;
        },
        addTransaction(state,action){
            const transaction = action.payload.transaction;
            //console.log(transaction);
            const account = state.client.accounts.find((account)=>account.accountId===action.payload.accountId);
            account.transactions.push(transaction);
            account.balance-=transaction.amount;
            console.log("added");
            //console.log(account.transactions);
        },
        addLoan(state,action){
            const loan  = action.payload.loan;
            console.log(loan);
            const account = state.client.accounts.find((account)=>account.accountId===action.payload.accountId);
            account.loans.push(loan);
            console.log("Loan added (Waiting for approval)");
        },
        resetAccountId(state,action){
            state.selectedAccount=null;
        },
        addAccount(state,action){
            const account = action.payload.account;
            const accounts = state.client.accounts;
            accounts.push(account);
            console.log("Account added..");
        },
        setClient(state,action){
            const client = action.payload;
            state.client = client;
        },
        setAccounts(state,action){
            const accounts = action.payload;
            state.client.accounts = accounts;
        },
        setTransactions(state,action){
            const transactions = action.payload.transactions;
            const account = state.client.accounts.find((account)=>account.accountId===action.payload.accountId);
            account.transactions=transactions
        },
        setLoans(state,action){
            const loans = action.payload.loans;
            const account = state.client.accounts.find((account)=>account.accountId===action.payload.accountId);
            account.loans=loans
        },
    }
});

export const { addAccount, deleteAccount, editContactInfo, setSelectedAccount,addTransaction,addLoan,resetAccountId ,setClient,setAccounts,setTransactions,setLoans} = clientSlice.actions;
export default clientSlice.reducer;