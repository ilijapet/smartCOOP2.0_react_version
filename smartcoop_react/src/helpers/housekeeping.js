import Web3 from 'web3';

import contract from '../contracts/SmartCOOP.json'

// Contract address
const SCaddress = "0xfB7A3E46021Be5F70c3A85A7CeB5491AC2338857";

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
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export { NetworkID, coopContract, sleep };
