import { collection, addDoc ,query,where , getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth"

//fetch the client data of the current user
export const fetchClient = async()=>{
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log(currentUser);
   

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch client data from Firestore
        const userCollectionRef = collection(db, "clients");
        const clientDocRef = query(userCollectionRef, where("uid", "==", uid));
        const clientDocs = await getDocs(clientDocRef);

        if (clientDocs.empty) {
            alert("Client data not found in Firestore. Please contact support.");
            return;
        }

        const clientData = clientDocs.docs[0].data(); // Data for the current user
        
        console.log(clientData);
        return clientData;
    }catch(e){
        console.error("Error");
        console.log(e);
    }
}

//fetch the client data of the current user
export const fetchEmployee = async()=>{
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log(currentUser);
   

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch client data from Firestore
        const userCollectionRef = collection(db, "employees");
        const employeeDocRef = query(userCollectionRef, where("uid", "==", uid));
        const employeeDocs = await getDocs(employeeDocRef);

        if (employeeDocs.empty) {
            alert("Client data not found in Firestore. Please contact support.");
            return;
        }
        console.log("employee")
        const employeeData = employeeDocs.docs[0].data(); // Data for the current user
        console.log(employeeData);
        return employeeData;
    }catch(e){
        console.error("Error");
        console.log(e);
    }
}





