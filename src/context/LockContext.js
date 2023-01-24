import React, { useEffect } from "react";
import { ethers } from "ethers";

import { ContractAbi, ContractKey } from "../utils/keys";

const {ethereum} = window;

export const LockContext = React.createContext();

const getEtheriumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const LockContract = new ethers.Contract(ContractKey, ContractAbi, signer);

    return LockContract;
};

export const LockProvider = ({childeren}) => {
    const [Account_address, setAccount_address] = React.useState("");
    const [formData, setformData] = React.useState({sendTo: "", Amount_ether: "", keyword: "", message: ""});
    const [isLoading, setisLoading] = React.useState(false);
    const [Transactions, setTransactions] = React.useState([]);

    const handleChange = (e, name) => {
        setformData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async() =>{

        if(!ethereum){
            // alert("Please install metamask")
            return console.log("Please install metamask");
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});
        
        if(accounts.length){
            setAccount_address(accounts[0]); 
        }
        else{
            console.log("No accounts found");
        }
    };

    const connectWallet = async() => {

        try {
            if(!ethereum){
                // alert("Please install metamask")
                console.log("Please install metamask");
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'}); 
            console.log("Wallet connected succesfully");
            
        } catch (error) {
            console.log(error);
            throw new Error("Etherium object not found");
        }
    }

    const sendTransaction = async() => {
        try {
            if(!ethereum){
                // alert("Please install metamask")
                console.log("Please install metamask");
                return;
            }

            // get data from the form
            const {sendTo, Amount_ether, keyword, message} = formData;
            console.log(
                sendTo,
                Amount_ether,
                keyword,
                message
            );
            const LockContract = getEtheriumContract();

            const parsedAmount = ethers.utils.parseEther(Amount_ether);

            await ethereum.request({
                method: "eth_sendTransaction",
                params:[{
                    from: Account_address,
                    to: sendTo,
                    gas: "0x5208",   // this is hexadecimal value for gas : first converted to decimal -> then to gwei -> then to ethers
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await LockContract.addToBlockchain(sendTo, parsedAmount, message, keyword);

            setisLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setisLoading(false);

            window.location.reload(); 
        } catch (error) {
            console.log(error);
            throw new Error("Etherium object not found");
        }
    }

    const getAllTransactions = async() => {
        try {
            if(!ethereum){
                console.log("Please install metamask");
                return;
            }
            const LockContract = getEtheriumContract();
            
            const all_transactions = await LockContract.getAllTransactions();

            const structure_transaction = {
                addressTo: "",
                addressFrom: "",
                timestamp: "",
                message: "",
                keyword: "",
                amount: ""
            }

            all_transactions.map((transaction) => {
                
                structure_transaction.addressTo = transaction.receiver;
                structure_transaction.addressFrom = transaction.sender;
                structure_transaction.amount = parseInt(transaction.amount._hex) / (10 ** 18);
                structure_transaction.message = transaction.message;
                structure_transaction.timestamp = new Date(transaction.timestamp.toNumber() * 1000).toLocaleString();
                structure_transaction.keyword = transaction.keyword;
            });
            
            return all_transactions;

        } catch (error) {
            console.log(error);            
        }
    }

    React.useEffect(() => {
        checkIfWalletIsConnected();
    }, [])


    return(
        <LockContext.Provider value={{
            value:'test',
            connectWallet,
            handleChange,
            formData,
            sendTransaction,
            getEtheriumContract,
            getAllTransactions
        }}
        >
            {childeren}
        </LockContext.Provider>
    )
};