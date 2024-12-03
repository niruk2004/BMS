import styled from "styled-components"
import Label from "../UI/Label"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const TransactionBlockContainer = styled.div`
    margin: 1em ;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.5em;
    cursor: pointer;
    &:hover{
        opacity: 0.75;
    }
`
const TransactionIdStyle = styled.div`
    background-color:${(props) => props.backgroundcolor};;
    color: black;
    font-family: sans-serif;
    font-size: 1.25em;
    padding: 0.25em;
`

export default function TransactionBlock({ transaction }) {
    const [showDropDown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    // Set background color based on transaction status
    const backgroundColor = transaction.status === 'Pending' ? '#ffba79' :
        transaction.status === 'Failed' ? '#ff8d8d' : '#73ff51';

    // Dropdown animation settings
    const dropdownVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
    };

    return (
        <TransactionBlockContainer onClick={toggleDropdown}>
            <TransactionIdStyle backgroundcolor={backgroundColor}>
                Transaction_ID : {transaction.transactionId}
            </TransactionIdStyle>
            <div style={{ display: 'flex'}}>
                <Label label={'Amount'} value={transaction.amount} />
                <Label label={"Status"} value={transaction.status} />
                <Label label={'Date'} value={transaction.date} />
            </div>
            <AnimatePresence>
                {showDropDown && (

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        transition={{ duration: 0.1 }}
                        style={{ display: 'flex', overflow: 'hidden' }}
                    >
                        {transaction.description.length > 0 && (
                            <Label label={'Description'} value={transaction.description} isdescription={true} />
                        )}
                        <Label label={'Recipient Account_ID'} value={transaction.recipient} />
                        <Label label={'Type'} value={transaction.type.toUpperCase()} />
                    </motion.div>


                )}
            </AnimatePresence>
        </TransactionBlockContainer>
    );
}