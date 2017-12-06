import React from 'react';
import Web3 from 'web3';
import TracerABI from './Tracer.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contract: undefined,
      contractAddr: '0x52C9e4D4A61DbBf75F0cdEA02F9fC09AFAF1f456',
      account: undefined,
      uidLookup: ''
    }
  }

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
    this.setState({contract: new web3.eth.Contract(TracerABI.abi, this.state.contractAddr)}, () => {
      this.state.contract.deploy({data: TracerABI.bytecode});
    });

    web3.eth.getAccounts((error, accounts) => {
      this.setState({account: accounts[0]});
    });

    // Use the UpdateTrail function from the contract. Should add one entry to each struc
    // tracer.methods.UpdateTrail('0xA6190a8c30C9F42f11981f2dcFc8f75854d2dD23', '-0.123', '52.010', true, 'william')
    //   .send({from: '0xA6190a8c30C9F42f11981f2dcFc8f75854d2dD23'}, (err, res) => console.log(err, res))
    //   .then((res) => console.log(res));

  }

  lookupHandler(event) {
    event.preventDefault();
    this.state.contract.methods
      .GetTrail(event.target.uid.value, parseInt(event.target.index.value, 10))
      .call((err, res) => {
        err && console.log(err);
        const el = document.createElement('p');
        el.textContent = JSON.stringify(res);
        document.body.appendChild(el);
      });
  }

  lengthHandler(event) {
    event.preventDefault();
    this.state.contract.methods
      .GetLength(event.target.uid.value)
      .call((err, res) => {
        err && console.log(err);
        const el = document.createElement('p');
        el.textContent = JSON.stringify(res);
        document.body.appendChild(el);
      });
  }

  inputHandler(event) {
    event.preventDefault();
    const { uid, lon, lat, state, desc } = event.target;
    // Use the UpdateTrail function from the contract. Should add one entry to each struc
    this.state.contract.methods.UpdateTrail(uid.value, lon.value, lat.value, state.value, desc.value)
      .send({from: this.state.account}, (err, res) => console.log(err, res))
      .then((res) => console.log(res))
      .catch( err => console.log(err));
  }

  lastHandler(event) {
    event.preventDefault();
    this.state.contract.methods
      .GetLast(event.target.uid.value)
      .call((err, res) => {
        err && console.log(err);
        const el = document.createElement('p');
        el.textContent = JSON.stringify(res);
        document.body.appendChild(el);
      });
  }

  render() {
    return (
      <div>
        <p>Using {this.state.account}</p>
        <h1>Hello World</h1>
        <div className="input">
          <h2>Add</h2>
          <form onSubmit={this.inputHandler.bind(this)}>
            <label style={{display: 'block'}}>Uid: <input type="text" name="uid" /></label>
            <label style={{display: 'block'}}>Lon: <input type="text" name="lon" /></label>
            <label style={{display: 'block'}}>Lat: <input type="text" name="lat" /></label>
            <label style={{display: 'block'}}>State: <input type="text" name="state" /></label>
            <label style={{display: 'block'}}>Desc: <input type="text" name="desc" /></label>
            <button type="submit">Submit</button>
          </form>
        </div>

        <h2>Look-up</h2>
        <form onSubmit={this.lookupHandler.bind(this)}>
          <label style={{display: 'block'}}>Uid: <input type="text" name="uid" /></label>
          <label style={{display: 'block'}}>Index: <input type="text" name="index" /></label>
          <button type="submit">Submit</button>
        </form>

        <h2>Get Length per Uid</h2>
        <form onSubmit={this.lengthHandler.bind(this)}>
          <label style={{display: 'block'}}>Uid: <input type="text" name="uid" /></label>
          <button type="submit">Submit</button>
        </form>

        <h2>Get Last</h2>
        <form onSubmit={this.lastHandler.bind(this)}>
          <label style={{display: 'block'}}>Uid: <input type="text" name="uid" /></label>
          <button type="submit">Submit</button>
        </form>
      </div>

    );
  }
};

export default App;
