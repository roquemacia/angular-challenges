import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { HttpClient } from '@angular/common/http';
import { TodoService } from '../services/todo.service';
import { Todo } from '../model/todo.model';
import { of } from 'rxjs';
import { randText } from '@ngneat/falso';

const todoListMock = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 2,
  },
  {
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
    userId: 3,
  },
] as Todo[];
const httpClientMock = {
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
    service = TestBed.inject(TodoService);
    httpClientMock.get.mockReturnValue(of(todoListMock));
  });

  it('should get todos and assign it to todolist', () => {
    service.getTodos();
    expect(service.todoList().length).toBe(3);
  });

  it('should update todo', () => {
    httpClientMock.put.mockReturnValue(of({}));
    service.getTodos();
    const todo = todoListMock[0];
    service.todoList.set(todoListMock);
    const title = randText();
    todo.title = title;
    service.updateTodo(todo);
    expect(service.todoList()[0].title).toBe(title);
    expect(service.todoList().length).toBe(3);
  });

  it('should delete todo', () => {
    service.getTodos();
    const todo = todoListMock[0];
    service.todoList.set(todoListMock);
    httpClientMock.delete.mockReturnValue(of({}));
    service.delete(todo);
    expect(service.todoList().length).toBe(2);
  });
});
