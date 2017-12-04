pragma solidity ^0.4.18;

contract Tracer {
  struct Unit {
    string lon;
    string lat;
    bool passed;
    string id;
  }

  mapping (address => Unit) public Tracks;

  function UpdateTrail(address i, string lo, string la, bool p, string n) public {
    Unit memory temp;
    temp.lon = lo;
    temp.lat = la;
    temp.passed = p;
    temp.id = n;
    Tracks[i] = temp;
  }
  
  function GetTrail(address i) public returns(string, string, bool, string) {
      return (Tracks[i].lon, Tracks[i].lat, Tracks[i].passed, Tracks[i].id);
  }
}

