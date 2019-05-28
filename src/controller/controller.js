import Model from '../model/model';
import View from '../view/view'

const model = new Model();
const view = new View();
const letters = ['A','B','C','D','E', 'F','G', 'H','I','J'];
const hitMessage = "*** Hit ***";
const sunkMessage = "*** Sunk ***";
const errorMessage = "*** Error ***";
const missMessage = "*** Miss ***";
const alreadyHitMessage = "*** Already hit ***";

class Controller {
    constructor() {
        this.shots = 0
    }

    fire(shot) {
        for (let i = 0; i < model.numShips; i++) {
            let ship = model.ships[i];
            let index = ship.locations.indexOf(shot);
            console.log(shot);

            if(ship.hits[index] === 'hit') {
                view.displayMessage(alreadyHitMessage);
                return true;
            } else if(index >= 0 ) {
                ship.hits[index] = 'hit';
                view.hideHitFromBackdoor(shot);
                view.displayHit(shot);
                view.displayMessage(hitMessage);

                if(model.isSunk(ship)) {
                    view.displayMessage(sunkMessage);
                    model.shipsSunk++;
                }
                return true;
            }
        }

        view.displayMiss(shot);
        view.displayMessage(missMessage);
        return false;
    }

    processShot(shot) {
        let location = this.parseShot(shot);
        if(location) {
            this.shots++;
            let hit = this.fire.call(model, location);
            if(hit && model.shipsSunk === model.numShips) {
               let a = document.createElement('a');
               let br = document.createElement('br')
               a.innerHTML = "Play again";
               a.setAttribute('href', 'javascript:window.location.href=window.location.href');
               document.body.innerHTML = "Well done! You completed the game in " + this.shots + " shots!";
               document.body.appendChild(br);
               document.body.appendChild(a);
            }
        }
    }

    parseShot(shot) {
        if (shot.toUpperCase() === "SHOW") {
            view.showHideBackdoor(true);
            view.clearCoordinatesInput();
        } else if(shot === null || shot.length > 3) {
            view.displayMessage(errorMessage);
            view.clearCoordinatesInput();
        } else {
            let firstChar = shot.charAt(0);
            let row = letters.indexOf(firstChar);
            let column = +shot.substring(1) - 1;
            column = column + "";
            view.showHideBackdoor(false);
            view.clearCoordinatesInput();

            if(isNaN(row) || isNaN(column)) {
                view.displayMessage(errorMessage);
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                view.displayMessage(errorMessage);
            } else {
                return row + column;
            }
        }

        return null;
    }

    handleFireButton() {
        let shotInput = document.querySelector(".coordinatesInput");
        let shot = shotInput.value.toUpperCase();

        this.processShot(shot);
    }

    handleKeyPress(e) {
        let fireButton = document.querySelector('button');

        e=e || window.event;

        if(e.keyCode === 13) {
            fireButton.click();
            return false;
        }
    }

    createAllLocationsArr(ships) {
        let locations = [];

        for (let i = 0; i < ships.length ; i++) {
            locations = locations.concat(ships[i].locations);
        }

        return locations;
    }

    init() {
        let fireButton = document.querySelector('button');
        fireButton.onclick = this.handleFireButton.bind(this);

        let shotInput = document.querySelector(".coordinatesInput");
        shotInput.onkeypress = this.handleKeyPress.bind(this);

        model.generateShipLocations.call(model);
        let loc = this.createAllLocationsArr(model.ships);
        view.generateGrid(loc);
    }
}

export default Controller;