import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './gaurds/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: "account", pathMatch: 'full' },
  { path: "account", loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule)  },
  { path: "dashboard", loadChildren: () => import('./module/layout/dashboard/dashboard.module').then(m => m.DashboardModule) ,},
  { path: "userroom", loadChildren: () => import('./module/layout/userroom/userroom.module').then(m => m.UserroomModule)},
];
// canActivate:[AuthguardGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
