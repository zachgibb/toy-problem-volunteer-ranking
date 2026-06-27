import { Task } from "./task";

// Set max score const in case we ever want to change granularity of ranking scoring
const MAX_SCORE = 4;

class Volunteer {
  id: number;
  name: string;
  interestedTasks: Task[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.interestedTasks = [];
  }

  toString(): string {
    return `Volunteer #${this.id}: ${this.name}`;
  }

  addInterestedTask(task: Task) {
    this.interestedTasks.push(task);
  }

  removeInterestedTask(task: Task) {
    const taskIndex = this.interestedTasks.indexOf(task);
    if (taskIndex >= 0) {
      this.interestedTasks.splice(taskIndex, 1);
    }
  }

  isInterested(task: Task): boolean {
    return this.interestedTasks.includes(task);
  }

  getTaskScore(task: Task): number {
    const taskIndex = this.interestedTasks.indexOf(task)

    // if the task is not in the interested tasks array, return -1;
    if (taskIndex > 0) {
      return -1;
    }

    // Otherwise, give this will give increasingly less points (with a minimum of zero)
    // for each ranking down from the volunteer's first choice
    return Math.max(MAX_SCORE - taskIndex, 1);
  }
}

export { Volunteer };
