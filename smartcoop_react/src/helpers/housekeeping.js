import Web3 from "web3";

import contract from "../contracts/SmartCOOP.json";

const raspberryPrice = 9;
const tokenAddress = "0xcdc51d509F58c442124d23b370565928d39eFa74";
const tokenSymbol = "COOP";
const tokenDecimals = 18;
const tokenImage =
  "https://ilijapet.github.io/photos/noun_raspberry_4132882_mala.svg";

// Contract address
const SCaddress = "0x407820928f566c76cCE7F88E98a3a6749484231E";

// Contracts abi
const ABI = contract.abi;

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const coopContract = new web3.eth.Contract(ABI, SCaddress);

// Chain list
const NetworkID = {
  1: "MAINNET",
  3: "ROPSTEN",
  4: "RINKEBY",
  5: "GOERLI",
  42: "KOVAN",
  56: "BSC",
  97: "BSC_TESTNET",
  128: "HECO",
  256: "HECO_TESTNET",
  250: "OPERA",
  10: "OPTIMISTIC_ETHEREUM",
  69: "OPTIMISTIC_KOVAN",
  137: "POLYGON",
  1337: "GANACHE",
  80001: "POLYGON_MUMBAI",
  42161: "ARBITRUM_ONE",
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Helper promise
function MakeQuerablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isFulfilled) return promise;

  // Set initial state
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function (v) {
      isFulfilled = true;
      isPending = false;
      return v;
    },
    function (e) {
      isRejected = true;
      isPending = false;
      throw e;
    }
  );

  result.isFulfilled = function () {
    return isFulfilled;
  };
  result.isPending = function () {
    return isPending;
  };
  result.isRejected = function () {
    return isRejected;
  };
  return result;
}

export {
  NetworkID,
  coopContract,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
  sleep,
  MakeQuerablePromise,
};
