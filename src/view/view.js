const hit = 'X';
const miss = '-';
const gridLength = 10;
const noShot = '.';
const letters = ['A','B','C','D','E', 'F','G', 'H','I','J'];
const gridContainer = document.querySelector('.gridContainer');
const coordinatesInput = document.querySelector('.coordinatesInput');

class View {
    displayMessage(msg) {
        let messageArea = document.querySelector('.messageContainer ');
        messageArea.innerHTML = msg;
    }

    displayHit(location) {
        let cell = document.getElementById(location);
        cell.innerHTML = hit;
    }

    displayMiss(location) {
        let cell = document.getElementById(location);
        cell.innerHTML = miss;
    }

    generateGrid(locations) {
        let tbl = document.createElement('table');
        let backdoorTbl = document.createElement('table');

        tbl.setAttribute('class', 'tbl');
        backdoorTbl.setAttribute('class', 'backdoorTbl');

        for (let i = 0; i <= gridLength; i++) {
            let row = document.createElement('tr');
            let backdoorRow = document.createElement('tr');
            if(i === 0) {
                let emptyTd = document.createElement('td');
                let clnTd = emptyTd.cloneNode(true);
                row.appendChild(emptyTd);
                backdoorRow.appendChild(clnTd);
            } else {
                let letterTd = document.createElement('td');
                let clnLTd = letterTd.cloneNode(true);
                letterTd.innerHTML = letters[i - 1];
                clnLTd.innerHTML = letters[i - 1];
                row.appendChild(letterTd);
                backdoorRow.appendChild(clnLTd);
            }
            for (let j = 1; j <= gridLength; j++) {
                let td = document.createElement('td');
                let backdoorTd = document.createElement('td');

                if( i === 0) {
                    td.innerHTML = j;
                    backdoorTd.innerHTML = j;
                } else {
                    let ij = (i - 1) + '' + (j - 1);
                    td.innerHTML = noShot;
                    td.setAttribute('id', ij);
                    backdoorTd.setAttribute('id', 'b' + ij);

                    if(locations.indexOf(ij) !== -1) {
                        backdoorTd.innerHTML = "X";
                    } else {
                        backdoorTd.innerHTML = "";
                    }

                }
                backdoorRow.appendChild(backdoorTd);
                row.appendChild(td);
            }
            tbl.appendChild(row);
            backdoorTbl.appendChild(backdoorRow)
        }
        backdoorTbl.classList.add('hide');
        gridContainer.appendChild(tbl);
        gridContainer.appendChild(backdoorTbl);
    }

    showHideBackdoor(show) {
        let tbl = document.querySelector('.tbl')
        let backdoorTbl = document.querySelector('.backdoorTbl');
        if(show) {
            backdoorTbl.classList.remove('hide')
            tbl.classList.add('hide')
        } else {
            backdoorTbl.classList.add('hide');
            tbl.classList.remove('hide');
        }
    }

    clearCoordinatesInput() {
        coordinatesInput.value = "";
    }

    hideHitFromBackdoor(shot) {
        let idSelected = '#b' + shot;
        let backdoorTd = document.querySelector(idSelected);

        backdoorTd.innerHTML = "";
    }

}

export default View;