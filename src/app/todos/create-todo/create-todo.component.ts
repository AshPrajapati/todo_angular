import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {
  isCreateTodoSectionOpen: boolean = false;
  categories: string[] = ['Personal', 'Work', 'Study', 'Other'];
  createTodoForm: FormGroup;
  @Output() addTodo = new EventEmitter<{
    toCreateTodoText: string;
    category: string;
  }>();

  constructor(private fb: FormBuilder) {
    this.createTodoForm = this.fb.group({
      toCreateTodoText: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
  onClickCreateNewTodo() {
    this.isCreateTodoSectionOpen = true;
  }
  onAddTodoText() {
    this.addTodo.emit({
      toCreateTodoText: this.createTodoForm.get('toCreateTodoText')?.value,
      category: this.createTodoForm.get('category')?.value,
    });
    this.createTodoForm.reset();
    this.isCreateTodoSectionOpen = false;
  }
  onCloseTodoText() {
    this.isCreateTodoSectionOpen = false;
  }
}
