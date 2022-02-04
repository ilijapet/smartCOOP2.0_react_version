import { useState, useEffect } from "react";

import { NetworkID } from "../helpers/housekeeping";
import { useEthers } from "@usedapp/core";

const Admin = () => {
  const { ethereum } = window;
  const [account, setAccount] = useState();
  const { chainId } = useEthers();

  const getAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const accountOne = accounts[0];
    setAccount(accountOne);
  };

  const getCoopEthBalance = () => {};
  const getCoopTokenBalance = () => {};
  const getCoopRasperies = () => {};
  const widrow = () => {};

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
        <button id="btn__widrow" onClick={widrow}>
          Widrow ETH{" "}
        </button>
      </section>
    </>
  );
};

export default Admin;
