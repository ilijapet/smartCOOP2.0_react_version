import react from "react";
import { coopContract } from "../helpers/housekeeping";

const Connect = ({
  funSetOnOFF,
  OnOFF,
  funSetCooperant,
  cooperant,
  funSetAdmin,
  admin,
  funSetBidder,
  bidder,
}) => {
  const selection = async (props) => {
    let user_balance = await coopContract.methods
      .getUserAccountBalance(props)
      .call();

    if (user_balance[0] !== "0") {
      funSetCooperant(!cooperant);
    } else if (props === "0x273f4FCa831A7e154f8f979e1B06F4491Eb508B6") {
      funSetAdmin(!admin);
    } else {
      funSetBidder(!bidder);
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
      funSetOnOFF(!OnOFF);
    } catch (err) {
      console.log(err);
    }
  };

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

export default Connect;
