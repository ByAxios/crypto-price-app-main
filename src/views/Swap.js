import React from 'react';
import { useState, useEffect,useRef } from 'react';
import { ethers } from 'ethers';
import ContractAbi from '../artifacts/contracts/Bank2U.sol/Bank2U.json';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Swap() {

    const success = (amount) => toast.success(`succesfully deposited ${amount} ETHER`, {
        position: "top-right",

        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

        });;
        const danger = () => toast.error("Failed to deposit", {
            position: "bottom-center",
    
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
    
            });;
    // Properties

    const [walletAddress, setWalletAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(null)
    const [balance, setBalance] = useState(null)
    const depositAmount = useRef(0);
   
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
        '0x5FbDB2315678afecb367f032d93F642f64180aa3', // change this when deploy new contract
        ContractAbi.abi,
        signer
    )
    
    console.log('Contract initialised')



    window.ethereum.on('accountsChanged', function (accounts) {
        connectWallet()
        setWalletAddress(accounts[0])
        checkBalance()

    })
    // Create a provider to interact with a smart contract
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            checkBalance()

        }
    }

    async function requestAccount() {
        console.log('Requesting account...');
        setIsLoading(true)

        if (window.ethereum) {
            console.log('detected');

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setIsLoading(false)
                setWalletAddress(accounts[0]);

            } catch (error) {
                console.log('Error connecting...');
            }

        } else {
            alert('Meta Mask not detected');
        }
    }

    async function deposit(){
        try {
            setIsLoading(true)
            const options = {
              from: walletAddress,
              value: ethers.utils.parseEther(parseFloat(depositAmount.current.value).toString())
            }
    
            // call contract deposit method
            let txn = await contract.deposit(options)
            let txnResults = await txn.wait() // await for transaction to be mined
            console.log(txnResults)
    
            success(depositAmount.current.value)
            checkBalance() // initiate check balance
    
            setIsLoading(false)
          
          } catch (e) {
            console.log(e)
            setIsLoading(false)
            danger()
          }
    }

    async function checkBalance() {
        setIsLoading(true)

        // call contract balance method
        let balances = await contract.balance({
            from: walletAddress
        })

        // convert wei to ether
        setBalance(ethers.utils.formatEther(balances))// 1000000000000 = 1 ETH
        setIsLoading(false)
    }


    const shortAdress = (addr) => {

        let first = addr.slice(0, walletAddress.length - 24);
        let second = addr.slice(walletAddress.length - 4, walletAddress.length)
        return first + "..." + second
    }

    return (
        <div className="flex h-100 items-center justify-center">
           
            <ToastContainer />
            <header className="App-header">
                {walletAddress === null ? <>
                    <button
                        className={
                            isLoading
                                ?
                                "disabled cursor-not-allowed bg-teal-300 text-center p-2 px-3 rounded-md text-white"
                                :
                                "bg-teal-600 text-center p-2 px-3 rounded-md text-white"
                        }
                        onClick={requestAccount}
                    > {isLoading
                        ?
                        <div className="flex"><p className="animate-spin">🌍</p> Loading</div>
                        :
                        <><i className="fa-solid fa-wallet"></i> Connect Wallet</>
                        }
                    </button></>
                    :
                    <div></div>
                }
                {walletAddress && <div>
                    <h3 className="bg-purple-600 text-white p-4 mt-4 rounded-md">Kısa Address: {shortAdress(walletAddress)}</h3>
                    <h3 className="bg-red-600 p-4 text-white mt-4 rounded-md">Uzun Address: {walletAddress}</h3>
                    <input ref={depositAmount} className="p-3 bg-gray-200 rounded-md w-450" type="text" />
                    <button onClick={deposit} className="text-white rounded-md p-3 bg-green-600 mt-4 ml-2">Para Yatır</button>
                    <p>Bakiye: {balance}</p>
                </div>}
            </header>
        </div>
    );
}

export default Swap;