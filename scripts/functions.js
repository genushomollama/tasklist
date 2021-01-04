// identify form components
const newTaskName = document.getElementById("taskName");
const newTaskHr = document.getElementById("taskHr");
const newTaskMin = document.getElementById("taskMin");
const newTaskSec = document.getElementById("taskSec");
const newTaskButton = document.getElementById("addTaskButton");

// list to populate with tasks
const taskListDisplay = document.getElementById("taskList");

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

// function decrementTimerDisplay() {
//     if (currentSec > )
// }

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
}

// start timer for task
function startTask(currentTask) {
    currentHr = currentTask.hour;
    currentMin = currentTask.minute;
    currentSec = currentTask.second;
    currentTimeDisplay = window.setInterval(decrementTimerDisplay(), 1000);
    taskAlarm = window.setTimeout(soundAlarm(), currentTask.getSeconds());

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

    } else {
        // select next task and call startTask
        if (currentTask < taskList.length) {
            startTask(taskList[currentTask]);
            currentTask = (currentTask + 1) % taskList.length;
        }
    }
}


// attach event handelers to add tasks
newTaskButton.addEventListener("click", function () {
    addTask();
});
