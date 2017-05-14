import { Component } from '@angular/core';
import { TodoModel } from '../models/todo.models';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  todoService: TodoService;
  todosClone: TodoModel[];
  newTodoText: string;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
    this.todosClone = todoService.todos;
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoService.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  editTodo(todo: TodoModel) {
    todo.editing = true;
  }

  updateEditingTodo(todo: TodoModel, editingTitle: string) {
    todo.editing = false;

    todo.title = editingTitle.trim();

    if (todo.title.length === 0) {
      return this.todoService.remove(todo);
    }
  }

  stopEditing(todo: TodoModel, editingTitle: string) {
    todo.title = editingTitle;
    if (todo.editing === true) {
      todo.editing = false;
    }
  }

  cancelEditingTodo(todo: TodoModel) {
    if (todo.editing === true) {
      todo.editing = false;
    }
  }

  remove(todo: TodoModel) {
    this.todoService.remove(todo);
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }

  filter(type: string) {
    const arrAll = this.todoService.todos;
    const arrActive = [];
    const arrCompleted = [];

    arrAll.forEach(item => {
      if (item.completed) {
        arrActive.push(item);
      } else {
        arrCompleted.push(item);
      }
    });

    switch (type) {
      case  'all':
        this.todosClone = arrAll;
        break;

      case  'active':
        this.todosClone = arrCompleted;
        break;

      case  'completed':
        this.todosClone = arrActive;
        break;
    }
  }
}
