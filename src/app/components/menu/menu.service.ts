import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httClient:HttpClient) { }


  obtenerOpciones(idPerfil:string){
    return this.httClient.get(environment.services.baseUrlMenu+"/"+idPerfil)
   };
}
