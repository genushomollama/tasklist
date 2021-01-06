class Task {
  constructor(name, hr, min, sec) {
    this.name = name;
    this.hour = hr;
    this.minute = min;
    this.second = sec;
  }

  // Todo getters and setters
  getSeconds() {
      // let totalSeconds = (parseInt(this.hour, 10) * 60 * 60) + (parseInt(this.minute, 10) * 60) + parseInt(this.second, 10);
      let totalSeconds = (this.hour * 60 * 60) + (this.minute * 60) + this.second;
      return totalSeconds;
  }
}

// class TaskList {
//   constructor() {
//     // this.tasks =
//   }
// }
