# Decentralized Voting Application

This is a decentralized application to implement voting using Solidity, Ethers.js and NextJS. This smart contract is deployed on Sepolia Test Network.


## Installation

After you cloned the repository, install the packages using

```shell
npm install
```

First obtain your Metamask private key and Sepolia URL.     
For the URL,    
1. Go to Alchemy and login to your account.     
2. Create an app on Ethereum testnet 'Sepolia'.     
3. Under the Networks tab, copy the URL.        

Copy the private key and URL in the .env file.      

Deploy the contract to the blockchain network. Run the following command to deploy the contract.

```shell
npx hardhat run scripts/deploy.js --network sepolia
```

Once the contract is uploaded to the blockchain, copy the contract address in the page.js file.     

You can also use another blockchain by writing the blockchain's endpoint in hardhat-config.

Finally run command

```shell
npm run dev
```

## File Structure

Smart contract -> contracts\Voting.sol

Frontend -> src\app\page.js

Components -> src\app\components

Contract ABI -> context\Voting.json

Deployment script -> scripts\deploy.js

Hardhat Config -> hardhat.config.js
