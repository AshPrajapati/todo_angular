import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo: Todo = { id: 1, todoText: 'text', todoDate: new Date(),category:"Personal" };
  @Output() updateTodo = new EventEmitter<{
    todoTextToUpdate: string;
    id: number;
  }>();
  @Output() deleteTodo = new EventEmitter<number>();
  todoTextToUpdate: string = '';
  isUpdatingTodoText: boolean = false;

  onClickUpdateBtn() {
    this.isUpdatingTodoText = true;
    this.todoTextToUpdate = this.todo.todoText;
  }

  onUpdateTodoText(id: number) {
    this.updateTodo.emit({ todoTextToUpdate: this.todoTextToUpdate, id: id });
    this.todoTextToUpdate = '';
    this.isUpdatingTodoText = false;
  }

  onCloseUpdateTodoText() {
    this.isUpdatingTodoText = false;
  }

  onDelete(id: number) {
    this.deleteTodo.emit(id);
  }
}
