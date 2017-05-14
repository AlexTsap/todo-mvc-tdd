import { TodoModel } from '../models/todo.models';
import { TodoService } from './todo.service';

describe('TodoStore', () => {
  let service: TodoService;
  const todos = [];

  beforeEach(() => {
    service = new TodoService();
    service.todos = todos;
  });

  it('check function add', () => {
    const testTitle = 'test';

    service.add(testTitle);

    expect(service.todos).toContain(new TodoModel('test'));
  });

  it('check function remove', () => {
    const testTodo1 = new TodoModel('test1');
    const testTodo2 = new TodoModel('test2');
    service.todos.push(testTodo1);
    service.todos.push(testTodo2);

    service.remove(testTodo1);

    expect(service.todos).toContain(new TodoModel('test2'));
  });

  it('check function removeCompleted', () => {
    spyOn(service, 'getWithCompleted');

    service.removeCompleted();

    expect(service.getWithCompleted).toHaveBeenCalledWith(false);
  });

  it('check function getWithCompleted', () => {
    service.todos.push(new TodoModel('test'));
    spyOn(service.todos, 'filter');

    service.getWithCompleted(false);

    expect(service.todos.filter).toHaveBeenCalled();

    service.todos.filter(t => {
      expect(t.completed).toEqual(false);
    });
  });

  it('check function getCompleted', () => {
    spyOn(service, 'getWithCompleted');

    service.getCompleted();

    expect(service.getWithCompleted).toHaveBeenCalledWith(true);
  });

  it('check function getRemaining', () => {
    spyOn(service, 'getWithCompleted');

    service.getRemaining();

    expect(service.getWithCompleted).toHaveBeenCalledWith(false);
  });

  it('check function setAllTo', () => {
    const testTodo = new TodoModel('test');
    service.todos.push(testTodo);

    service.setAllTo(true);

    service.todos.forEach(item => {
      expect(item.completed).toEqual(true);
    });
  });

  it('check function toggleCompletion', () => {
    const testTodo = new TodoModel('test');

    service.toggleCompletion(testTodo);
  });

  it('check function allCompleted', () => {
    const getCompletedResult = service.getWithCompleted(true);

    service.allCompleted();

    expect(service.todos.length).toEqual(getCompletedResult.length);
  });

});
