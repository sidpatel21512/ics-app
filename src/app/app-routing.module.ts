import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '', redirectTo: '/login', pathMatch: 'full',
    }, {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    }, {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    }, {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
