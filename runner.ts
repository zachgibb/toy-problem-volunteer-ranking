import { AssignmentServer } from "./assignmentServer";
import { loadTasks, loadVolunteers } from "./util";

const main = async () => {
  const tasks = await loadTasks("tasks.csv");
  const volunteers = await loadVolunteers("volunteers.csv", tasks);

  // Instead of passing in Record<number, Type>, let's just use arrays.
  // This will allow us to use array methods like .filter/.map/.reduce without errors
  // And so we don't have to convert the type with Object.values over and over.
  const server = new AssignmentServer(Object.values(tasks), Object.values(volunteers));

  server.assignTasks();
  server.printAssignments();
};

main();
