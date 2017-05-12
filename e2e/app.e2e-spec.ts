import { TodoMvcTddPage } from './app.po';

describe('todo-mvc-tdd App', () => {
  let page: TodoMvcTddPage;

  beforeEach(() => {
    page = new TodoMvcTddPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
