import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loaderServ: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderServ.hideLoader();
        console.log('Request completed');
      }),
      catchError((err) => {
        console.log('Error caught in interceptor');
        console.error(err);
        return of();
      })
    );
  }
}
