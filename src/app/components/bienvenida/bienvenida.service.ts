import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BienvenidaService {

  constructor(private httClient:HttpClient) { }


  obtenerUsuario(correoElectronico:string){
    return this.httClient.get(environment.services.baseUrl+"/"+correoElectronico)
   };

   obtenerOpciones(idPerfil:string){
    return this.httClient.get(environment.services.baseUrlMenu+"/"+idPerfil)
   };
}
