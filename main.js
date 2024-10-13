let timer;
let timeLeft = 1500; 
let isRunning = false;
let currentMode = 'pomodoro';

const timerDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const startPomodoroButton = document.getElementById('start-pomodoro');
const taskInput = document.getElementById('task');
const timerContainer = document.getElementById('timer');
const taskDisplay = document.getElementById('task-display');
const currentTaskDisplay = document.getElementById('current-task');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        pauseButton.classList.add('active');
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timer);
                alert('Waktu habis!');
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = currentMode === 'pomodoro' ? 1500 : currentMode === 'short-break' ? 300 : 900;
    updateDisplay();
    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
}

function setMode(mode) {
    currentMode = mode;
    resetTimer();
    pomodoroButton.classList.toggle('active', mode === 'pomodoro');
    shortBreakButton.classList.toggle('active', mode === 'short-break');
    longBreakButton.classList.toggle('active', mode === 'long-break');
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);


pomodoroButton.addEventListener('click', () => setMode('pomodoro'));
shortBreakButton.addEventListener('click', () => setMode('short-break'));
longBreakButton.addEventListener('click', () => setMode('long-break'));


startPomodoroButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        currentTaskDisplay.textContent = task;
        document.getElementById('task-input').classList.add('hidden');
        timerContainer.classList.remove('hidden');
        taskDisplay.classList.remove('hidden');
    } else {
        alert('Silakan masukkan tugas terlebih dahulu!');
    }
});

updateDisplay();