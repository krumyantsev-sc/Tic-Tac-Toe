let cells = document.querySelector(".gaming_cells");
let numOfMoves = 1;

cells.onclick = function(event) {
    let target = event.target;
    if (target.tagName !== 'TD') return;
    target.textContent = (numOfMoves % 2 === 0) ? "O" : "X";
    numOfMoves++;
    if(checkWin(calcCurrentString("X"))) {
        alert("Победа игрока X");
        restartGame();
    }
    if(checkWin(calcCurrentString("O"))) {
        alert("Победа игрока 0");
        restartGame();
    }

};

function restartGame() {
    let cellArr = document.querySelectorAll(".inner__cell");
    cellArr.forEach(elem => elem.textContent="");
    numOfMoves = 1;
}

function calcCurrentString(str) {
    let cellArr = document.querySelectorAll(".inner__cell");
    let currElems = [];
    for (let i = 0; i < cellArr.length; i++) {
        if(cellArr[i].textContent === str) {
            currElems.push(i);
        }
    }
   return currElems.join('');
}

function checkWin(currStr) {
    let winCombinations = [
        "012",
        "036",
        "048",
        "147",
        "258",
        "246",
        "345",
        "678"
    ];
    if (currStr.length < 3)
        return false;
    for (let i = 0; i < winCombinations.length; i++) {
        if (currStr.includes(winCombinations[i])) {
            return true
        }
    }
    return false;
}

