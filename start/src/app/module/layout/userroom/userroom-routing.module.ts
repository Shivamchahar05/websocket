import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserroomComponent } from './userroom.component';

const routes: Routes = [
  {
    path:"" , component:UserroomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserroomRoutingModule { }
