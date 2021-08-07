import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { RoleGuard } from './core/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [{
      path: '', redirectTo: '/login', pathMatch: 'full',
    }, {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    }, {
      path: 'users',
      // canActivate: [RoleGuard],
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    }]
  },
  {
    path: '',
    children: [{
      path: '', redirectTo: '/login', pathMatch: 'full',
    }, {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    }]
  },
  {
    path: '**',
    redirectTo: '/login'// /authentication/404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
