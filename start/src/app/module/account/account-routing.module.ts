import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path:"" , component:AccountComponent,
    children: [
      // {
      //   path: "",
      //   loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)
      // },
      {
        path: "",
        loadChildren: () => import(`./sign/sign.module`).then(m => m.SignModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }