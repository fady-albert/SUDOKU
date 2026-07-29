// import HTML data
const modeBtn = document.getElementById('mode');
const body = document.querySelector('body');
const modeBtnTxt = document.getElementById('modeIcon');
const mainCon = document.getElementById('con');
const numCon = document.getElementById('numCon');
const display = document.getElementById('sreen');
const head = document.getElementById('head');
const high = document.getElementById('high');
const btn = document.getElementById('btn');
const timer = document.getElementById('timer');
const chooseS = document.getElementById('chooseS');
const b2 = document.getElementById('2');
const b3 = document.getElementById('3');
const easy = document.getElementById('e');
const medium = document.getElementById('m');
const hard = document.getElementById('h');
const chooseL = document.getElementById('level');

// js data
const savedMode = localStorage.getItem('mode') || '';
let squareH;
let squareW;
let squareDataH;
let squareDataW;
let max = 100;
let nums = [];
let choosenNum = 0;
let second = 0;
let timerId;
let board;
let winner = false;
let timerVar;
let level;

// mode function
function mode() {
    body.classList.toggle('dark');

    setTimeout(() => {
        modeBtnTxt.textContent = modeBtnTxt.textContent === 'light_mode' ? 'dark_mode' :'light_mode';
    }, 500);
}

// change mode by click on the button
modeBtn.addEventListener('click', () => {
    mode()
    modeBtn.classList.toggle('rotate');
    // save the mode that the user use it
    localStorage.setItem('mode', savedMode === 'light' ? 'dark' : 'light');
})

// check if user used to use dark mode
if(savedMode === 'dark') {
    mode()
}

// the main function
function createSquare() {
    for(let i = 0; i < (squareH * squareW); i++) {
        const div = document.createElement('div');
        div.classList.add('square', `con${i}`);
        mainCon.appendChild(div);
        mainCon.style.gridTemplateColumns = `repeat(${squareW}, auto)`

        createNumPlace(div, i)
    }
}

function createNumPlace(place, index) {
    for(let i = 0; i < (squareDataH * squareDataW); i++) {
        const div = document.createElement('div');
        div.classList.add('num', `box${i}`);
        div.style.width = max / squareDataH + 'px';
        div.style.height = max / squareDataH + 'px';

        const squareRow = Math.floor(index / squareW);
        const squareCol = index % squareW;

        const localRow = Math.floor(i / squareDataW);
        const localCol = i % squareDataW;

        const row = squareRow * squareDataH + localRow
        const col = squareCol * squareDataW + localCol

        div.dataset.row = row
        div.dataset.col = col

        place.appendChild(div)
        place.style.gridTemplateColumns = `repeat(${squareDataW}, auto)`
    }
}

function numbers() {

    // get the numbers
    for(let i = 0; i < (squareDataH * squareDataW); i++) {
        nums.push(i + 1);
    }

    // send numbers into numBar function
    nums.forEach(data => {
        numBar(data)
    });

}

function numBar(num) {
    // add numbers into buttons then add buttons to HTML
    const btn = document.createElement('button');
    btn.textContent = num;
    btn.classList.add('numBarBtn');
    numCon.appendChild(btn);
}

function choose() {
    const btn = document.querySelectorAll('.numBarBtn');
    btn.forEach(button => {
        button.addEventListener('click', () => {
            choosenNum = button.textContent;
            
            btn.forEach(b => {
                b.classList.remove('active')
            })

            if(button.textContent === choosenNum) {
                button.classList.add('active');
            }
        })
    })
}

function addText(con, value) {
    if(value === 0) return;
    const p = document.createElement('p');
    p.classList.add('text')
    p.textContent = value;
    con.appendChild(p);
}

function addChoose() {
    const data = document.querySelectorAll('.num');
    
    data.forEach(num => {
        num.addEventListener('click', () => {
            if(choosenNum === 0) return;
            if(num.textContent.trim() !== '') return;

            num.innerHTML = '';

            addText(num, choosenNum);
            SUTN()

            action()
        })
    })
}

function showFun(element) {
    element.classList.add('show');
}

function hideFun(element) {
    element.classList.remove('show');
}

function isSafe(board, row, col, num) {
    const maxNum = squareH * squareDataH;
    for(let i = 0; i < maxNum; i++) {
        if(board[row][i] === num) return false;
    }

    for(let i = 0; i < maxNum; i++) {
        if(board[i][col] === num) return false;
    }

    const startR = Math.floor(row / squareH) * squareH;
    const startC = Math.floor(col / squareW) * squareW;

    for(let r = startR; r < startR + squareDataH; r++) {
        for(let c = startC; c < startC + squareDataW; c++) {
            if(board[r][c] === num) return false;
        }
    }

    return true;
}

