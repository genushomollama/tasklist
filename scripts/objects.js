class Task {
  constructor(name, hr, min, sec) {
    this.name = name;
    this.hour = hr;
    this.minute = min;
    this.second = sec;
  }

  // Todo getters and setters
  getSeconds() {
      let totalSeconds = (this.hour * 60 * 60) + (this.minutes * 60) + this.seconds;
      return totalSeconds;
  }
}

// class TaskList {
//   constructor() {
//     // this.tasks =
//   }
// }
