import React from "react";
import { LockContext } from "../context/LockContext";

const SeeTransactions = () => {
    const {getAllTransactions} = React.useContext(LockContext);
    const [data, setdata] = React.useState();

    const fun = async() =>{
        const d = await getAllTransactions();
        setdata(d)
    }

    fun()
    console.log(data);

    // here we can use data to see all the transactions
    return(
        <>
        <h1>Hello</h1>
        </>
    )
}

export default SeeTransactions;