import styled from "styled-components"
import Label from "../UI/Label"
import { useState } from "react"
import Header from "../UI/Header"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence,motion } from "framer-motion"
import CustomInput from "../UI/CustomInput"
import Button from "../UI/Button"
import { depositMoneyToAccount, fetchAccountsByBranch, fetchAccountsByClientId, withdrawMoneyFromAccount } from "../../firestoreMethods"
import { setAccounts } from "../../redux/clientSlice"

const AccountBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    cursor: pointer;
    
`
const AccountIdStyle = styled.div`
    background-color:${(props) => props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

const DepositHeaderStyle = styled.div`
    background-color:#b0ffee ;
    font-family: sans-serif;
    padding: 0.5em;
    font-size: 1.25em;
    font-weight:bold;
    border: solid 1px;
    flex: 1;
    text-align: center;
`
const LabelStyle = styled.div`
    display : flex ;
    font-family: sans-serif;
    font-size: 1.15em;
    border: solid 1px;
`

export default function AccountDetailBlock({ account, onclick }) {

    let backgroundColor = '#6affdf'
    const [showDropDown, setShowDropdown] = useState(false);
    const [amount, setAmount] = useState();
    const client = useSelector(state=>state.client.client)
    const userType = useSelector(state => state.auth.userType);
    const dispatch = useDispatch();
    function handleChange(e) {
        setAmount(e.target.value)
        console.log(amount)
    }
    async function handleDeposit(e){
        e.preventDefault();
        if(!amount)return;
        const result = await depositMoneyToAccount(account.accountId,amount);
        const accounts = await fetchAccountsByClientId(client.clientId)
        dispatch(setAccounts(accounts));
        setAmount();
        console.log(result);
    }
    async function handleWithdrawal(e){
        e.preventDefault();
        if(!amount)return;
        const result = await withdrawMoneyFromAccount(account.accountId,amount);
        const accounts = await fetchAccountsByClientId(client.clientId) 
        dispatch(setAccounts(accounts));
        setAmount();
        console.log(result)
    }
    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    }

    const dropdownVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
    };

    return (
        <AccountBlockContainer onClick={() => onclick(account.accountId)}>
            <div onClick={toggleDropdown}>
                <AccountIdStyle backgroundcolor={backgroundColor}>Account_ID : {account.accountId}</AccountIdStyle>
                <div style={{ display: 'flex' }}>
                    <Label label={'Account_Holder'} value={account.accountHolder} />
                    <Label label={"Account_Type"} value={account.accountType} />
                    <Label label={"Balance"} value={account.balance} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Label label={'Interest_Rate'} value={account.interestRate} />
                    <Label label={'Created_Date'} value={account.createdDate} />
                </div>
            </div>

            <AnimatePresence>
                {showDropDown && <motion.div initial="hidden" animate="visible" exit={"hidden"} variants={dropdownVariants} transition={{ duration: 0.1 }}>
                    {userType === 'client' &&
                        <form >
                            <CustomInput name={'amount'} label={"ENTER DEPOSIT/WITHDRAWAL AMOUNT"} onChange={handleChange} value={amount} type={"number"} configs={{ min: 0 }} required />
                            <div style={{ display: "flex" }}>
                                <Button title={'WITHDRAW'} color={'#8bc9ff'}  onClick={handleWithdrawal}/>
                                <Button type={"submit"} title={'DEPOSIT'} color={'#73ff51'}  onClick={handleDeposit}/>
                            </div>
                        </form>
                    }

                </motion.div>
                }
            </AnimatePresence>

        </AccountBlockContainer>
    )
}