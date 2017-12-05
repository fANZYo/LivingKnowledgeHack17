import React from 'react';
import Web3 from 'web3';
import TracerABI from './Tracer.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contract: undefined,
      contractAddr: '0xE7D3e6A4b71352436579D7F3C7D8a181Ca704947',
      account: undefined,
      lookupAddress: ''
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
    this.state.contract.methods
      .GetTrail(this.state.lookupAddress)
      .call((err, res) => {
        err && console.log(err);
        const el = document.createElement('p');
        el.textContent = JSON.stringify(res);
        document.body.appendChild(el);
      });
  }

  inputHandler(event) {
    event.preventDefault();
    const { lon, lat, passed, desc } = event.target;
    // Use the UpdateTrail function from the contract. Should add one entry to each struc
    this.state.contract.methods.UpdateTrail(lon.value, lat.value, JSON.parse(passed.value), desc.value)
      .send({from: this.state.account}, (err, res) => console.log(err, res))
      .then((res) => console.log(res))
      .catch( err => console.log(err));
  }

  onLookupAddressChange(event) {
    this.setState({lookupAddress: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <div className="input">
          <h2>Add</h2>
          <form onSubmit={this.inputHandler.bind(this)}>
            <label style={{display: 'block'}}>Lon: <input type="text" name="lon" /></label>
            <label style={{display: 'block'}}>Lat: <input type="text" name="lat" /></label>
            <label style={{display: 'block'}}>Passed: <input type="text" name="passed" /></label>
            <label style={{display: 'block'}}>Desc: <input type="text" name="desc" /></label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <p>Using {this.state.account}</p>
        <h2>Look-up</h2>
        {/* <label>Address: <input id="lookup" type="text" name="lookup" /></label> */}
        <div>
          <label>
            lookup Address:
            <input key="lookupAddress" type="text"
              value={this.state.lookupAddress}
              onChange={this.onLookupAddressChange.bind(this)}
            />
          </label>
        </div>

        <button type="submit" onClick={this.lookupHandler.bind(this)}>Submit</button>
      </div>

    );
  }
};

export default App;
