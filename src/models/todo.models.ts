export class TodoModel {
  completed: Boolean;
  editing: Boolean;
  _title: string;

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value.trim();
  }

  constructor(title: string) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
  }
}
