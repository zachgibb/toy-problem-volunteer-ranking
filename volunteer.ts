import { Task } from "./task.ts";

// Set max score const in case we ever want to change granularity of ranking scoring
const MAX_SCORE = 4;

class Volunteer {
  id: number;
  name: string;
  interestedTasks: Task[];
  assignedTasks: number;
  totalSatisfaction: number;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.interestedTasks = [];
    this.assignedTasks = 0;
    this.totalSatisfaction = 0;
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

  assignTask(task: Task) {
    this.assignedTasks += 1;
    this.totalSatisfaction += this.getTaskScore(task);
  }

  getTaskScore(task: Task): number {
    // if the task is not in the interested tasks array, return -1;
    if (!this.interestedTasks.includes(task)) {
      return -1;
    }

    const taskIndex = this.interestedTasks.indexOf(task)

    // Otherwise, give this will give increasingly less points (with a minimum of zero)
    // for each ranking down from the volunteer's first choice
    return Math.max(MAX_SCORE - taskIndex, 1);
  }

  getWeightedTaskScore(task: Task): number {
    // if a user has only a few interested tasks, their selections should get rated higher
    return (this.getTaskScore(task) / this.interestedTasks.length)
    // if a user already has assignments, they should be deprioritized
      - (this.assignedTasks);
  }
}

export { Volunteer };
