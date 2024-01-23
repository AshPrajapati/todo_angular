import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {
  isCreateTodoSectionOpen: boolean = false;
  toCreateTodoText: string = '';
  @Output() addTodo = new EventEmitter<string>();
  onClickCreateNewTodo() {
    this.isCreateTodoSectionOpen = true;
  }
  onAddTodoText() {
    this.addTodo.emit(this.toCreateTodoText);
    this.toCreateTodoText = '';
    this.isCreateTodoSectionOpen = false;
  }
  onCloseTodoText() {
    this.isCreateTodoSectionOpen = false;
  }
}
