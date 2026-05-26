// Stopwatch module JavaScript

let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    const display = document.getElementById('stopwatch-value');
    if (display) {
        display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        updateStopwatchDisplay();
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 1000);
    }
}

function stopStopwatch() {
    if (isStopwatchRunning) {
        isStopwatchRunning = false;
        clearInterval(stopwatchInterval);
    }
}

function resetStopwatch() {
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

// Attach event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-stopwatch');
    const stopBtn = document.getElementById('stop-stopwatch');
    const resetBtn = document.getElementById('reset-stopwatch');

    if (startBtn) startBtn.addEventListener('click', startStopwatch);
    if (stopBtn) stopBtn.addEventListener('click', stopStopwatch);
    if (resetBtn) resetBtn.addEventListener('click', resetStopwatch);
});
