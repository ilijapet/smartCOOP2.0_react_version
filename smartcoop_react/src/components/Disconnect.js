import React, { useState } from "react";

const Disconnect = () => {

    const []

  const disconnectWallet = () => {
    window.location.reload();
    setOnOFF(!OnOFF);
  };

  return (
    <div>
      <button id="btn-disconnect" onClick={disconnectWallet}>
        Discconect wallet
      </button>
    </div>
  );
};

export default Disconnect;
