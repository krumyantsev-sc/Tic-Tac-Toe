let cells = document.querySelector(".gaming_cells");
let numOfMoves = 1;
let firstMove = true;

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

cells.onclick = function(event) {
    let target = event.target;
    if (target.tagName !== 'TD') return;
    target.textContent = "X";
    if(checkWin(calcCurrentString("X"))) {
        alert("Победа игрока X");
        restartGame();
        return;
    }
    if(checkWin(calcCurrentString("O"))) {
        alert("Победа игрока 0");
        restartGame();
        return;
    }
    if (firstMove) {
        makeFirstMove();
    } else {
        checkPossibleVariants();
    }
};

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function makeFirstMove() {
    let cellArr = document.querySelectorAll(".inner__cell");
    let clearCells = [];
    for (let i = 0; i < cellArr.length; i++) {
        if(cellArr[i].textContent === "") {
            clearCells.push(cellArr[i]);
        }
    }
    firstMove = false;
    if (cellArr[4].textContent === "") {
        cellArr[4].textContent = "O";
        return;
    }
    if (cellArr[0].textContent === "") {
        cellArr[0].textContent = "O";
        return;
    }
    if (cellArr[2].textContent === "") {
        cellArr[2].textContent = "O";
        return;
    }
    if (cellArr[6].textContent === "") {
        cellArr[6].textContent = "O";
        return;
    }
    if (cellArr[8].textContent === "") {
        cellArr[8].textContent = "O";
        return;
    }
    console.log(clearCells);
    //clearCells[randomInteger(0,clearCells.length - 1)].textContent = "O";

}

function checkPossibleVariants() {
    let cellArr = document.querySelectorAll(".inner__cell");
    let clearCells = [];
    let oPositions = [];
    let xPositions = [];


    let priorityCombinations = [];

    for (let i = 0; i < cellArr.length; i++) {
        if(cellArr[i].textContent === "") {
            clearCells.push(cellArr[i]);
        } else if (cellArr[i].textContent === "O") {
            oPositions.push(i);
        } else if (cellArr[i].textContent === "X") {
            xPositions.push(i);
        }
    }
    console.log(priorityCombinations);
    for (let i = 0; i < winCombinations.length; i++) {
        for (let k = 0; k < xPositions.length; k++) {
           for (let j = 0; j < winCombinations[i].length; i++) {
               if (winCombinations[i][j] === xPositions[k]) {

               } else {
                   break;
               }
           }
        }
    }
    console.log(priorityCombinations);


    for (let i = 0; i < priorityCombinations.length; i++) {
        for (let k = 0; k < oPositions.length; k++) {
            for (let j = 0; j < priorityCombinations[i].length; j++) {
                if (priorityCombinations[i][j] === oPositions[k]) {
                    makeMove(cellArr, priorityCombinations);
                }
            }
        }
    }
    priorityCombinations = [];
}

function makeMove(cellArr,comb) {
    console.log(comb);
    for (let i = 0; i < comb; i++) {
        if (cellArr[i].textContent === "") {
            cellArr[i].textContent = "O";
            return;
        }
    }
}

function restartGame() {
    let cellArr = document.querySelectorAll(".inner__cell");
    cellArr.forEach(elem => elem.textContent="");
    numOfMoves = 1;
    firstMove = true;
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

    if (currStr.length < 3)
        return false;
    for (let i = 0; i < winCombinations.length; i++) {
        if (currStr.includes(winCombinations[i])) {
            return true
        }
    }
    return false;
}

