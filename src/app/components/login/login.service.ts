import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httClient:HttpClient) { }

 

  validarUsuarios(correoElectronico:string){
    return this.httClient.get(environment.services.baseUrl+"/"+correoElectronico);
  }
}
