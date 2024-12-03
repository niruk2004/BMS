import styled from "styled-components"
import Dashboard from "../Components/UI/UserDetails/DashBoard/Dashboard"
import { Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { fetchClientsByBranch, fetchEmployee } from "../firestoreMethods"
import { setClients, setEmployee } from "../redux/employeeSlice"
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

export default function EmployeePage() {
    const dashboard = useSelector(state => state.app.dashboard);
    const userType = useSelector(state => state.auth.userType);
    const location = useLocation();
    const animationkey = location.pathname
   
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchData = async()=>{
            const employee = await fetchEmployee();
            const clients = await fetchClientsByBranch(employee.branch)
            dispatch(setEmployee(employee));
            dispatch(setClients(clients))
        } 
        fetchData();
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