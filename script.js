// import HTML data
const modeBtn = document.getElementById('mode');
const body = document.querySelector('body');
const modeBtnTxt = document.getElementById('modeIcon');
const mainCon = document.getElementById('con');
const numCon = document.getElementById('numCon');

// js data
const savedMode = localStorage.getItem('mode') || '';
let squareH = 2;
let squareW = 2;
let squareDataH = 2;
let squareDataW = 2;
let max = 100;
let choosenNum = 0;

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
        div.classList.add('square');
        mainCon.appendChild(div);
        mainCon.style.gridTemplateColumns = `repeat(${squareW}, auto)`

        createNumPlace(div)
    }
}

function createNumPlace(place) {
    for(let i = 0; i < (squareDataH * squareDataW); i++) {
        const div = document.createElement('div');
        div.classList.add('num');
        div.style.width = max / squareDataH + 'px';
        div.style.height = max / squareDataH + 'px';
        place.appendChild(div)
        place.style.gridTemplateColumns = `repeat(${squareDataW}, auto)`
    }
}

function numbers() {

    let nums = [];
    // get the numbers
    for(let i = 0; i < (squareDataH * squareDataW); i++) {
        nums.push(i + 1);
    }

    // send nnumbers into numBar function
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
        })
        if(button.textContent === choosenNum) {
            btn.classList.add('active');
        }
    })
}

function addText(con, value) {
    const p = document.createElement('p');
    p.textContent = value;
    con.appendChild(p);
}

function addChoose() {
    const data = document.querySelectorAll('.num');
    
    data.forEach(num => {
        num.addEventListener('click', () => {
            addText(num, choosenNum)
        })
    })
}

// run the main code
createSquare()
numbers()
choose()
addChoose()