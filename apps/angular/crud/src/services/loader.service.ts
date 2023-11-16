import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  isLoading = signal(false);

  showLoader() {
    console.log('Showing loader');
    this.isLoading.set(true);
  }

  hideLoader() {
    console.log('Hiding loader');
    this.isLoading.set(false);
  }
}
