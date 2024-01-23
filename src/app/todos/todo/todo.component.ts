import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Todo } from '../todos.model';
import { TodosService } from '../todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnDestroy {
  @Input() todo: Todo = {
    id: 1,
    todoText: 'text',
    todoDate: new Date(),
    category: 'Personal',
  };
  todoTextToUpdate: string = '';
  isUpdatingTodoText: boolean = false;
  subscriptions: Subscription[] = [];
  constructor(private todosService: TodosService) {}

  onClickUpdateBtn() {
    this.isUpdatingTodoText = true;
    this.todoTextToUpdate = this.todo.todoText;
  }

  onUpdateTodoText(id: number) {
    this.updateTodo({ todoTextToUpdate: this.todoTextToUpdate, id: id });
    this.todoTextToUpdate = '';
    this.isUpdatingTodoText = false;
  }

  onCloseUpdateTodoText() {
    this.isUpdatingTodoText = false;
  }

  onDelete(id: number) {
    this.deleteTodo(id);
  }

  updateTodo(updateTodo: { todoTextToUpdate: string; id: number }) {
    this.subscriptions.push(
      this.todosService
        .updateTodo(updateTodo.todoTextToUpdate, updateTodo.id)
        .subscribe({
          next: () =>
            this.subscriptions.push(this.todosService.getTodos().subscribe()),
        })
    );
  }

  deleteTodo(id: number): void {
    this.subscriptions.push(
      this.todosService
        .deleteTodo(id)
        .subscribe({
          next: () =>
            this.subscriptions.push(this.todosService.getTodos().subscribe()),
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
