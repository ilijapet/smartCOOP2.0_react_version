import React, { useState } from "react";
import { coopContract, sleep } from "../helpers/housekeeping";

const BecomeMember = () => {
  const [messageButton, setMessageButton] = useState(
    "Become a SmartCOOP member"
  );

  const becomeCoopMember = async () => {
    const { ethereum } = window;

    var account = ethereum.selectedAddress;

    if (account !== undefined && account !== null) {
      let cooperants = await coopContract.methods
        .getUserAccountBalance(account)
        .call();

      if (cooperants[0] === "0") {
        var trans = coopContract.methods
          .becomeCoopMember()
          .send({ from: account, value: "10000" }, async function (
            error,
            transactionHash
          ) {
            if (error) {
              console.log(error);
            } else {
              setMessageButton("You are now SmartCOOP member");
            }
          });
      } else {
        setMessageButton("You are already member");
      }
    } else {
      setMessageButton("Please connect your wallet");
      await sleep(5000);
      setMessageButton("Become a SmartCOOP member");
    }
  };

  return (
    <>
      <button className="button__progress" onClick={becomeCoopMember}>
        {messageButton}
      </button>
    </>
  );
};

export default BecomeMember;
