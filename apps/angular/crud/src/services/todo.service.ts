import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private url = 'https://jsonplaceholder.typicode.com/todos';

  todoList = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of todos from the API, updating the todoList BehaviorSubject
   * @return void
   *
   */
  getTodos() {
    const obs = this.http.get<Todo[]>(this.url);
    obs.subscribe((todos) => {
      this.todoList.next(todos);
    });
  }

  /**
   * Updates the todo, and returns the updated list of todos
   * @param todo
   * @return void
   */
  updateTodo(todo: Todo) {
    const body = JSON.stringify(todo);

    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };

    const obs = this.http.put<Todo>(`${this.url}/${todo.id}`, body, {
      headers: headers,
    });

    obs.subscribe((todoUpdated) => {
      const todos = this.todoList.getValue();
      const i = todos.findIndex((t) => t.id === todoUpdated.id);
      todos[i] = todoUpdated;
      this.todoList.next(todos);
    });
  }
}
