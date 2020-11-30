import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Usuarios} from '../models/usuarios.model'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httClient:HttpClient) { }

  obtenerUsuarios(){
    return this.httClient.get(environment.services.baseUrl);
  }

  guardarUsuario(usuario:Usuarios){
    return this.httClient.post(environment.services.baseUrl,usuario);
  }

  eliminarUsuario(id:string){
    return this.httClient.delete(environment.services.baseUrl+"/"+id);
  }

  editarUsuario(id:string,usuario:Usuarios){
    return this.httClient.put(environment.services.baseUrl+"/"+id,usuario)
  }

  obtenerPerfiles(){
    return this.httClient.get(environment.services.baseUrlPerfiles);
  }
}
