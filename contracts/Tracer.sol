pragma solidity ^0.4.18;

contract Tracer {
  struct Unit {
    string lon;
    string lat;
    bool passed;
    string desc;
  }

  mapping (address => Unit) public Tracks;

  function UpdateTrail(string lo, string la, bool p, string n) public {
    Unit memory temp;
    temp.lon = lo;
    temp.lat = la;
    temp.passed = p;
    temp.desc = n;
    Tracks[msg.sender] = temp;
  }
  
  function GetTrail(address i) public returns(string, string, bool, string) {
      return (Tracks[i].lon, Tracks[i].lat, Tracks[i].passed, Tracks[i].desc);
  }
}

