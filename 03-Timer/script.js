let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('startbutton');
const stopButton = document.getElementById('stopbutton');
const resetButton = document.getElementById('resetbutton');

function updateDisplay() {
    const totalMilliseconds = elapsedTime + (isRunning ? (Date.now() - startTime) : 0);
    const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    display.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        isRunning = true;
        timer = setInterval(updateDisplay, 10);
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        elapsedTime += Date.now() - startTime; // Update elapsed time
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
