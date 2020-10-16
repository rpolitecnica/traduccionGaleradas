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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    TraduccionComponent,
    UsuariosComponent,
    EdicionesComponent,
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
