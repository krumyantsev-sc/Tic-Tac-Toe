let cells = document.querySelector(".gaming_cells");
let numOfMoves = 1;
let firstMove = true;
let cellArr = document.querySelectorAll(".inner__cell");
let activeCombination = null;



cells.onclick = function(event) {
    let target = event.target;
    if (target.tagName !== 'TD') return;
    target.textContent = "X";
    setTimeout(winHandler, 500, "X");
    if (firstMove) {
        makeFirstMove();
    } else {
        checkPossibleVariants();
    }
   setTimeout(winHandler,500,"O");

};

function winHandler(str) {
    if(checkWin(calcCurrentString(str))) {
        alert(`Победа игрока ${str}`);
        restartGame();
    }
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function makeFirstMove() {
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
    }

}

function checkPossibleVariants() {
    let possibleVariants = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8]
    ];
    let clearCells = [];
    let oPositions = [];
    let xPositions = [];
    for (let i = 0; i < cellArr.length; i++) {
        if(cellArr[i].textContent === "") {
            clearCells.push(i);
        } else if (cellArr[i].textContent === "O") {
            oPositions.push(i);
        } else if (cellArr[i].textContent === "X") {
            xPositions.push(i);
        }
    }
    let possibleVarsSet = new Set();
    for (let i = 0; i < possibleVariants.length; i++) {
        for (let j = 0; j < oPositions.length; j++) {
            if (possibleVariants[i].indexOf(oPositions[j]) !== -1) {
                possibleVarsSet.add(possibleVariants[i]);
            }
        }
    }
        possibleVarsSet = removeLoseVars(xPositions, possibleVarsSet);

        if (possibleVarsSet.size === 0) {
            cellArr[clearCells[randomInteger(0,clearCells.length - 1)]].textContent = "O";
        }
        let strats = Array.from(possibleVarsSet);
        console.log(strats);
        let currentStrat = findMorePerspectiveStrategy(strats, oPositions);
        for(let i = 0; i < currentStrat.length; i++) {
            if (clearCells.indexOf(currentStrat[i]) !== -1) {
                cellArr[currentStrat[i]].textContent = "O";
                break;
            }
        }

}

function findMorePerspectiveStrategy(strats, oPosition) {
    for (let el of strats) {
        let countr = 0;
        for(let i = 0; i < oPosition.length; i++) {
            if (el.includes(oPosition[i])) {
                countr++;
            }
        }
        if (countr > 1) {
            return el;
        }
    }
    return strats[0];
}

function removeLoseVars(xPositions, set) {
    for (let item of set) {
        for (let i = 0; i < xPositions.length; i++) {
            if (item.indexOf(xPositions[i]) !== -1) {
                set.delete(item);
            }
        }
    }
    return set;
}

function restartGame() {
    let cellArr = document.querySelectorAll(".inner__cell");
    cellArr.forEach(elem => elem.textContent="");
    numOfMoves = 1;
    firstMove = true;
    activeCombination = null;
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
    const winCombinations = [
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

