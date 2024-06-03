import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Not404Component } from './pages/not404/not404.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { RandomComponent } from './login/forgot/random/random.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((x) => x.pagesRoutes),
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    children: [{ path: ':random', component: RandomComponent }],
  },
  { path: 'not-404', component: Not404Component},
  { path: '**', redirectTo: 'not-404'}
];
