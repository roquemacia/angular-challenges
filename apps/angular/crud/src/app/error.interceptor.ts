import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const basicInterceptor: HttpInterceptorFn = function (req, next) {
  return next(req).pipe(
    finalize(() => {
      inject(LoaderService).hideLoader();
      console.log('Request completed');
    }),
    catchError((err) => {
      console.log('Error caught in interceptor');
      console.error(err);
      return of();
    })
  );
};
