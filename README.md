## Install
`# npm i -g truffle`
`$ npm install`

## Contract
The build process is a bit messy right now. In order to change the contract you will need to run `truffle compile` from the project folder and then run:
```
$ mv build/contracts/Tracer.json ./src
```
Then you will need to copy/paste the solidity code in remix and create the contract to move it to the blockchain. Once that's done you will need to wait for the block to be mined, copy the contract address and replace it in `./src/App.js` on line 20.
