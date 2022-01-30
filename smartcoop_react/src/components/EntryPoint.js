import React, { useState, useEffect } from "react";

import Admin from "./AdminProfile";
import Cooperant from "./CooperantProfile";
import Bidder from "./BidderProfile";
import { coopContract } from "../helpers/housekeeping";

const EntryPoint = () => {
  const [OnOFF, setOnOFF] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cooperant, setCooperant] = useState(false);
  const [bidder, setBidder] = useState(false);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];

    if (accounts.length !== 0) {
      console.log("Found an authorized account: ", account);
    } else {
      console.log("No authorized account found");
    }
    console.log(ethereum.chainId);

    if (ethereum.chainId !== "0x2a") {
      alert(
        "If you would like to use this DApp please set your network   in MetaMask to KOVAN network"
      );
    }
  };

  const selection = async (props) => {
    let user_balance = await coopContract.methods
      .getUserAccountBalance(props)
      .call();
    if (user_balance[0] !== "0") {
      setCooperant(!cooperant);
    } else if (props === "0x273f4FCa831A7e154f8f979e1B06F4491Eb508B6") {
      setAdmin(!admin);
    } else {
      setBidder(!bidder);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window;

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log("Found an account! Address: ", account);
      selection(account);
      setOnOFF(!OnOFF);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = () => {
    window.location.reload();
    setOnOFF(!OnOFF);
  };

  const connect = () => {
    return (
      <div>
        <div>
          <button id="btn-connect" onClick={connectWallet}>
            Connect wallet
          </button>
        </div>
      </div>
    );
  };

  const disconnect = () => {
    return (
      <div>
        <button id="btn-disconnect" onClick={disconnectWallet}>
          Discconect wallet
        </button>
      </div>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <>
      <div>
        {OnOFF ? disconnect() : connect()}
        {admin && <Admin />}
        {cooperant && <Cooperant />}
        {bidder && <Bidder />}
      </div>
    </>
  );
};

export default EntryPoint;
