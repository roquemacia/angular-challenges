import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { basicInterceptor } from './error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([basicInterceptor])),
  ],
};
