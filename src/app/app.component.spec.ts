import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TodoModel } from '../models/todo.models';
import { TodoService } from '../services/todo.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        TodoService
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TodoService);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add Todo when newTodoText.length > 0', () => {
    component.newTodoText = 'test';
    spyOn(component.todoService, 'add');

    component.addTodo();

    expect(component.newTodoText).toEqual('');
    expect(component.todoService.add).toHaveBeenCalledWith('test');
  });

  it('should add Todo when newTodoText.length === 0', () => {
    component.newTodoText = '';

    component.addTodo();

    expect(component.newTodoText).toEqual('');
  });

  it('should edit Todo', () => {
    const testTodo = new TodoModel('name');

    component.editTodo(testTodo);

    expect(testTodo.editing).toEqual(true);
  });

  it('should update editing Todo when editingTitle > 0', () => {
    const testTodo = new TodoModel('name');
    const testEditedTitle = 'testName ';

    component.updateEditingTodo(testTodo, testEditedTitle);

    expect(testTodo.title).toEqual(testEditedTitle.trim());
  });

  it('should update editing Todo when editingTitle === 0', () => {
    const testTodo = new TodoModel('name');
    const testEditedTitle = ' ';
    spyOn(component.todoService, 'remove');

    component.updateEditingTodo(testTodo, testEditedTitle);

    expect(testTodo.title).toEqual(testEditedTitle.trim());
    expect(testTodo.title.length).toEqual(0);
    expect(component.todoService.remove).toHaveBeenCalledWith(testTodo);
  });

  it('should stop editing title if TodoModel.editing === false' , () => {
    const testTodo = new TodoModel('name');
    const editingTitle = 'testName';

    component.stopEditing(testTodo, editingTitle);

    expect(testTodo.title).toEqual(editingTitle);
    expect(testTodo.editing).toEqual(false);
  });

  it('should stop editing title if TodoModel.editing === true' , () => {
    const testTodo = new TodoModel('name');
    const editingTitle = 'testName';
    testTodo.editing = true;

    component.stopEditing(testTodo, editingTitle);

    expect(testTodo.title).toEqual(editingTitle);
    expect(testTodo.editing).toEqual(false);
  });

  it('should cancel editing Todo', () => {
    const testTodo = new TodoModel('name');
    testTodo.editing = true;

    component.cancelEditingTodo(testTodo);

    expect(testTodo.editing).toEqual(false);
  });

  it('should cancel remove', () => {
    const testTodo = new TodoModel('name');
    spyOn(component.todoService, 'remove');

    component.remove(testTodo);

    expect(component.todoService.remove).toHaveBeenCalled();
  });

  it('should cancel removeCompleted', () => {
    spyOn(component.todoService, 'removeCompleted');

    component.removeCompleted();
  });

  it('should filter', () => {
    const arrCompleted = new TodoModel('test');

    component.filter('all');

    component.todoService.todos.forEach(item => {
      expect(item.completed).toEqual(false);
      expect(component.todosClone).toContain(arrCompleted);

      item.completed = true;

      expect(component.todosClone).toEqual([]);
    });

    expect(component.todosClone).toEqual(component.todoService.todos);
    expect(component.todoService.todos).toEqual([]);
  });

  it('check filter when parameter active', () => {
    component.filter('active');

    expect(component.todosClone).toEqual([]);
  });

  it('check filter when parameter completed', () => {
    component.filter('completed');

    expect(component.todosClone).toEqual([]);
  });
});
