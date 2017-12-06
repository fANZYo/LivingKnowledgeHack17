pragma solidity ^0.4.18;

contract Tracer {
  struct Unit {
    address handler;
    string lon;
    string lat;
    string state;
    string desc;
  }

  mapping (string => Unit[]) Tracks;

  function UpdateTrail(string uid, string lo, string la, string p, string n) public {
    Unit memory temp;
    temp.handler = msg.sender;
    temp.lon = lo;
    temp.lat = la;
    temp.state = p;
    temp.desc = n;
    Tracks[uid].push(temp);
  }

  function GetTrail(string uid, uint i) public returns(address, string, string, string, string) {
    Unit memory temp = Tracks[uid][i];
    return (temp.handler, temp.lon, temp.lat, temp.state, temp.desc);
  }

  function GetLength(string uid) public returns(uint) {
    return Tracks[uid].length;
  }

  function GetLast(string uid) public returns(address, string, string, string, string) {
    return GetTrail(uid, Tracks[uid].length - 1);
  }
}

