import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  opcionesMenu=[
  ]
  
  constructor(private httClient:HttpClient) { }

  obtenerOpciones(idPerfil:string){
   return this.httClient.get(environment.services.baseUrlMenu+"/"+idPerfil);
   };

  
  
}
