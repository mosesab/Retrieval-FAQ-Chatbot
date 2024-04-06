import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Your routing file should look like this
export const routes: Routes = [
  // A route to the home page (component)
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'faqs',
    loadChildren: () =>
      import('./modules/faqs/faqs.module').then((m) => m.FaqsModule),
  },
];
