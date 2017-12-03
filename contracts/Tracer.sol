pragma solidity ^0.4.18;

contract Tracer {
  struct Unit {
    uint lon;
    uint lat;
    bool passed;
    string name;
  }

  mapping (string => Unit[]) Tracks;

  function UpdateTrail(string sku, uint lo, uint la, bool p, string n) public returns(Unit[]) {
    Unit storage temp;
    temp.lon = lo;
    temp.lat = la;
    temp.passed = p;
    temp.name = n;
    Tracks[sku].push(temp);
    
    return Tracks[sku];
  }
  
  function GetTrail(string sku) public returns(Unit[]) {
      return Tracks[sku];
  }
}
