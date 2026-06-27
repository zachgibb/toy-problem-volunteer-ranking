import { Task } from "./task.ts";
import { Volunteer } from "./volunteer.ts";

type Assignment = {
  task: Task;
  volunteers: Volunteer[];
}

class AssignmentServer {
  // Record<number, Type> is better described by Type[] when dealing with arrays
  // so we can use array methods without errors
  tasks: Task[];
  volunteers: Volunteer[];
  assignments: Map<Task, Assignment>;

  constructor(
    tasks: Task[],
    volunteers: Volunteer[]
  ) {
    this.tasks = tasks;
    this.volunteers = volunteers;
    this.assignments = new Map();
  }

  /**
   * Returns a list of volunteers who are interested in the given task.
   */
  getInterestedVolunteers(task: Task): Volunteer[] {
    return this.volunteers
      .filter((volunteer) => {
        return volunteer.isInterested(task);
      })
      .sort((a, b) => b.getWeightedTaskScore(task) - a.getWeightedTaskScore(task));
  }

  /**
   * Assigns a volunteer to each task based on their interests.
   */
  assignTasks() {
    for (const task of this.tasks) {
      // list of interested volunteers
      const interestedVolunteers = this.getInterestedVolunteers(task);

      // list of unassigned volunteers
      const uninterestedVolunteers = this.volunteers.filter((volunteer) => interestedVolunteers.indexOf(volunteer) == -1);

      // make initial assignment object
      const assignment: Assignment = {
        task,
        volunteers: []
      }

      // make sure we aren't assigning the first interested or unassigned volunteer over and over
      for (let index = 0; index < task.volunteers_needed; index++) {
        let selectedVolunteer: Volunteer;

        // get next volunteer, add to list
        if (interestedVolunteers.length > 0 && index < interestedVolunteers.length) {
          selectedVolunteer = interestedVolunteers[index];
        } else {
          selectedVolunteer = uninterestedVolunteers[index - interestedVolunteers.length];
        }
        selectedVolunteer.assignTask(task);
        assignment.volunteers.push(selectedVolunteer);
      }

      this.assignments.set(task, assignment);
    }
  }

  /**
   * Prints assignments of volunteers to tasks.
   */
  printAssignments() {
    // keep track of overall volunteer satisfaction before loop
    let totalSatisfactionScore = 0;

    for (const task of this.tasks) {

      const assignment = this.assignments.get(task) as Assignment;
      console.log(assignment.task.toString());

      // loop over all assignment's volunteers
      for (const assignee of assignment.volunteers) {
        if (assignee !== undefined) {
          // get how satisfied this volunteer is with their task
          const taskSatisfaction = assignee.getTaskScore(task);
          // add score to running total
          totalSatisfactionScore += taskSatisfaction;

          // display assignee's satisfaction alongside the assignment
          console.log(`\tAssigned to ${assignee}`);
        } else {
          console.log("\tUnassigned");
        }
      }
    }

    const volunteerListing = this.volunteers.map(volunteer => `${volunteer.name}\t| ${volunteer.assignedTasks}\t| ${volunteer.totalSatisfaction}`)

    console.log(`
============================
Volunteers
============================
Name\t| Tasks\t| Satisfaction
----------------------------
${volunteerListing.join('\n')}

Total Satisfaction Score: ${totalSatisfactionScore}`
    );
  }
}

export { AssignmentServer };
