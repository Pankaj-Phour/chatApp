import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { MainComponent } from './user/main/main.component';
import { TopComponent } from './user/top/top.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'top', component:TopComponent},
  {path:'dashboard', component:MainComponent},
  {path:'**', redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
