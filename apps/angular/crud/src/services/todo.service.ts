import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private url = 'https://jsonplaceholder.typicode.com/todos';

  todoList = signal<Todo[]>([]);

  constructor(private http: HttpClient, private loaderServ: LoaderService) {}

  /**
   * Gets the list of todos from the API, updating the todoList BehaviorSubject
   * @return void
   *
   */
  getTodos() {
    const obs = this.http.get<Todo[]>(this.url);
    obs.subscribe((todos) => {
      this.todoList.set(todos);
    });
  }

  /**
   * Updates the todo, and returns the updated list of todos
   * @param todo
   * @return void
   */
  updateTodo(todo: Todo) {
    const body = JSON.stringify(todo);
    this.loaderServ.showLoader();

    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };

    const obs = this.http.put<Todo>(`${this.url}/${todo.id}`, body, {
      headers: headers,
    });

    obs.subscribe(() => {
      const todos = this.todoList();
      const i = todos.findIndex((t) => t.id === todo.id);
      todos[i] = todo;
      this.todoList.set(todos);
    });
  }

  /**
   * Deletes the todo, and returns the updated list of todos
   * @param todo
   * @return void
   */
  delete(todo: Todo) {
    this.loaderServ.showLoader();
    const obs = this.http.delete<Todo>(`${this.url}/${todo.id}`);
    obs.subscribe(() => {
      const todos = this.todoList();
      const i = todos.findIndex((t) => t.id === todo.id);
      todos.splice(i, 1);
      this.todoList.set(todos);
    });
  }
}
