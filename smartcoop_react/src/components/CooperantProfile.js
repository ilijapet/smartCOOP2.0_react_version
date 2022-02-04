import { useEffect, useState } from "react";

import {
  NetworkID,
  coopContract,
  sleep,
  MakeQuerablePromise,
} from "../helpers/housekeeping";
import { useEthers } from "@usedapp/core";
import AddToken from "./AddToken";

/**
 * This function is responsible for rendering the user dashboard.
 * @returns The component
 */
const User = () => {
  const [inputData, setInputData] = useState("");
  const [buttonText, setButtonText] = useState("Deposit your raspberry");
  const [newWidth, setNewWidth] = useState("0%");
  const [account, setAccount] = useState("");
  const [cooperantBalance, setCooperantBalance] = useState("");
  const [totalRaspberies, setTotalRaspberies] = useState("");
  const [addCoopToken, setAddCoopToken] = useState(false);
  const { ethereum } = window;
  const { chainId } = useEthers();

  const getAccount = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const accountOne = accounts[0];
    setAccount(accountOne);
    const cooperantsAccountsBalance = await coopContract.methods
      .getUserAccountBalance(accountOne)
      .call();
    setCooperantBalance(cooperantsAccountsBalance[2]);
    setTotalRaspberies(cooperantsAccountsBalance[1]);
  };

  const getBalance = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const accountOne = accounts[0];
    const cooperantsAccountsBalance = await coopContract.methods
      .getUserAccountBalance(accountOne)
      .call();
    setCooperantBalance(cooperantsAccountsBalance[2]);
    setTotalRaspberies(cooperantsAccountsBalance[1]);
  };

  const progressButton = async (props) => {
    var myTrans = MakeQuerablePromise(props);
    let x = 10;
    while (myTrans.isFulfilled() === false) {
      myTrans = MakeQuerablePromise(props);
      setNewWidth(x.toString() + "%");
      await sleep(1000);
      x += 5;
    }
    setNewWidth("100%");
  };

  // Deposit your raspberry
  const depositRaspberry = async (props) => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = accounts[0];

    let cooperants = await coopContract.methods
      .getUserAccountBalance(account)
      .call();
    if (cooperants[0] !== "0") {
      var done = coopContract.methods
        .depositFruitsToCOOP(props)
        .send({ from: account }, async function (error, transactionHash) {
          if (error) {
            console.log(error);
          } else {
            await progressButton(done);
            setButtonText("Everything whent well");
            setInputData("");
            await sleep(4000);
            setButtonText("Deposit your raspberry");
            setNewWidth("0%");
          }
        });
    } else {
    }
  };

  const addCoopTookenToMM = () => {
    if (cooperantBalance == 0) {
      setAddCoopToken(!addCoopToken);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    getBalance();
  });

  return (
    <>
      <section className="container">
        <p style={{ fontSize: 20 }}> Cooperant dashboard </p>
        <p> Currently connected to {NetworkID[chainId]} network </p>
        <p> Connected account: {account}</p>
        <p> COOP tokens on acount: {cooperantBalance} </p>
        <p> Raspberies in SmartCOOP warehouse: {totalRaspberies} </p>
        <label htmlFor="deposit_kg" id="deposit_kg_label">
          I want to deposit
        </label>
        <input
          type="number"
          id="deposit_kg"
          name="deposit_kg"
          placeholder="kg"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></input>

        <button
          type="submit"
          id="deposit_raspberry"
          placeholder="kg"
          onClick={() => (depositRaspberry(inputData), addCoopTookenToMM())}
        >
          <div
            className="button__progress_deposit_raspberry"
            style={{ width: newWidth }}
          ></div>
          {buttonText}
        </button>
        {addCoopToken && <AddToken />}
      </section>
    </>
  );
};

export default User;
