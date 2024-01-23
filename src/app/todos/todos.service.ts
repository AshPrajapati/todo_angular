import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './todos.model';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseUrl = 'http://localhost:5000/todos/';
  todos: Subject<{ todos: Todo[] }> = new Subject();
  constructor(private http: HttpClient) {}

  getTodos(): Observable<{ todos: Todo[] }> {
    return this.http.get<{ todos: Todo[] }>(this.baseUrl).pipe(
      tap((response) => {
        this.todos.next(response);
      })
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http
      .delete<void>(this.baseUrl + id)
      .pipe(tap(() => this.getTodos().subscribe()));
  }

  addTodo(addTodo: { toCreateTodoText: string; category: string }) {
    return this.http
      .post(this.baseUrl + 'create', {
        todoText: addTodo.toCreateTodoText,
        category: addTodo.category,
      })
      .pipe(tap(() => this.getTodos().subscribe()));
  }

  updateTodo(todoTextToUpdate: string, id: number) {
    return this.http
      .put(this.baseUrl + id, {
        todoTextToUpdate: todoTextToUpdate,
      })
      .pipe(tap(() => this.getTodos().subscribe()));
  }
}
