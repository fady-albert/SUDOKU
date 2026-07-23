// import HTML data
const modeBtn = document.getElementById('mode');
const body = document.querySelector('body');
const modeBtnTxt = document.getElementById('modeIcon');

// mode function
function mode() {
    body.classList.toggle('dark');
    setTimeout(() => {
        modeBtnTxt.textContent = modeBtnTxt.textContent === 'light_mode' ? 'dark_mode' :'light_mode';
    }, 500);
}

modeBtn.addEventListener('click', () => {
    mode()
    modeBtn.classList.toggle('rotate');
})