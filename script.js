const display = document.getElementById('display');
let secretCodeAttempt = '';
const secretCode = '11+5';

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function showTempMessage(message, duration = 1000) {
    const msg = document.createElement('div');
    msg.className = 'hidden-message';
    msg.textContent = message;
    document.body.appendChild(msg);
    
    setTimeout(() => msg.classList.add('visible'), 10);
    setTimeout(() => {
        msg.classList.remove('visible');
        setTimeout(() => msg.remove(), 500);
    }, duration);
}

function checkSecretCode() {
    if (display.value === secretCode) {
        showTempMessage('¡Encontraste el código secreto de Rapunzel!');
        setTimeout(() => {
            window.location.href = 'https://web.whatsapp.com/';
        }, 1500);
    } else {
        calculate();
    }
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = result === undefined ? '' : result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

// Soporte para teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        checkSecretCode();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});