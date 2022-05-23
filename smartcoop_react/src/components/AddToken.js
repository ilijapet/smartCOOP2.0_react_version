import {
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
} from "../helpers/housekeeping";

/**
 * It calls the `wallet_watchAsset` method on the ethereum object.
 * @returns A button that calls the addTokenFun function.
 */
const AddToken = () => {
  const addTokenFun = async () => {
    const { ethereum } = window;
    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
      if (wasAdded) {
        console.log("You added new token type to your MetaMask wallet");
      } else {
        console.log("You did't add your new token to the wallet.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button id="addTokenStyle" onClick={() => addTokenFun()}>
        Add COOPtoken to wallet
      </button>
    </>
  );
};

export default AddToken;
