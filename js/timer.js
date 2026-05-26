// Timer module JavaScript

let timerInterval;
let timerTime = 0;
let isTimerRunning = false;

function updateTimerDisplay() {
    const hours = Math.floor(timerTime / 3600);
    const minutes = Math.floor((timerTime % 3600) / 60);
    const seconds = timerTime % 60;
    const display = document.getElementById('timer-value');
    if (display) {
        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function startTimer() {
    if (!isTimerRunning) {
        if (timerTime === 0) {
            const hours = parseInt(document.getElementById('timer-hours').value) || 0;
            const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
            const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
            timerTime = hours * 3600 + minutes * 60 + seconds;
            updateTimerDisplay();
        }
        if (timerTime > 0) {
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                if (timerTime > 0) {
                    timerTime--;
                    updateTimerDisplay();
                } else {
                    stopTimer();
                    if (window.playTimerSound) window.playTimerSound();
                }
            }, 1000);
        }
    }
}

function stopTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
    }
}

function setTimer() {
    const hours = parseInt(document.getElementById('timer-hours').value) || 0;
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;

    timerTime = hours * 3600 + minutes * 60 + seconds;
    updateTimerDisplay();
    stopTimer();
}

// Attach event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const setBtn = document.getElementById('set-timer');
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');

    if (setBtn) setBtn.addEventListener('click', setTimer);
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (stopBtn) stopBtn.addEventListener('click', stopTimer);
});
