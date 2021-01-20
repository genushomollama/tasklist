// identify form components
const newTaskName = document.getElementById("taskName");
const newTaskHr = document.getElementById("taskHr");
const newTaskMin = document.getElementById("taskMin");
const newTaskSec = document.getElementById("taskSec");
const newTaskButton = document.getElementById("addTaskButton");

// list to populate with tasks
const taskListDisplay = document.getElementById("taskList");

// play and pause buttons
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const timeLeft = document.getElementById("currentTime");

// init environment variables
let currentTask = 0;
let paused = false;
var taskList = [];
let currentHr = 0;
let currentMin = 0;
let currentSec = 0;
let taskAlarm;
let currentTimeDisplay;
var sound = new Audio("https://freesound.org/data/previews/519/519177_4753243-lq.mp3");

function decrementTimerDisplay() {
    // decrement seconds if > 0
    if (currentSec > 0) {
        currentSec = currentSec - 1;
    } else if (currentMin > 0) { // decrement minutes and then set seconds to 59
        currentMin = currentMin - 1;
        currentSec = 59;
    } else if (currentHr > 0) { // decrement hours and set minutes to 59
        currentHr = currentHr - 1;
        currentMin = 59;
        currentSec = 59;
    }
    currentTime.innerText= currentHr + ":" + currentMin + ":" + currentSec;
}

function soundAlarm() {
    sound.currentTime = 0;
    sound.play();
}

// functions for adding new tasks for lists
function addTask() {
    // TODO: validate input
    var newTask = new Task(newTaskName.value, newTaskHr.value, newTaskMin.value, newTaskSec.value);
    taskList.push(newTask);
    // add a box to the tasklist box
    var newTaskElement = document.createElement("p");
    newTaskElement.innerText = newTask.name + " " + newTask.hour + ":" + newTask.minute + ":" + newTask.second;
    taskListDisplay.appendChild(newTaskElement);
    // add event listener to the new element for editing
    newTaskElement.addEventListener("click", function () {
        // TODO: edit tasks
        console.log("You are trying to edit the task named: " + newTask.name);
        // replace time with a form with those values
        // add a save button and attach an event listener to that
        var saveButton = document.createElement("input");
        saveButton.type = "submit";
        saveButton.class = "saveTaskButton";
        saveButton.value = "Save";
        newTaskElement.appendChild(saveButton);
    })
    // Todo: add event listener to the new element for drag and drop
}

function saveChanges() {
    // call resetData()
}

// start timer for task
function startTask(currentTask) {
    currentHr = currentTask.hour;
    currentMin = currentTask.minute;
    currentSec = currentTask.second;
    currentTime.innerText= currentHr + ":" + currentMin + ":" + currentSec;
    currentTimeDisplay = window.setInterval(function () { decrementTimerDisplay(); }, 1000);
    let timeToAlarm = currentTask.getSeconds() * 1000;
    taskAlarm = window.setTimeout(function () { soundAlarm(); }, timeToAlarm);

}

function pauseAlarm() {
    paused = true;
    window.clearInterval(currentTimeDisplay);
    window.clearTimeout(taskAlarm);
}

function resumeAlarm() {
    if (paused) {
        paused = false;
        let timeLeft = (currentHr * 60 * 60) + (currentMin * 60) + currentSec;
        currentTimeDisplay = window.setInterval(decrementTimerDisplay(), 1000);
        taskAlarm = window.setTimeout(soundAlarm(), timeLeft);
        // TODO: was something suppossed to be here ????
    } else {
        // select next task and call startTask
        if (currentTask < taskList.length) {
            startTask(taskList[currentTask]);
            currentTask = (currentTask + 1) % taskList.length;
            // TODO: start next task
        }
    }
}


// attach event handelers to add tasks
newTaskButton.addEventListener("click", function () {
    addTask();
});

// attach event handler for starting the clock
// TODO: possibly attach listener to the play image instead of it's container
playButton.addEventListener("click", function () {
    resumeAlarm();
});


// TEST CODE will be deleted
// add task newTaskHr.value, newTaskMin.value, newTaskSec.value)
// newTaskName.value = "Test Task 1";
// newTaskHr.value = 0;
// newTaskMin.value = 0;
// newTaskSec.value = 30;
// addTask();
// END TEST CODE
