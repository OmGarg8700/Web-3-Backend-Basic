import React from "react";
import {LockContext} from '../context/LockContext';
const Input = () => {

    const {value, connectWallet, handleChange, formData, sendTransaction, getEtheriumContract} = React.useContext(LockContext);
    
    const handleSubmit = (e) => {
        const {sendTo, Amount_ether, keyword, message} = formData;

        e.preventDefault();

        if(!sendTo || !Amount_ether || !keyword || !message) return;
        console.log(
            sendTo,
            Amount_ether,
            message,
            keyword
        );
        sendTransaction();

     }

    return(
        <>
        <button style={{marginBottom:"20px"}} onClick={() => {connectWallet()}}>Connect to the wallet</button>

        <div>
            <input placeholder="Send To" name="sendTo" onChange={(e) => {handleChange(e, "sendTo")}} type="text"/>
            <input placeholder="Amount of Ether" name="Amount_ether" onChange={(e) => {handleChange(e, "Amount_ether")}}/>
            <input placeholder="keyword" name="keyword" onChange={(e) => {handleChange(e, "keyword")}}/>
            <input placeholder="Message" name="message" onChange={(e) => {handleChange(e, "message")}}/>
            <button onClick={(e) => {handleSubmit(e)}}>Initiate the transaction</button>
        </div>

        </>
    )
}

export default Input;