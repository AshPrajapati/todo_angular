import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from './todos.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  subscriptions: Subscription[] = [];
  constructor(private todosService: TodosService) {}
  ngOnInit(): void {
    this.fetchTodos();
  }
  addTodo(todoText: string) {
    this.subscriptions.push(
      this.todosService.addTodo(todoText).subscribe(() => this.fetchTodos())
    );
  }

  updateTodo(updateTodo: { todoTextToUpdate: string; id: number }) {
    this.subscriptions.push(
      this.todosService
        .updateTodo(updateTodo.todoTextToUpdate, updateTodo.id)
        .subscribe(() => this.fetchTodos())
    );
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
