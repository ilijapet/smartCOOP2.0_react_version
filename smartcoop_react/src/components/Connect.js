import React, { useState, useEffect } from 'react';
import Admin from './AdminProfile';
import Cooperant from './CooperantProfile';
import Bidder from './BidderProfile';


const ConnectButton = () => {

  const [OnOFF, setOnOFF] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cooperant, setCooperant] = useState(false);
  const [bidder, setBidder] = useState(false);
  

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
    } else {
      console.log("No authorized account found");
    }
  }
 

  const selection = (value) => {
    if (value === 1) {
      setAdmin(!admin)
    } else if (value === 2) {
      setCooperant(!cooperant)      
    } else {
      setBidder(!bidder)
    }    
  }
 
  
  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      selection(2)
      setOnOFF(!OnOFF); 
    } catch (err) {
      console.log(err)
    }  
  }


  const disconnectWallet = () => {
    window.location.reload(); 
    setOnOFF(!OnOFF);
  }

  const connect = () => {   
    return (   
      <div>
        <div>
          <button id="btn-connect" onClick={ connectWallet }>Connect to wallet </button>
        </div>   
      </div>   
    )     
  }

  const disconnect = () => {
    return (
    <>
    <div>      
        <button id="btn-disconnect" onClick={ disconnectWallet }> Discconect wallet </button>        
    </div>
    </>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])


  return (
      <>
      <div>
        {OnOFF ? disconnect() : connect() }   
        {admin && <Admin />}
        {cooperant && <Cooperant />}
        {bidder && <Bidder />}      
      </div>
    </>
  )

}



export default ConnectButton;

