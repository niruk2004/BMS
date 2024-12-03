import styled from "styled-components"
import Dashboard from "../Components/UI/UserDetails/DashBoard/Dashboard"
import { Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { fetchAccountsByUID, fetchClient, fetchLoansByAccountId, fetchtransactionsByAccountId } from "../firestoreMethods"
import { setAccounts, setClient } from "../redux/clientSlice"

const PageContainer = styled.div`
    margin-top:70px;
    display: flex;
`
const dashBoardvariants = {
    hidden: { opacity: 0, flexBasis: '0%', overflow: 'hidden' },
    motion: { opacity: 1, flexBasis: '20%' } // Adjust percentage based on your layout
};

const clientPageVariants = {
    initial: { opacity: 0, x: 200 },
    final: { opacity: 1, x: 0 }
}

export default function ClientPage() {
    const dashboard = useSelector(state => state.app.dashboard);
    const userType = useSelector(state => state.auth.userType);
    const client = useSelector(state=>state.client.client)
    
    const location = useLocation();
    const dispatch = useDispatch();
    const animationkey = location.pathname

    
    useEffect(()=>{
        const fetchData = async()=>{
            const client = await fetchClient();
            const accounts = await fetchAccountsByUID();
            console.log(client)
            console.log(accounts)
            dispatch(setClient(client))
            dispatch(setAccounts(accounts));
            
        } 
        if(client.clientId==null){
            fetchData();
        }
    },[dispatch])

    

    return (
        <PageContainer>
            <AnimatePresence>
                {dashboard && (
                    <motion.div
                        initial="hidden"
                        animate="motion"
                        exit="hidden"
                        variants={dashBoardvariants}
                        transition={{ duration: 0.2 }}
                        style={{ flex: 0 }}
                    >
                        <Dashboard userType={userType} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                <motion.div
                    key={animationkey}
                    initial="initial"
                    animate="final"
                    variants={clientPageVariants}
                    transition={{ duration: 0.2 }}
                    style={{ flex: 4, padding: '1em' }}>
                    <Outlet />
                </motion.div>
            </AnimatePresence>

        </PageContainer>
    );
}
