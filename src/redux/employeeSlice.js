import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee:{
            employeeId:'e1',
            personalInfo:{
                firstName:'John',
                lastName:'Daniel',
                DOB:'12-03-1998'
            },
            contactInfo:{
                phoneNo: '+91-1234567890',
                email:'john_daniel@gmail.com',
                address:'123 Secondary St, Ampur, New Delhi, India'
            },
            employeeDetails:{
                position:'Admin',
                branch:'Branch 1',
            },
            createdTime: '2024-01-01T10:00:00Z',
            lastLoginTime: '2024-10-01T08:30:00Z',
            clients:[
                {
                    clientId: 'c1',
                    personalInfo: {
                        firstName: 'John',
                        lastName: 'Doe',
                        DOB: '12-01-2004',
                    },
                    contactInfo: {
                        phoneNo: '+91-9876543210',
                        email: 'johndoe@gmail.com',
                        address: '123 Main St, New Delhi, India'
                    },
                    accounts: [
                        {
                            accountId: 'a1',
                            accountHolder: 'John Doe 1.0',
                            accountType: 'Savings',
                            balance: 25250,
                            interestRate:2.5, 
                            createdDate: '2022-05-01',
                            transactions: [ //later only the transaction ids will be stored
                                {
                                    id: 'txn001',
                                    date: '2024-10-01',
                                    amount: 5000,
                                    type: 'credit',
                                    description: 'Salary Payment',
                                    status: 'Completed',
                                    recipient: 'a1',
                                },
                                {
                                    id: 'txn002',
                                    date: '2024-10-05',
                                    amount: 1500,
                                    type: 'debit',
                                    description: 'Grocery Shopping',
                                    status: 'Completed',
                                    recipient: 'a2',
                                },
                                {
                                    id: 'txn003',
                                    date: '2024-10-12',
                                    amount: 200,
                                    type: 'debit',
                                    description: 'Electricity Bill',
                                    status: 'Pending',
                                    recipient: 'a1',
                                },
                                {
                                    id: 'txn004',
                                    date: '2024-10-15',
                                    amount: 10000,
                                    type: 'credit',
                                    description: 'Freelance Project Payment',
                                    status: 'Completed',
                                    recipient: 'a1',
                                },
                                {
                                    id: 'txn005',
                                    date: '2024-10-20',
                                    amount: 3000,
                                    type: 'debit',
                                    description: 'Restaurant Bill',
                                    status: 'Completed',
                                    recipient: 'a3',
                                },
                                {
                                    id: 'txn006',
                                    date: '2024-10-25',
                                    amount: 250,
                                    type: 'debit',
                                    description: '',
                                    status: 'Failed',
                                    recipient: 'a4',
                                },
                                {
                                    id: 'txn007',
                                    date: '2024-10-27',
                                    amount: 4500,
                                    type: 'credit',
                                    description: 'Investment Return',
                                    status: 'Completed',
                                    recipient: 'a2',
                                },
                                {
                                    id: 'txn008',
                                    date: '2024-10-30',
                                    amount: 1200,
                                    type: 'debit',
                                    description: 'Online Shopping',
                                    status: 'Completed',
                                    recipient: 'a2',
                                },
        
                            ],
                            loans: [
                                {
                                    id: 'loan003',
                                    amount: 200000,
                                    interestRate: 7.2,
                                    startDate: '2022-11-01',
                                    endDate: '2027-11-01',
                                    monthlyPayment: 3500,
                                    status: 'Active',
                                    loanTerm:5,
                                    loanType:'auto',
                                },
                            ],
                        },
                        {
                            accountId: 'a2',
                            accountHolder: 'John Doe',
                            accountType: 'Current',
                            balance: 25000,
                            interestRate: 4.5, // in percentage
                            createdDate: '2023-01-01',
                            transactions: [ //later only the transaction ids will be stored
                                {
                                    id: 'txn001',
                                    date: '2024-10-01',
                                    amount: 5000,
                                    type: 'credit',
                                    description: 'Salary Payment',
                                    status: 'Completed',
                                    recipient: 'a1',
                                },
                                {
                                    id: 'txn002',
                                    date: '2024-10-05',
                                    amount: 1500,
                                    type: 'debit',
                                    description: 'Grocery Shopping',
                                    status: 'Completed',
                                    recipient: 'a2',
                                },
                                {
                                    id: 'txn003',
                                    date: '2024-10-12',
                                    amount: 200,
                                    type: 'debit',
                                    description: 'Electricity Bill',
                                    status: 'Pending',
                                    recipient: 'a1',
                                },
                                {
                                    id: 'txn004',
                                    date: '2024-10-15',
                                    amount: 10000,
                                    type: 'credit',
                                    description: 'Freelance Project Payment',
                                    status: 'Completed',
                                    recipient: 'a1',
                                },
                            ],
                            loans: [
                                {
                                    id: 'loan003',
                                    amount: 200000,
                                    interestRate: 7.2,
                                    startDate: '2022-11-01',
                                    endDate: '2027-11-01',
                                    monthlyPayment: 3500,
                                    status: 'Active',
                                    loanTerm:5,
                                    loanType:'education'
                                },
                                {
                                    id: 'loan002',
                                    amount: 140000,
                                    interestRate: 2.2,
                                    startDate: '2022-10-23',
                                    endDate: '2025-10-23',
                                    monthlyPayment: 5000,
                                    status: 'Closed',
                                    loanTerm:3,
                                    loanType:'personal'
                                },
                            ],
                        }
                    ],
                    branchId: 'b1',
                    createdTime: '2024-01-01T10:00:00Z',
                    lastLoginTime: '2024-10-01T08:30:00Z',
                },
                {
                    clientId: 'c2',
                    personalInfo: {
                        firstName: 'John',
                        lastName: 'Alberto',
                        DOB: '12-01-2004',
                    },
                    contactInfo: {
                        phoneNo: '+91-9876543210',
                        email: 'johndoe@gmail.com',
                        address: '123 Main St, New Delhi, India'
                    },
                    accounts: [
                        {
                            accountId: 'a3',
                            accountHolder: 'John Doe 1.0',
                            accountType: 'Savings',
                            balance: 2000,
                            interestRate:2.5, 
                            createdDate: '2022-05-01',
                            transactions: [ //later only the transaction ids will be stored
                                {
                                    id: 'txn001',
                                    date: '2024-10-01',
                                    amount: 5000,
                                    type: 'credit',
                                    description: 'Salary Payment',
                                    status: 'Completed',
                                    recipient: 'a1',
                                },
                                {
                                    id: 'txn002',
                                    date: '2024-10-05',
                                    amount: 1500,
                                    type: 'debit',
                                    description: 'Grocery Shopping',
                                    status: 'Completed',
                                    recipient: 'a2',
                                },
                                {
                                    id: 'txn003',
                                    date: '2024-10-12',
                                    amount: 200,
                                    type: 'debit',
                                    description: 'Electricity Bill',
                                    status: 'Pending',
                                    recipient: 'a1',
                                },
                                
        
                            ],
                            loans: [
                                {
                                    id: 'loan003',
                                    amount: 200000,
                                    interestRate: 7.2,
                                    startDate: '2022-11-01',
                                    endDate: '2027-11-01',
                                    monthlyPayment: 3500,
                                    status: 'Active',
                                    loanTerm:5,
                                    loanType:'auto',
                                },
                            ],
                        },
                        
                    ],
                    branchId: 'b1',
                    createdTime: '2024-01-01T10:00:00Z',
                    lastLoginTime: '2024-10-01T08:30:00Z',
                },
            ] ,
        },  
        accounts:[],
        transactions:[],
        loans:[],
        selectedClient:null,
        selectedAccount:null,
    },
    reducers: {
        setSelectedClient(state, action) {
            const client_ID = action.payload.selectedClient;
            if (client_ID == '') state.selectedClient = null;
            else state.selectedClient = action.payload.selectedClient;
        },
        resetClientId(state,action){
            state.selectedClient=null;
        },
        setselectedAccount(state,action){
            state.selectedAccount = action.payload
        },
        setEmployee(state,action){
            state.employee=action.payload;
            // console.log(state.employee)
        },
        setClients(state,action){
            state.clients = action.payload;
        },
        setAccounts(state,action){
            console.log("Setted Accounts");
            state.accounts = action.payload;
        },
        setTransactions(state,action){
            state.transactions = action.payload;
        },
        setLoans(state,action){
            state.loans = action.payload
        }
    }
});

export const { setSelectedClient,resetClientId ,setClients,setEmployee,setAccounts,setselectedAccount,setTransactions,setLoans} = employeeSlice.actions;
export default employeeSlice.reducer;