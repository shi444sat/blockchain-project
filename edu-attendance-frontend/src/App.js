import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AttendanceToken from "./AttendanceToken.json"; // ABI file

const CONTRACT_ADDRESS = "0x5550D8253fe61dF835AbBde7f710c390d62AC85E";

function App() {
    const [attendance, setAttendance] = useState(0);
    const [account, setAccount] = useState("");

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, AttendanceToken.abi, signer);

                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]);

                const userAttendance = await contract.getAttendance(accounts[0]);
                setAttendance(userAttendance.toNumber());
            } else {
                alert("Please install MetaMask!");
            }
        };
        init();
    }, []);

    const markAttendance = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, AttendanceToken.abi, signer);

            const tx = await contract.markAttendance();
            await tx.wait();

            const updatedAttendance = await contract.getAttendance(account);
            setAttendance(updatedAttendance.toNumber());
        }
    };

    return (
        <div>
            <h1>Attendance System</h1>
            <p>Account: {account}</p>
            <p>Attendance: {attendance}</p>
            <button onClick={markAttendance}>Mark Attendance</button>
        </div>
    );
}

export default App;
