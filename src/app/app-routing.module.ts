import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  { path: 'login.component', component: LoginComponent },
  { path: 'menu.component', component: MenuComponent },
  { path: '', redirectTo: 'login.component',pathMatch:'full' },
  { path: 'menu', redirectTo: 'menu.component',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
