import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthGuard } from './project/helpers';
import { Role } from './project/models';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'sourcefiles/newfiles',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        loadChildren: () => import('./project/pages/dashboard//dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'sources',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        loadChildren: () => import('./project/pages/sources/sources.module').then(module => module.SourcesModule)
      },
      {
        path: 'sourcefiles/newfiles',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        loadChildren: () => import('./project/pages/new-source-files/new-source-files.module').then(m => m.NewSourceFilesModule)
      },
      {
        path: 'reports',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        loadChildren: () => import('./project/pages/reports/reports.module').then(module => module.ReportsModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./project/pages/auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
  },
  {
    path: '**',
    loadChildren: () => import('./project/pages/error/error.module').then(module => module.ErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