//for fetching all the loans based on the given branch id 
export const fetchLoansByBranch = async (branchId) => {
    try {
        // Step 1: Fetch loans data from Firestore
        const loansCollectionRef = collection(db, "loans");
        const loansQuery = query(loansCollectionRef, where("branch", "==", branchId));
        const loansDocs = await getDocs(loansQuery);

        if (loansDocs.empty) {
            console.log(`No loans found for branch: ${branchId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const loansData = loansDocs.docs.map(doc => ({
            loanId: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(loansData); // Logs all matching loan documents
        return loansData;
    } catch (e) {
        console.error("Error fetching loans data by branch: ", e);
        return [];
    }
};

//for fetching all the loans based on the given branch id 
export const fetchClientsByBranch = async (branchId) => {
    try {
        // Step 1: Fetch loans data from Firestore
        const clientsCollectionRef = collection(db, "clients");
        const clientsQuery = query(clientsCollectionRef, where("branch", "==", branchId));
        const clientsDocs = await getDocs(clientsQuery);

        if (clientsDocs.empty) {
            console.log(`No loans found for branch: ${branchId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const clientsData = clientsDocs.docs.map(doc => ({
            clientId: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        // console.log(clientsData); // Logs all matching loan documents
        return clientsData;
    } catch (e) {
        console.error("Error fetching loans data by branch: ", e);
        return [];
    }
};



//for fetching all the transactions based on the given branch id
export const fetchtransactionsByBranch = async (branchId) => {
    try {
        // Step 1: Fetch transactions data from Firestore
        const transactionsCollectionRef = collection(db, "transactions");
        const transactionsQuery = query(transactionsCollectionRef, where("branch", "==", branchId));
        const transactionsDocs = await getDocs(transactionsQuery);

        if (transactionsDocs.empty) {
            console.log(`No transactions found for branch: ${branchId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const transactionsData = transactionsDocs.docs.map(doc => ({
            transactionId: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(transactionsData); // Logs all matching transaction documents
        return transactionsData;
    } catch (e) {
        console.error("Error fetching transactions data by branch: ", e);
        return [];
    }
};

//for fetching all the transactions based on the given branch id
export const fetchAccountsByBranch = async (branchId) => {
    try {
        // Step 1: Fetch transactions data from Firestore
        const accountsCollectionRef = collection(db, "accounts");
        const accountsQuery = query(accountsCollectionRef, where("branch", "==", branchId));
        const accountsDocs = await getDocs(accountsQuery);

        if (accountsDocs.empty) {
            console.log(`No transactions found for branch: ${branchId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const accountsData = accountsDocs.docs.map(doc => ({
            accountId: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(accountsData); // Logs all matching transaction documents
        return accountsData;
    } catch (e) {
        console.error("Error fetching transactions data by branch: ", e);
        return [];
    }
};

//for fetching all the transactions based on the given branch id
export const fetchAccountsByClientId = async (clientId) => {
    try {
        // Step 1: Fetch transactions data from Firestore
        const accountsCollectionRef = collection(db, "accounts");
        const accountsQuery = query(accountsCollectionRef, where("clientId", "==", clientId));
        const accountsDocs = await getDocs(accountsQuery);

        if (accountsDocs.empty) {
            console.log(`No transactions found for client: ${clientId}`);
            return [];
        }

        // Step 2: Map through documents and extract data
        const accountsData = accountsDocs.docs.map(doc => ({
            accountId: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(accountsData); // Logs all matching transaction documents
        return accountsData;
    } catch (e) {
        console.error("Error fetching transactions data by branch: ", e);
        return [];
    }
};



//for fetching all the loans based on the given account id
export const fetchLoansByAccountId = async (accountId) => {
    try {
        // Reference to the loans collection
        const loansCollectionRef = collection(db, "loans");

        // Query to find loans where the accountId matches the provided account ID
        const loansQuery = query(loansCollectionRef, where("accountId", "==", accountId));

        // Execute the query
        const loansSnapshot = await getDocs(loansQuery);

        // Extract the data from the documents
        const loansData = loansSnapshot.docs.map(doc => ({ loanId: doc.id, ...doc.data() }));

        if (loansData.length === 0) {
            console.log("No loans found for the given account ID.");
            return [];
        }

        console.log("Loans for the given account ID:", loansData);
        return loansData;

    } catch (error) {
        console.error("Error fetching loans for account ID:", error);
        throw new Error("Failed to fetch loans. Please try again.");
    }
};


//for fetching all the transactions based on the given account id
export const fetchtransactionsByAccountId = async (accountId) => {
    try {
        // Reference to the transactions collection
        console.log(accountId)
        const transactionsCollectionRef = collection(db, "transactions");

        // Query to find transactions where the accountId matches the provided account ID
        const transactionsQuery = query(transactionsCollectionRef, where("accountId", "==", accountId));

        // Execute the query
        const transactionsSnapshot = await getDocs(transactionsQuery);

        // Extract the data from the documents
        const transactionsData = transactionsSnapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));

        if (transactionsData.length === 0) {
            console.log("No transactions found for the given account ID.");
            return [];
        }

        console.log("transactions for the given account ID:", transactionsData);
        return transactionsData;

    } catch (error) {
        console.error("Error fetching transactions for account ID:", error);
        throw new Error("Failed to fetch transactions. Please try again.");
    }
};




export const updateLoanDetails = async (loanId, updatedFields,accountId) => {
    try {
        // Reference to the loan document
        const loanDocRef = doc(db, "loans", loanId);

        // Fetch the current loan data
        const loanSnapshot = await getDoc(loanDocRef);

        if (!loanSnapshot.exists()) {
            console.error("Loan not found");
            throw new Error("Loan not found. Please provide a valid loan ID.");
        }

        const loanData = loanSnapshot.data();

        // Prepare the updated loan data
        const updatedLoanData = {
            ...loanData,
            ...updatedFields, // Merge new fields with the existing data
        };

        // Update the loan details in Firestore
        await updateDoc(loanDocRef, updatedLoanData);

        console.log(`Successfully updated loan ${loanId}.`, updatedLoanData);


        // If the status is updated to 'Active', update the account balance
        if (updatedFields.status === 'Active') {
            // Reference to the account document
            const accountDocRef = doc(db, "accounts", accountId);

            // Fetch the current account data
            const accountSnapshot = await getDoc(accountDocRef);

            if (!accountSnapshot.exists()) {
                console.error("Account not found");
                throw new Error("Account not found. Please provide a valid account ID.");
            }

            const accountData = accountSnapshot.data();

            // Update the account balance by adding the loan amount
            const newBalance = accountData.balance + (loanData.loanAmount);

            // Update the account's balance in Firestore
            await updateDoc(accountDocRef, { balance: newBalance });

            console.log(`Account ${accountId} balance updated. New balance: ${newBalance}`);
        }

         // Fetch all loans from the loans collection
         let loansCollectionRef = collection(db, "loans");
         let loansSnapshot = await getDocs(loansCollectionRef);
 
         const allLoans = loansSnapshot.docs.map((doc) => ({
             loanId: doc.id,
             ...doc.data(),
         }));
 
         console.log("All loans after update:", allLoans);
        loansCollectionRef = collection(db, "loans");
        const loansQuery = query(loansCollectionRef, where("accountId", "==", accountId));
        loansSnapshot = await getDocs(loansQuery);

        const filteredLoans = loansSnapshot.docs.map((doc) => ({
            loanId: doc.id,
            ...doc.data(),
        }));

        console.log("Loans for accountId after update:", filteredLoans);

        return {
            success: true,
            message: `Loan updated successfully.`,
            updatedLoan: updatedLoanData,
            loans: filteredLoans,
            allLoans
        };

    } catch (error) {
        console.error("Error updating loan details:", error);
        throw new Error("Failed to update loan details. Please try again.");
    }
};

//fetching accounts by UID
export const fetchAccountsByUID = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        alert("No user is currently logged in. Please log in to continue.");
        return [];
    }

    const uid = currentUser.uid; // Firebase Auth UID
    
    try {
        // Step 1: Fetch loans data from Firestore
        const accountsCollectionRef = collection(db, "accounts");
        const accountsQuery = query(accountsCollectionRef, where("uid", "==", uid));
        const accountsDocs = await getDocs(accountsQuery);

        if (accountsDocs.empty) {
            console.log("No accounts found for the current user.");
            return [];
        }

        // Step 2: Map through documents and extract data
        const accountsData = accountsDocs.docs.map(doc => ({
            accountId: doc.id,    // Include document ID if needed
            ...doc.data()  // Spread document data
        }));

        console.log(accountsData); // Logs all matching loan documents
        return accountsData;
    } catch (e) {
        console.error("Error fetching Accounts data: ", e);
        return [];
    }
};

//for updating the balance amount when some amount is withdrawn
export const withdrawMoneyFromAccount = async (accountId, withdrawalAmount) => {
    try {
        // Reference to the account document
        const accountDocRef = doc(db, "accounts", accountId);

        // Fetch the current account data
        const accountSnapshot = await getDoc(accountDocRef);

        if (!accountSnapshot.exists()) {
            console.error("Account not found");
            throw new Error("Account not found. Please provide a valid account ID.");
        }

        const accountData = accountSnapshot.data();

        // Check if withdrawal is possible
        if (withdrawalAmount > accountData.balance) {
            console.error("Insufficient balance for withdrawal.");
            throw new Error("Insufficient balance. Please enter a valid amount.");
        }

        // Calculate the new balance
        const newBalance = accountData.balance - parseInt(withdrawalAmount);

        // Update the account's balance in Firestore
        await updateDoc(accountDocRef, { balance: newBalance });

        console.log(`Successfully withdrew ${withdrawalAmount} from account ${accountId}. New balance: ${newBalance}`);

        // Log the withdrawal as a transaction
        const transactionData = {
            accountId,
            amount: withdrawalAmount,
            branch: accountData.branch,
            uid: accountData.uid, // Assuming the account has a uid field for the user
            description: "Withdrawal",
            recipient: "self",
            status: "Completed",
            type: "Debit",
        };

        const transactionsCollectionRef = collection(db, "transactions");
        const transactionDocRef = await addDoc(transactionsCollectionRef, transactionData);

        console.log("Transaction logged successfully with ID:", transactionDocRef.id);

        return {
            success: true,
            message: `Withdrawal successful. New balance: ${newBalance}`,
            transactionId: transactionDocRef.id,
        };

    } catch (error) {
        console.error("Error withdrawing money:", error);
        throw new Error("Failed to withdraw money. Please try again.");
    }
};

//for updating the balance amount when some amount is deposited
export const depositMoneyToAccount = async (accountId, depositAmount) => {
    try {
        // Reference to the account document
        const accountDocRef = doc(db, "accounts", accountId);

        // Fetch the current account data
        const accountSnapshot = await getDoc(accountDocRef);

        if (!accountSnapshot.exists()) {
            console.error("Account not found");
            throw new Error("Account not found. Please provide a valid account ID.");
        }

        const accountData = accountSnapshot.data();

        // Calculate the new balance
        const newBalance = accountData.balance + parseInt(depositAmount);

        // Update the account's balance in Firestore
        await updateDoc(accountDocRef, { balance: newBalance });

        console.log(`Successfully deposited ${depositAmount} to account ${accountId}. New balance: ${newBalance}`);

        // Log the deposit as a transaction
        const transactionData = {
            accountId,
            amount: depositAmount,
            branch: accountData.branch,
            uid: accountData.uid, 
            description: "Deposit",
            recipient: "self",
            status: "Completed",
            type: "Credit",
        };

        const transactionsCollectionRef = collection(db, "transactions");
        const transactionDocRef = await addDoc(transactionsCollectionRef, transactionData);

        console.log("Transaction logged successfully with ID:", transactionDocRef.id);

        return {
            success: true,
            message: `Deposit successful. New balance: ${newBalance}`,
            transactionId: transactionDocRef.id,
        };

    } catch (error) {
        console.error("Error depositing money:", error);
        throw new Error("Failed to deposit money. Please try again.");
    }
};


//for updating the balance during a transaction. This does not log the transaction as it is done before in the user form before this is called.
export const conductTransaction = async (senderId, receiverId, transactionAmount) => {
    try {
        // Reference to sender and receiver documents
        const senderDocRef = doc(db, "accounts", senderId);
        const receiverDocRef = doc(db, "accounts", receiverId);

        // Fetch sender and receiver data
        const senderSnapshot = await getDoc(senderDocRef);
        const receiverSnapshot = await getDoc(receiverDocRef);

        if (!senderSnapshot.exists() || !receiverSnapshot.exists()) {
            console.error("Sender or receiver account not found.");
            throw new Error("Invalid sender or receiver account ID.");
        }

        const senderData = senderSnapshot.data();
        const receiverData = receiverSnapshot.data();

        // Validate sender's balance
        if (transactionAmount > senderData.balance) {
            console.error("Insufficient balance in sender's account.");
            throw new Error("Sender has insufficient balance. Transaction cannot proceed.");
        }

        // Perform the balance updates
        const updatedSenderBalance = senderData.balance - transactionAmount;
        const updatedReceiverBalance = receiverData.balance + transactionAmount;

        // Update both accounts in Firestore
        const batch = writeBatch(db);
        batch.update(senderDocRef, { balance: updatedSenderBalance });
        batch.update(receiverDocRef, { balance: updatedReceiverBalance });

        // Commit the batch update
        await batch.commit();

        console.log(`Transaction successful. ${transactionAmount} transferred from ${senderId} to ${receiverId}.`);
        console.log(`New sender balance: ${updatedSenderBalance}`);
        console.log(`New receiver balance: ${updatedReceiverBalance}`);

        return {
            success: true,
            message: `Transaction successful.`,
            updatedSenderBalance,
            updatedReceiverBalance,
        };
    } catch (error) {
        console.error("Error conducting transaction:", error);
        throw new Error("Failed to conduct the transaction. Please try again.");
    }
};








