const hour = document.querySelector("#hours");
const minute = document.querySelector("#minutes");
const second = document.querySelector("#seconds");
const milisecond = document.querySelector("#miliseconds");
const startbutton = document.querySelector("#start");
const pausebutton = document.querySelector("#pause");
const resumebutton = document.querySelector("#resume");
const resetbutton = document.querySelector("#reset");
const pauseHistory = document.querySelector("#pauseHistory");

let interval; 
let isRunning = false; 
let startTime = 0; 
let timePassed = 0; 
let pauseTime = 0; 
let pauses = []; 

function updateClock() {
    const currentTime = Date.now();
    const time = timePassed + (currentTime - startTime); 

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    hour.innerHTML = String(hours).padStart(2, "0");
    minute.innerHTML = String(minutes).padStart(2, "0");
    second.innerHTML = String(seconds).padStart(2, "0");
    milisecond.innerHTML = String(milliseconds).padStart(3, "0");
}

function startClock() {
    if (!isRunning) {
        startTime = Date.now() - timePassed; 
        interval = setInterval(updateClock, 10); 
        isRunning = true;

        startbutton.style.display = "none";
        pausebutton.style.display = "inline-block";
        resumebutton.style.display = "none";
    }
}

function pauseClock() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        timePassed += Date.now() - startTime; 

        // Registra a pausa no histórico
        const pauseItem = document.createElement("li");
        pauseItem.textContent = `Pausa em: ${formatTime(timePassed)}`;
        pauseHistory.appendChild(pauseItem);

        resumebutton.style.display = "inline-block";
        pausebutton.style.display = "none";
    }
}

function resumeClock() {
    if (!isRunning) {
        startTime = Date.now();
        interval = setInterval(updateClock, 10);
        isRunning = true;

        startbutton.style.display = "none";
        pausebutton.style.display = "inline-block";
        resumebutton.style.display = "none";
    }
}

function resetClock() {
    clearInterval(interval);
    isRunning = false;
    timePassed = 0; 
    hour.innerHTML = "00";
    minute.innerHTML = "00";
    second.innerHTML = "00";
    milisecond.innerHTML = "000";

    pauseHistory.innerHTML = "";

    startbutton.style.display = "inline-block";
    pausebutton.style.display = "none";
    resumebutton.style.display = "none";
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
}

// Atalhos de teclado
document.addEventListener("keydown", (event) => {
    if (event.key === "i" || event.key === "I") {
        startClock();
    } else if (event.key === "p" || event.key === "P") {
        pauseClock();
    } else if (event.key === "c" || event.key === "C") {
        resumeClock();
    } else if (event.key === "r" || event.key === "R") {
        resetClock();
    }
});

startbutton.addEventListener("click", startClock);
pausebutton.addEventListener("click", pauseClock);
resumebutton.addEventListener("click", resumeClock);
resetbutton.addEventListener("click", resetClock);
