import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httClient:HttpClient) { }

  obtenerUsuarios(){
    return this.httClient.get(environment.services.baseUrl);
  }
}
