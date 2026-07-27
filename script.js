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

// js data
const savedMode = localStorage.getItem('mode') || '';
let squareH = 2;
let squareW = 2;
let squareDataH = 2;
let squareDataW = 2;
let max = 100;
let nums = [];
let choosenNum = 0;
let second = 0;
let timerId;

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

        createNumPlace(div)
    }
}

function createNumPlace(place) {
    for(let i = 0; i < (squareDataH * squareDataW); i++) {
        const div = document.createElement('div');
        div.classList.add('num', `box${i}`);
        div.style.width = max / squareDataH + 'px';
        div.style.height = max / squareDataH + 'px';
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

            lose()
        })
    })
}

function showFun(element) {
    element.classList.add('show');
}

function hideFun(element) {
    element.classList.remove('show');
}

function game() {
    const maxNum = (squareDataH * squareDataW);
    for(let i = 0; i < maxNum; i++) {
        const rand = Math.floor(Math.random() * maxNum)
        const box = document.querySelector(`.con${i} .box${i}`);
        addText(box, nums[rand])
    }
}

// if there are two equal numbers in the same box
function square() {
    const maxNum = (squareH * squareW);

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
    const maxNum = (squareH * squareDataH);

    for(let i = 0; i < maxNum; i++) {
        const used = [];
        for(let j = 0; j < maxNum; j++) {
            const box = document.querySelector(`.con${j} .box${i}`);
            
            const val = box.textContent.trim();
            
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
    head.textContent = 'you lose';
    btn.textContent = 'play again';
    second = 0;
    clearInterval(timerId);
    timer.textContent = '00 : 00';
    setTimeout(() => {
        mainCon.innerHTML = ``;
    }, 500);
}

function lose() {
    if(square()) again();
    if(rowCol()) again();
}

// start
btn.addEventListener('click', () => {
    createSquare()
    numbers()
    choose()
    addChoose()
    hideFun(display)
    showFun(numCon)
    game()
    time()
})
