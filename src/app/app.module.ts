import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TraduccionComponent } from './components/traduccion/traduccion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EdicionesComponent } from './components/ediciones/ediciones.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CorreosComponent } from './components/correos/correos.component';
import { ListadoTraduccionesComponent } from './components/listado-traducciones/listado-traducciones.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    TraduccionComponent,
    UsuariosComponent,
    EdicionesComponent,
    CorreosComponent,
    ListadoTraduccionesComponent,
    BienvenidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