function solve(board) {
    const maxNum = squareH * squareDataH;
    for(let row = 0; row < maxNum; row++) {
        for(let col = 0; col < maxNum; col++) {
            if(board[row][col] === 0) {
                let numbers = []

                for(let i = 1; i <= maxNum; i++) {
                    numbers.push(i);
                }

                for(let i = numbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]
                }

                for(let num of numbers) {
                    if(isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if(solve(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function getBoard() {
    const box = document.querySelectorAll('.num');

    box.forEach((b, index) => {
        const row = Number(b.dataset.row)
        const col = Number(b.dataset.col)

        board[row][col] = b.textContent.trim();
    })
    return board;
}
// if there are two equal numbers in the same box
function square() {
    const maxNum = (squareH * squareDataH);

    for(let i = 0; i < maxNum; i++) {
        const box = document.querySelectorAll(`.con${i} .text`);
        const used = [];

        for(let place of box) {
            const val = Number(place.textContent);

            if(place.textContent === '') continue;

            if(used.includes(val)) {                
                return true;
            }
            
            used.push(val);
                
        }
    }
    return false;
}

// if there are two equal numbers in the same row or column
function rowCol() {
    const board = getBoard();
    const maxNum = board.length;

    for(let row = 0; row < maxNum; row++) {
        const used = [];

        for(let col = 0; col < maxNum; col++) {
            const square = Math.floor(row / squareDataW) * squareW + Math.floor(col / squareDataH);

            const cell = (row % squareDataH) * squareDataW + (col % squareDataW);

            const val = board[row][col];

            if(val === '') continue;

            if(used.includes(val)) {
                return true;
            }

            used.push(val)
        }
    }

        for(let col = 0; col < maxNum; col++) {
        const used = [];

        for(let row = 0; row < maxNum; row++) {
            const square = Math.floor(row / squareDataW) * squareW + Math.floor(col / squareDataH);

            const cell = (row % squareDataH) * squareDataW + (col % squareDataW);

            const val = board[row][col];

            if(val === '') continue;

            if(used.includes(val)) {
                return true;
            }

            used.push(val)
        }
    }
    
    return false;
}

function time() {
    timerId = setInterval(() => {
        second++

        const minutes = Math.floor(second / 60);
        const secs = Math.floor(second % 60);

        timer.textContent = `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`

    }, 1000)

}

function again() {
    showFun(display)
    hideFun(numCon)
    nums = [];
    choosenNum = 0;
    numCon.innerHTML = ``;
    second = 0;
    clearInterval(timerId);
    timer.textContent = '00 : 00';
    setTimeout(() => {
        mainCon.innerHTML = ``;
    }, 500);
}

function win() {
    winner = true
    head.textContent = 'you win';
    btn.textContent = 'play again';

        if (winner) {
            let highScore = localStorage.getItem("high");

            if (!highScore || second < Number(highScore)) {
                localStorage.setItem("high", second);
            }
        }

    highScore()
    again()
}

function lose() {
    head.textContent = 'you lose';
    btn.textContent = 'play again';
}

function highScore() {
    const highS = localStorage.getItem("high");

    if (highS) {
        const minutes = Math.floor(highS / 60);
        const secs = highS % 60;

        high.textContent = `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
    }
}

function action() {
    // lose
    if(square() || rowCol()) {
        again()
        lose()
        return;
    };
    // win
    const box = document.querySelectorAll('.num');
    const all = [...box].every(b => b.textContent.trim() !== '');
    if(all){
        win()
    }
}

function start() {
    const size = squareH * squareW;
    board = Array.from({length: size}, () => Array(size).fill(0));

    solve(board)
    console.table(board)
}

function render() {
    const cells = document.querySelectorAll(".num");

    cells.forEach(cell => {
        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);

        cell.innerHTML = "";

        if (board[row][col] !== 0) {
            addText(cell, board[row][col]);
        }
    });
}

function del(count) {
    const size = squareH * squareDataH;

    while(count > 0) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if(board[row][col] !== 0) {
            board[row][col] = 0;
            count--
        }
    }
}

function SUTN() {
    const size = squareH * squareDataH;

    for(let i = 1; i <= size; i++) {
        const used = [...document.querySelectorAll('.text')].filter(p => Number(p.textContent) === i).length;
        const button = [...document.querySelectorAll('.numBarBtn')].find(btn => Number(btn.textContent) === i);
        
        button.disabled = used >= size;

        if (button.disabled && Number(choosenNum) === i) {
            choosenNum = 0;
        }
    }
}

// start
btn.addEventListener('click', () => {
    hideFun(display)
    showFun(chooseS)
})

b2.addEventListener('click', () => {
    squareW = 2;
    squareH = 2;
    squareDataH = 2;
    squareDataW = 2;
    hideFun(chooseS)
    showFun(chooseL)
})

b3.addEventListener('click', () => {
    squareW = 3;
    squareH = 3;
    squareDataH = 3;
    squareDataW = 3;
    hideFun(chooseS)
    showFun(chooseL)
})

easy.addEventListener('click', () => {
    level = Math.floor(((squareH * squareW) * (squareH * squareW)) * 0.4)
    make()
})

medium.addEventListener('click', () => {
    level = Math.floor(((squareH * squareW) * (squareH * squareW)) * 0.55)
    make()
})

hard.addEventListener('click', () => {
    level = Math.floor(((squareH * squareW) * (squareH * squareW)) * 0.7)
    make()
})

function make() {
    createSquare()
    start()
    del(level)
    render()
    numbers()
    choose()
    addChoose()
    hideFun(chooseL)
    showFun(numCon)
    time()
}

highScore()