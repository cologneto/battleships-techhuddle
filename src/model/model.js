const battleshipLength = 5;
const destroyerLength = 4;
const numShips  = 3;
const boardSize = 10;

class Ship {
    constructor(shipLength) {
        this.locations = new Array(shipLength+1).join('0').split('').map(parseFloat);
        this.hits ="".split.call(Array(shipLength), ",");
    }
}

class Model {
  constructor() {
    this.boardSize = boardSize;
    this.numShips  = numShips;
    this.shipsSunk = 0;

    this.ships = [
        new Ship(destroyerLength),
        new Ship(destroyerLength),
        new Ship(battleshipLength)
    ]
  }

  isSunk(ship) {
      for (let i = 0; i < ship.locations.length; i++) {
          if (ship.hits[i] !== 'hit') {
              return false;
          }
      }
      return true;
  }

  generateShipLocations() {
      let locations;

      for (let i = 0; i < this.numShips; i++) {
          do {
              if(i === 2) {
                  locations = this.generateShip(true);
              } else {
                  locations = this.generateShip(false);
              }

          } while (this.overlap(locations))
          this.ships[i].locations = locations;
      }
  }

  generateShip(isBattleShip) {
      let direction = Math.floor(Math.random() * 2);
      let row, col;
      let shipLength = isBattleShip ? battleshipLength : destroyerLength;

      if(direction === 1) {
          row = Math.floor(Math.random() * this.boardSize);
          col = Math.floor(Math.random() * (this.boardSize - shipLength + 1));
      } else {
          col = Math.floor(Math.random() * this.boardSize);
          row = Math.floor(Math.random() * (this.boardSize - shipLength + 1));
      }

      let newShipLocations = [];
      for (let i = 0; i < shipLength; i++) {
          if (direction === 1) {
              newShipLocations.push(row + "" + (col + i));
          } else {
              newShipLocations.push((row + i) + "" + col);
          }
      }
      return newShipLocations;
  }

  overlap(locations) {
      for (let i = 0; i < this.numShips; i++) {
          let ship = this.ships[i];
          for (let j = 0; j < locations.length; j++) {
              if(ship.locations.indexOf(locations[j]) >= 0) {
                  return true;
              }
          }
      }
      return false;
  }
}

export default Model;
