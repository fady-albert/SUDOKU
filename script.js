// import HTML data
const modeBtn = document.getElementById('mode');
const body = document.querySelector('body');
const modeBtnTxt = document.getElementById('modeIcon');
const mainCon = document.getElementById('con');

// js data
const savedMode = localStorage.getItem('mode') || '';
let squareH = 2;
let squareW = 2;
let squareDataH = 2;
let squareDataW = 2;

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
    for(let i = 0; i < (squareH + squareW); i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        mainCon.appendChild(div);
        mainCon.style.gridTemplateColumns = `repeat(${squareW}, auto)`

        createNumPlace(div)
    }
}

function createNumPlace(place) {
    for(let i = 0; i < (squareDataH + squareDataW); i++) {
        const div = document.createElement('div');
        div.classList.add('num');
        div.style.width = '25px';
        div.style.height = '25px';
        div.style.background = '#000'
        place.appendChild(div)
        place.style.gridTemplateColumns = `repeat(${squareW}, auto)`
    }
}

createSquare()