
 Design patterns:

1) Inheritance, Interfaces and Oracles: 

In SmartCOOP contract we use Chainlink AggregatorV3Interface to get ETH/US price feed which we use inside our get_latest_price() (part of ethUSD function for transforming USD to wei price). Reason for using Chainlink oracle instead of normal internet API is fact that in blockchain world we cannot simple call external API. In scenario where we call simple extrenal price feed diffrent Ethereum nodes can get diffrent price which then can cause to get totally diffrent output values computed by EVM of diffrent nodes while calling same function with same argument. Of course this would break one of basic elements of Ethereum as global singltone machine (state and EVM) in which all nodes particpating in network need independently to come to the same result given same smart contract code and argument input. Second reason is security: traditional internet APIs can be easily manipulated and this is how we can undo all advantages blockchain and smart contract technology offer to us.

Inside our main SmartCOOP we inherit different functionalities from OpenZeppelin Pausable and Ownable contracts. This functionalities should be used in case of buges or hacks to pause or unpause main functions (becomeCoopMember, depositFuritsToCoop and bid) by influencing trut or false state of whenNotPause modifer. Inherited modifier onlyOwner from OpenZeppelin Ownable smart contract is used in withdrow function as well as in pause and unpause function to check that owner (EOA deplying COOPToken and SmartCOOP) is the only one who can call them.  

2) Access Control Design Patterns: 

Beside inherited onlyOwner we implement two additional access control modifiers. OnlyMember and onlyNewMembers modifiers help us to condition access to becomeCoopMember function to only EOA which is not already member (in case of deposit of fruits to only members). 

In COOPToken contract we inherit from OpenZeppelin AccessControl contract and we are setting up two basic roles: (1) default admin and (2) minter role. Minter role is given to owner (EOA which deploy both contracts). Ones we deploy COOPToken and SmartCOOP we are using this minter role to call mint ERC20 function and with this role privilage we assigne whole intial supply of COOPTokens to freshly deployed SmartCOOP address. This is how when EOA deposit fruits inside SmartCOOP we can call transfer function of instantiated COOPToken contract and make transfer of tokens to EOA who is making this fruits deposit. For all this process to happen we need roles, particularly minter. 

3) Inter-contract execution: 

As we said from main SmartCOOP contract we use transfer function provide by external ERC20 based COOPToken contract (instantiated in main SmartCOOP). One of the reasons we decide to have two smart contracts (COOPToken and SmartCOOP) instead of one big is lack of posssibility to add COOPTokens to MetaMaska in case we implemenet and then mint COOPTokens inside our main SmartCOOP contract. In this scenario it would not be possbile for MetaMask and Etherscan to recognize this general SmartCOOP as ERC20 (because there is additional functionalities) and consequntly this will prevent us from adding COOPTokens to MetaMask (what was one of our aims).  
