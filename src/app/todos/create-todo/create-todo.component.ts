import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosService } from '../todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent implements OnDestroy {
  isCreateTodoSectionOpen: boolean = false;
  categories: string[] = ['Personal', 'Work', 'Study', 'Other'];
  createTodoForm: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder, private todosService: TodosService) {
    this.createTodoForm = this.fb.group({
      toCreateTodoText: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  onClickCreateNewTodo() {
    this.isCreateTodoSectionOpen = true;
  }
  onAddTodoText() {
    this.addTodo({
      toCreateTodoText: this.createTodoForm.get('toCreateTodoText')?.value,
      category: this.createTodoForm.get('category')?.value,
    });
    this.createTodoForm.reset();
    this.isCreateTodoSectionOpen = false;
  }
  onCloseTodoText() {
    this.isCreateTodoSectionOpen = false;
  }

  addTodo(addTodo: { toCreateTodoText: string; category: string }) {
    this.subscriptions.push(
      this.todosService
        .addTodo(addTodo)
        .subscribe({ next: () => this.todosService.getTodos().subscribe() })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
