"use strict";
const $ = selector => document.querySelector(selector);

const padSingleDigit = num => num.toString().padStart(2, "0");

const displayCurrentTime = () => {
    const now = new Date() 
    let hours = now.getHours()
    let ampm = "AM"
    if (hours > 12)
    {
        hours -= 12
        ampm = "PM"
    }
    else {
        switch (hours) {
            case 12:
                ampm = "PM"
                break;

            case 0:
                hours = 12
                ampm = "AM"
                break;
            default:
                break;
        }
    }
    $("#hours").textContent = hours
    $("#minutes").textContent = padSingleDigit(now.getMinutes())
    $("#seconds").textContent = padSingleDigit(now.getSeconds())
    $("#ampm").textContent = ampm
}


//global stop watch timer variable and elapsed time object
let stopwatchTimer = null;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;

const tickStopwatch = () => {    
    // increment milliseconds by 10 milliseconds
    elapsedMilliseconds += 10
    // if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    if (elapsedMilliseconds === 1000)
    {elapsedSeconds += 1; elapsedMilliseconds = 0}
    // if seconds total 60, increment minutes by one and reset seconds to zero
    if (elapsedSeconds === 60)
    {elapsedMinutes += 1; elapsedSeconds = 0}
    //display new stopwatch time
    $("#s_minutes").textContent = elapsedMinutes
    $("#s_seconds").textContent = elapsedSeconds
    $("#s_ms").textContent = elapsedMilliseconds

};

// event handler functions
const startStopwatch = evt => {
    // prevent default action of link
    event.preventDefault()
    // do first tick of stop watch and then set interval timer to tick 
    // stopwatch every 10 milliseconds. Store timer object in stopwatchTimer 
    // variable so next two functions can stop timer.
     stopwatchTimer = setInterval(tickStopwatch, 10);
};

const stopStopwatch = evt => {
    // prevent default action of link
    event.preventDefault()
    // stop timer
    clearInterval(stopwatchTimer);
};

const resetStopwatch = evt => {
    // prevent default action of link
    event.preventDefault()   
    // stop timer
    clearInterval(stopwatchTimer);    
    // reset elapsed variables and clear stopwatch display
    stopwatchTimer = null;
    elapsedMinutes = 0;
    elapsedSeconds = 0;
    elapsedMilliseconds = 0;
    $("#s_minutes").textContent = elapsedMinutes
    $("#s_seconds").textContent = elapsedSeconds
    $("#s_ms").textContent = elapsedMilliseconds
};

document.addEventListener("DOMContentLoaded", () => {
	// set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime()
    setInterval(displayCurrentTime, 1000)
	
	// set up stopwatch event handlers
    $("#start").addEventListener("click", startStopwatch);
    $("#stop").addEventListener("click", stopStopwatch);
    $("#reset").addEventListener("click", resetStopwatch);
});
