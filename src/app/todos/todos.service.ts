import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './todos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private baseUrl = "http://localhost:5000/todos/";
  constructor(private http:HttpClient) { }

  getTodos():Observable<{ todos: Todo[] }>{
    return this.http.get<{ todos: Todo[] }>(this.baseUrl);
  }

  deleteTodo(id:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+id);
  }

  addTodo(todoText:string){
    return this.http.post(this.baseUrl+"create",{todoText:todoText});
  }

  updateTodo(todoTextToUpdate:string,id:number){
    return this.http.put(this.baseUrl+id,{todoTextToUpdate:todoTextToUpdate});
  }
}
