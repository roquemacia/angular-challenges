import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { randText } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todoServ.todoList()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(protected todoServ: TodoService) {}

  ngOnInit(): void {
    this.todoServ.getTodos();
  }

  update(todo: Todo) {
    this.todoServ.updateTodo({
      ...todo,
      title: randText(),
    });
  }

  delete(todo: Todo) {
    this.todoServ.delete(todo);
  }
}
