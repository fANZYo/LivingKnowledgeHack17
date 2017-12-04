import React from 'react';
import Web3 from 'web3';
import TracerABI from './Tracer.json';

class App extends React.Component {
  componentDidMount() {
    let web3 = window.web3;
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      console.log('Using local web3');
      // Use Mist/MetaMask's provider
      web3 = new Web3(web3.currentProvider);
    } else {
      console.log('No local web3');
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    }

    // Contract address here
    const tracer = new web3.eth.Contract(TracerABI.abi, '0xbC5aE900867272B8133598b9CC6Ac22b136c57E9');

    console.log(tracer);
    tracer.deploy({data: TracerABI.bytecode});

    // Use the UpdateTrail function from the contract. Should add one entry to each struc
    tracer.methods.UpdateTrail('-0.123', '52.010', true)
      .send({from: '0xA6190a8c30C9F42f11981f2dcFc8f75854d2dD23'}, (err, res) => console.log(err, res))
      .then((res) => console.log(res));

    // Use the GetTrail function from the contract. Return the string hello.
    tracer.methods.GetTrail('0x623C21cA46C47207707af3f5e15888dbdD423AC7')
      .call((err, res) => console.log(err, res));
  }

  render() {
    return (
      <h1>Hello World</h1>
    );
  }
};

export default App;
