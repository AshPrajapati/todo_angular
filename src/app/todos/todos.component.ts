import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  subscriptions: Subscription[] = [];
  isCreateTodoSectionOpen: boolean = false;
  isUpdatingTodoText: {[key:number]:boolean} = {};
  toCreateTodoText: string = '';
  toUpdateTodoText: string = '';
  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.fetchTodos();
  }

  onClickCreateNewTodo() {
    this.isCreateTodoSectionOpen = true;
  }

  onAddTodoText() {
    this.addTodo(this.toCreateTodoText);
    this.isCreateTodoSectionOpen = false;
    this.toCreateTodoText = '';
  }

  addTodo(todoText: string) {
    this.subscriptions.push(
      this.todosService.addTodo(todoText).subscribe(() => this.fetchTodos())
    );
  }

  onUpdateTodoText(id: number) {
    this.updateTodo(this.toUpdateTodoText, id);
    this.isUpdatingTodoText[id] = false;
    this.toUpdateTodoText = '';
  }

  updateTodo(todoText: string, id: number) {
    this.subscriptions.push(
      this.todosService
        .updateTodo(todoText, id)
        .subscribe(() => this.fetchTodos())
    );
  }

  onCloseTodoText() {
    this.isCreateTodoSectionOpen = false;
  }

  onCloseUpdateTodoText(id:number) {
    this.isUpdatingTodoText[id] = false;
  }

  onClickUpdateBtn(id:number) {
    this.isUpdatingTodoText[id] = true;
  }

  onDelete(id: number): void {
    this.subscriptions.push(
      this.todosService.deleteTodo(id).subscribe(() => {
        this.fetchTodos();
      })
    );
  }

  fetchTodos() {
    this.subscriptions.push(
      this.todosService.getTodos().subscribe({
        next: (todos) => {
          this.todos = todos.todos;
        },
        error: (error) => {
          console.error('error in fetching', error);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
