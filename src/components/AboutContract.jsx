import {React,useState,useEffect} from 'react'
import Web3 from 'web3';
import MyNFT from "../MyNFT.json"
import {toInteger } from "lodash"
const contractAddress ="0x05A94a595AA1c551B2725638Ddc71CdF69a4DF0e"

const AboutContract = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]); // State to store connected accounts

  const initializeWeb3 = async () => {
    try {
      if (window.ethereum) {
        // Modern dapp browsers (like MetaMask)
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        await connectToWallet();
      } else {
        console.error("No wallet detected.");
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
    }
  };

  const connectToWallet = async () => {
    try {
      await window.ethereum.enable(); // Request access to accounts
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const handleClick = async () => {
    if (!web3) {
      console.error("Web3 is not initialized yet.");
      return;
    }

    try {
      if (accounts.length === 0) {
        console.error("No connected accounts.");
        return;
      }

      const sender = accounts[0]; // Use the connected account
      console.log(sender)
      const contract = new web3.eth.Contract(MyNFT.abi, contractAddress);
      const TOTAL = await contract.methods.totalSupply().call();
      const web3Instance = new Web3(window.ethereum);
      
      console.log( "totalSupply :"+TOTAL)
      console.log("Name :"+await contract.methods.name().call() )
      console.log("Owner :"+await contract.methods.owner().call() )
      console.log("Symbol :"+await contract.methods.symbol().call() )

      const tx = await contract.methods.safeMint(sender);
      const gasPrice = await web3Instance.eth.getGasPrice();
      const gasLimit = await web3Instance.eth.estimateGas({
        to: contractAddress,
        from: sender,
        value: 0,
        data: tx.encodeABI()
        })
        
      const transactionParameters = {
          to: contractAddress,
          from: sender,
          value: Web3.utils.toHex(0),
          nonce: await toInteger(web3Instance.eth.getTransactionCount(sender)),
          chainId: 150,
          gasPrice: Web3.utils.toHex(gasPrice),
          gasLimit: Web3.utils.toHex(gasLimit),
          data: tx.encodeABI()
      };

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
        }).then().catch(error => {
          console.error(error);
        })

      
    } catch (error) {
      console.error("Error:", error);
    }
  };

//   const tx = await clientRegistrar.transferFrom(account, recipient.input, domainName);
// const gasPrice = await web3Instance.eth.getGasPrice();




  // const contract = new web3.eth.Contract(MyNFT.abi, contractAddress);
  // const TOTAL =  contract.methods.totalSupply().call();
  // const Name = contract.methods.name().call()

  useEffect(() => {
    initializeWeb3();
  }, []);




  // useEffect (()=>{

  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  //   const initializeWeb3 = async () => {
  //     if (window.ethereum) {
  //       const web3Instance = new Web3(window.ethereum);
  //       console.log(web3Instance)
  //       try {
  //         await window.ethereum.enable(); // Request user permission
  //         setWeb3(web3Instance);
  //       } catch (error) {
  //         console.error("User denied account access");
  //       }
  //     } else {
  //       console.error("Web3 not detected. Consider installing MetaMask.");
  //     }
      
      

  //     if (web3) {
  //       console.log("<<<<<<<<<<<<<<<<<<<<<<<<<")
  //       const contractInstance = new web3.eth.Contract(ContractABI, contractAddress);
  //       console.log(contractInstance)
  //       // Now you can call contract methods and send transactions
  //       // contractInstance.methods.someMethod().call((error, result) => {
  //       //   if (!error) {
  //       //     console.log(result);
  //       //   } else {
  //       //     console.error(error);
  //       //   }
  //       // });
  //     }
  //   };

  //   initializeWeb3();

  // },[])

   
  
  
  return (
    <div>
        <h1>AboutContract</h1>
        <p>ContractAddress : {contractAddress}</p>

        <div>
        {accounts.length > 0 ? (
          <p>Connected Account: {accounts[0]}</p>
        ) : (
          <button onClick={connectToWallet}>Connect Wallet</button>
        )}
      </div>
      <div>
        <button onClick={handleClick} disabled={accounts.length === 0}>
          Mint NFT
        </button>
      </div>


    </div>
  )
}

export default AboutContract