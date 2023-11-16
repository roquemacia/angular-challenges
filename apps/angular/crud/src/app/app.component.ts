import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../services/loader.service';
import { TodoService } from '../services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-spinner *ngIf="todoServ.loadingOrError() === true"></mat-spinner>
    <div *ngFor="let todo of todoServ.todoList()">
      {{ todo.title }}
      <button
        (click)="update(todo)"
        [disabled]="todoServ.disabledIds().includes(todo.id)">
        Update
      </button>
      <button
        (click)="delete(todo)"
        [disabled]="todoServ.disabledIds().includes(todo.id)">
        Delete
      </button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    protected todoServ: TodoService,
    protected loaderServ: LoaderService
  ) {}

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
