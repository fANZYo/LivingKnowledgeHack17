pragma solidity ^0.4.18;

contract Tracer {
  struct Unit {
    string lon;
    string lat;
    bool passed;
  }

  address[] id;

  mapping (address => string) lon;
  mapping (address => string) lat;
  mapping (address => bool) passed;

  function UpdateTrail(string longitude, string latitude, bool p) public {
    id.push(msg.sender);
    lon[msg.sender] = longitude;
    lat[msg.sender] = latitude;
    passed[msg.sender] = p;
  }
  
  function GetTrail(address lookup) public returns(string) {
    Unit temp;
    temp.lon = lon[lookup];
    temp.lat = lat[lookup];
    temp.passed = passed[lookup];
    return 'hello';
  }
}

