import { useState } from "react";

import {
  NetworkID,
  coopContract,
  sleep,
  MakeQuerablePromise,
} from "../helpers/housekeeping";
import { useEthers } from "@usedapp/core";

/**
 * This function is responsible for rendering the user dashboard.
 * @returns The component
 */
const User = () => {
  const [inputData, setInputData] = useState("");
  const [buttonText, setButtonText] = useState("Deposit your raspberry");
  const [newWidth, setNewWidth] = useState("0%");
  const { ethereum } = window;
  const account = ethereum.selectedAddress;
  const { chainId } = useEthers();

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
    var account = ethereum.selectedAddress;
    console.log(account);
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
            await sleep(4000);
            setButtonText("Deposit your raspberry");
            setNewWidth("0%");
          }
        });
    } else {
    }
  };

  return (
    <>
      <section className="container">
        <p style={{ fontSize: 20 }}> Cooperant dashboard </p>
        <p> Currently connected to {NetworkID[chainId]} network </p>
        <p> Connected account: {account}</p>
        <p> COOP tokens on acount: </p>
        <p> Raspberies in SmartCOOP warehouse </p>
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
          onClick={() => depositRaspberry(inputData)}
        >
          <div
            className="button__progress_deposit_raspberry"
            style={{ width: newWidth }}
          ></div>
          {buttonText}
        </button>
        <button id="addToken"> Add COOPtoken to wallet </button>
        <p id="furitsInWarhouse"></p>
      </section>
    </>
  );
};

export default User;
