import React, { useState, useEffect } from 'react';


import { shortenAddress, useLookupAddress, useEthers } from '@usedapp/core';
import Discconect from './Disconnect';
import Admin from './AdminProfile';
import Cooperant from './CooperantProfile';
import Bidder from './BidderProfile';


const Connect = () => {
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cooperant, setCooperant] = useState(false);
  const [bidder, setBidder] = useState(false);
  const { activateBrowserWallet, account, chainId } = useEthers()
 

  const selection = (value) => {
    if (value === 1) {
      setAdmin(!admin)
    } else if (value === 2) {
      setCooperant(!cooperant)      
    } else {
      setBidder(!bidder)
    }    
  }

  const connect = () => {

  }

  const disconnect = () => {

  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])


  return (
      <>
    <div>
      <div>
        <button id="btn-connect" onClick={() => { activateBrowserWallet(); setShow(!show); selection(2)}}>Connect to wallet </button>
      </div>    
      {admin && <Admin />}
      {cooperant && <Cooperant />}
      {bidder && <Bidder />}
      {show && <Discconect />}
    </div>
    </>
  )
}



export default Connect;

