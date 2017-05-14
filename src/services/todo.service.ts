import { TodoModel } from '../models/todo.models';

export class TodoService {
  todos: TodoModel[];

  constructor() {
    this.todos = [];
  }
  add(title: string) {
    this.todos.push(new TodoModel(title));
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  remove(todo: TodoModel) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
  }

  getWithCompleted(completed: boolean) {
    return this.todos.filter((todo: TodoModel) => todo.completed === completed);
  }

  setAllTo(completed: boolean) {
    this.todos.forEach((t: TodoModel) => {
      t.completed = completed;
    });
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  toggleCompletion(todo: TodoModel) {
    todo.completed = !todo.completed;
  }
}
