import React from "react";

const Disconnect = ({ funSetOnOFF, OnOFF }) => {
  const disconnectWallet = () => {
    window.location.reload();
    funSetOnOFF(!OnOFF);
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
