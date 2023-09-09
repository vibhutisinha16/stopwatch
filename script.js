let isRunning = false;
let startTime;
let interval;
let laps = [];
let lapCount = 1;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0);
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    laps = [];
    lapCount = 1;
    document.getElementById("laps").textContent = "";
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        const lapDisplay = document.createElement("div");
        lapDisplay.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        document.getElementById("laps").appendChild(lapDisplay);
        lapCount++;
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const millisecondsFormatted = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millisecondsFormatted}`;
}
