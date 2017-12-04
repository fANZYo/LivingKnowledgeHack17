import React from 'react';
import Web3 from 'web3';
import TracerABI from './Tracer.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contract: undefined,
      contractAddr: '0xEaFE97897Be6f5b0b947bAc9218992bF6F0569Db',
      lookup: undefined,
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

    // Use the UpdateTrail function from the contract. Should add one entry to each struc
    // tracer.methods.UpdateTrail('0xA6190a8c30C9F42f11981f2dcFc8f75854d2dD23', '-0.123', '52.010', true, 'william')
    //   .send({from: '0xA6190a8c30C9F42f11981f2dcFc8f75854d2dD23'}, (err, res) => console.log(err, res))
    //   .then((res) => console.log(res));

  }

  lookupHandler(event) {
    this.setState({ lookup: document.querySelector('input').value }, () => {
      // Use the GetTrail function from the contract. Return the string hello.
      this.state.contract.methods.GetTrail(this.state.lookup)
        .call((err, res) => {
          const el = document.createElement('p');
          el.textContent = JSON.stringify(res);
          document.body.appendChild(el);
        });
    });
  }

  inputHandler(event) {
    event.preventDefault();
    const el = event.target;
    const addr = el.addr;
    const lon = el.lon;
    const lat = el.lat;
    const passed = el.passed;
    const desc = el.desc;
    // Use the UpdateTrail function from the contract. Should add one entry to each struc
    this.state.contract.methods.UpdateTrail(addr.value, lon.value, lat.value, JSON.parse(passed.value), desc.value)
      .send({from: addr.value}, (err, res) => console.log(err, res))
      .then((res) => console.log(res));
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <div className="input">
          <h2>Add</h2>
          <form onSubmit={this.inputHandler.bind(this)}>
            <label style={{display: 'block'}}>Address: <input type="text" name="addr" /></label>
            <label style={{display: 'block'}}>Lon: <input type="text" name="lon" /></label>
            <label style={{display: 'block'}}>Lat: <input type="text" name="lat" /></label>
            <label style={{display: 'block'}}>Passed: <input type="text" name="passed" /></label>
            <label style={{display: 'block'}}>Desc: <input type="text" name="desc" /></label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <p>0xA6190a8c30C9F42f11981f2dcFc8f75854d2dD23</p>
        <h2>Look-up</h2>
        <label>Address: <input type="text" name="lookup" /></label>
        <button type="submit" onClick={this.lookupHandler.bind(this)}>Submit</button>
      </div>

    );
  }
};

export default App;
