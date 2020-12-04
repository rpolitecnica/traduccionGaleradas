import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TraduccionComponent } from './components/traduccion/traduccion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EdicionesComponent } from './components/ediciones/ediciones.component';
import { CorreosComponent } from './components/correos/correos.component';
import { ListadoTraduccionesComponent } from './components/listado-traducciones/listado-traducciones.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ListadoArticulosComponent } from './components/listado-articulos/listado-articulos.component';

const routes: Routes = [
  { path: 'login.component', component: LoginComponent },
  { path: 'menu.component', component: MenuComponent },
  { path: 'traduccion.component', component: TraduccionComponent },
  { path: 'usuarios.component', component: UsuariosComponent },
  { path: 'ediciones.component', component: EdicionesComponent },
  { path: 'correos.component', component: CorreosComponent },
  { path: 'listado-traducciones.component', component: ListadoTraduccionesComponent },
  { path: 'listado-articulos.component', component: ListadoArticulosComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: '', redirectTo: 'login.component',pathMatch:'full' },
  { path: 'menu', redirectTo: 'menu.component',pathMatch:'full' },
  { path: 'traduccion', redirectTo: 'traduccion.component',pathMatch:'full' },
  { path: 'usuarios', redirectTo: 'usuarios.component',pathMatch:'full' },
  { path: 'ediciones', redirectTo: 'ediciones.component',pathMatch:'full' },
  { path: 'correos', redirectTo: 'correos.component',pathMatch:'full' },
  { path: 'bienvenida', redirectTo: 'bienvenida.component',pathMatch:'full' },
  { path: 'listado-traducciones', redirectTo: 'listado-traducciones.component',pathMatch:'full' },
  { path: 'listado-articulos', redirectTo: 'listado-articulos.component',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
