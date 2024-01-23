import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo: Todo = { id: 1, todoText: 'text', todoDate: new Date() };
  @Output() updateTodo = new EventEmitter<{
    todoTextToUpdate: string;
    id: number;
  }>();
  @Output() deleteTodo = new EventEmitter<number>();
  toUpdateTodoText: string = '';
  isUpdatingTodoText: boolean = false;

  onClickUpdateBtn() {
    this.isUpdatingTodoText = true;
    this.toUpdateTodoText = this.todo.todoText;
  }

  onUpdateTodoText(id: number) {
    this.updateTodo.emit({ todoTextToUpdate: this.toUpdateTodoText, id: id });
    this.toUpdateTodoText = '';
    this.isUpdatingTodoText = false;
  }

  onCloseUpdateTodoText() {
    this.isUpdatingTodoText = false;
  }

  onDelete(id: number) {
    this.deleteTodo.emit(id);
  }
}
