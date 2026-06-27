class Task {
  id: number;
  name: string;
  description: string;
  volunteers_needed: number;

  // make sure we can easily validate property data types
  constructor(id: Task['id'], name: Task['name'], description: Task['description'], volunteers_needed: Task['volunteers_needed']) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.volunteers_needed = volunteers_needed;
  }

  toString() {
    return `Task #${this.id}: ${this.name}`;
  }

  update() {
    return `Task #${this.id}: ${this.name}`;
  }
}


export { Task };
