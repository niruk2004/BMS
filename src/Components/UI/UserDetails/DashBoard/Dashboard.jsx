import { useDispatch, useSelector } from "react-redux"
import DashboardTab from "./DashboardTab";
import styled from "styled-components";
import SelectInput from "../../SelectInput";
import { useNavigate } from "react-router-dom";
import { setLoans, setSelectedAccount, setTransactions } from "../../../../redux/clientSlice";
import { useEffect } from "react";
import { fetchLoansByAccountId, fetchtransactionsByAccountId } from "../../../../firestoreMethods";

const DashboradContainer = styled.div`
    border-right: solid 1px;
    margin: 0 1em 0 0;
    display: flex;
    flex-direction: column;
    height: 95vh;
`

export default function Dashboard({ userType }) {
    let dashboardTabs;

    const selectedAccountClient = useSelector(state => state.client.selectedAccount);
    const selectedAccountEmployee = useSelector(state=>state.employee.selectedAccount);
    const client = useSelector(state => state.client.client);
    const employee = useSelector(state => state.employee)
   
    const accounts = client.accounts;
    const options = accounts.map(account => account.accountId);
    
   
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
        const fetchData = async()=>{
            if(selectedAccountClient){
                const loans =await fetchLoansByAccountId(selectedAccountClient);
                const transactions =await fetchtransactionsByAccountId(selectedAccountClient);
                console.log(transactions)
                console.log(loans);
                dispatch(setTransactions({transactions:transactions,accountId:selectedAccountClient}));
                dispatch(setLoans({loans:loans,accountId:selectedAccountClient}))
            }else{
            }
        }
        fetchData()
    },[dispatch,selectedAccountClient])

    function handleAccountChange(event) {
        const selectedAccountId = event.target.value;
        if (selectedAccountId.length != 0) {
            dispatch(setSelectedAccount({ selectedAccount: selectedAccountId }));
            navigate(`accounts/${selectedAccountId}`);
        }
        else {
            dispatch(setSelectedAccount({ selectedAccount: null }));
            navigate('');
        }
    }

    if (userType === 'client') {
        dashboardTabs = [
            { link: ``, title: 'User Details' },
            { link: `accounts/new`, title: 'Add A New Account' }
        ]
        if (selectedAccountClient != null) {
            dashboardTabs = [...dashboardTabs,
            { link: 'accounts', title: 'Accounts' },
            { link: `accounts/${selectedAccountClient}/transactions`, title: 'Transactions' },
            { link: `accounts/${selectedAccountClient}/loans`, title: 'Loans' },
            { link: `accounts/${selectedAccountClient}/transactions/new`, title: 'Make Transaction' },
            { link: `accounts/${selectedAccountClient}/loans/new`, title: 'Apply Loan' },

            ]
        }
    }
    if (userType === 'employee') {
        dashboardTabs = [
            { link: '', title: 'Employee Details' },
            { link: 'clients', title: 'View All Clients' },
            { link:'accounts',title:'All Accounts'},
            { link:'transactions',title:'All Transactions'},
            { link:'loans',title:'Manage Loans'},
        ]
        if(selectedAccountEmployee!=null){
            dashboardTabs=[...dashboardTabs,
                { link: `clients/${client.clientId}/accounts/${selectedAccountEmployee}`, title: 'Client Accounts' },
                { link: `clients/${client.clientId}/accounts/${selectedAccountEmployee}/transactions`, title: 'Account Transactions' },
                { link: `clients/${client.clientId}/accounts/${selectedAccountEmployee}/loans`, title: 'Account Loans' },
            ]
        }
    }

    return (
        <DashboradContainer>
            {userType == 'client' && <div>
                <SelectInput label={'Select Account'} options={options} name={'account'} onChange={handleAccountChange} />
            </div>}
            <div style={{marginTop:'2em'}}>
                {
                    dashboardTabs.map((dashboardTab) => {
                        return <DashboardTab key={dashboardTab.link} link={dashboardTab.link} title={dashboardTab.title} />
                    })
                }
            </div>

        </DashboradContainer>
    )
}