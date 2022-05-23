import { useState, useEffect } from "react";

import {
  NetworkID,
  coopContract,
  MakeQuerablePromise,
  sleep,
  progressButton,
} from "../helpers/housekeeping";
import { useEthers } from "@usedapp/core";

/**
 * A simple admin dashboard that allows you to withdraw all the funds from the smart contract to pause/unpause diifrent fucntions from contract.
 * @returns The Admin component is being returned.
 */
const Admin = () => {
  const { ethereum } = window;
  const [buttonText, setButtonText] = useState("Withdraw all funds");
  const [pauseButtonText, setPauseButtonText] = useState("Pause");
  const [playButtonText, setPlayButtonText] = useState("Play");

  const [account, setAccount] = useState();
  const [newWidth, setNewWidth] = useState("0%");
  const [newWidthPause, setNewWidthPause] = useState("0%");
  const [newWidthPlay, setNewWidthPlay] = useState("0%");
  const { chainId } = useEthers();

  const getAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const accountOne = accounts[0];
    setAccount(accountOne);
  };
  const withdraw = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    var done = coopContract.withdraw();
  };

  const pause = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    var done = coopContract.pause()
  };

  const play = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];
    var done = coopContract.unpause()

  }
  useEffect(() => {
    getAccount();
  });

  return (
    <>
      <section className="container">
        <p style={{ fontSize: 20 }}> Admin dashboard </p>
        <p> Currently connected to {NetworkID[chainId]} network </p>
        {<p> Connected account: {account}</p>}
        <p> Currently on COOPaccount ETH: </p>
        <p> Currently rasperies in SmartCOOP warehuse </p>
        <p> Payed in COOP tokens to cooperants </p>

        <button id="btn__withdraw" onClick={withdraw}>
          <div
            className="button__progress_withdraw"
            style={{ width: newWidth }}
          ></div>
          {buttonText}
        </button>

        <button id="btn__withdraw" onClick={pause}>
          <div
            className="button__progress_withdraw"
            style={{ width: newWidthPause }}
          ></div>
          {pauseButtonText}
        </button>

        <button id="btn__withdraw" onClick={play}>
          <div
            className="button__progress_withdraw"
            style={{ width: newWidthPlay }}
          ></div>
          {playButtonText}
        </button>
      </section>
    </>
  );
};

export default Admin;
