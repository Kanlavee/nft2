import React, { useState,useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { ethers } from "ethers";
import {CONTRACT_ABI} from "../Contract"

function EthereumBalanceCard() {
    const CONTRACT_ADDRESS="0x05A94a595AA1c551B2725638Ddc71CdF69a4DF0e"
    // Usetstate for storing wallets details.
    const [ethAddress, setEthAddress] = useState("");  
    const [ethBalance, setEthBalance] = useState(null);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        let provider = new ethers.BrowserProvider(window.ethereum)
        console.log("provider:"+provider)
        let signer = provider.getSigner()
        console.log("signer:"+signer)
        let c = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI,signer)
        console.log("c:"+c)
        setContract(c)
        console.log("Contract :"+contract)
    },[]);

    
    
    // Button handler button for handling a request window event for MetaMask.
    const buttonHandlerMetaMaskConnect = () => {

        if (window.ethereum) {

            // Open MetaMask window to read address.
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => setEthAddress(res[0])); // Just take first address for demo purposes.
            

        } else {
            alert("Metamask extension is not installed.");
        }
    };

    // Button handler button for handling a balance request for MetaMask.
    const buttonHandlerMetaMaskBalance = () => {

        // Get blanace in ETH in a right format from MetaMask.
        if(ethAddress) {

            window.ethereum
                .request({ 
                    method: "eth_getBalance", 
                    params: [ethAddress, "latest"] 
                })
                .then((balance) => {
                    setEthBalance(ethers.formatEther(balance));
                });
        }
    };

    //Mint Button
    const mintNft = async() => {
        try {
          setLoading(true)
          const mint = await contract.safeMint()
          await mint.wait()
          console.log("MINTED ", mint)
          setLoading(false)
        } catch(err) {
          console.log(err)
          setLoading(false)
        }
    };

    
    

    return (
        <Card className="text-center row">
            <Card.Header>
                <strong>ETH Balance</strong>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <label>
                        Balance of {ethAddress}: {ethBalance} {ethBalance ? ("ETH") : ("")}
                    </label>
                </Card.Text>
                <Button data-testid="meta-mask-button" onClick={buttonHandlerMetaMaskConnect} variant="primary" className="me-2">
                    Connect to MetaMask
                </Button>
                <Button onClick={buttonHandlerMetaMaskBalance} variant="primary" disabled={!ethAddress}>
                    Get balance
                </Button>
                <Button onClick={mintNft}>Mint</Button> 
            </Card.Body>
        </Card>
    )
}

export default EthereumBalanceCard
