// import HTML data
const modeBtn = document.getElementById('mode');
const body = document.querySelector('body');
const modeBtnTxt = document.getElementById('modeIcon');

// js data
const savedMode = localStorage.getItem('mode') || '';

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