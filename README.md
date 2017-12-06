## The problem
A shipped parcel passes through a series of handler from shipment to delivery, sometimes getting lost. Tracking this parcel can be cumbersome and time consuming leading to customer frustration.

## Solution
To provide a blockchain based system to parcel tracking. Each handler updates its state upon delivering and receiving the package. This state contains information like; unique ID, possession of the parcel and a comment, allowing us to know exactly where in the chain the parcel got lost.

## Dependencies
In order to use this Dapp you will need to install [MetaMask](https://metamask.io/) on your browser, create an account and set it to use Ropsten TestNet.

## Install
`$ npm install`

## Modifying the contract
The build process is a bit messy right now. In order to change the contract you will need to run `truffle compile` from the project folder and then run:
```
$ mv build/contracts/Tracer.json ./src
```
Then you will need to copy/paste the solidity code in remix and create the contract to move it to the blockchain. Once that's done you will need to wait for the block to be mined, copy the contract address and replace it in `./src/App.js` on line 20.
