import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ediciones } from '../models/ediciones.model';

@Injectable({
  providedIn: 'root'
})
export class ListadoArticulosService {

  constructor(private httClient:HttpClient) { }


  obtenerTraduccionesPoridAnio(idEdicion:string,anio:string){
    return this.httClient.get(environment.services.baseUrlTraduccionesdEdicionAnio+"/"+idEdicion+"-"+anio)
   };

   modificarTraduccion(idTraduccion:string,edicion:Ediciones){
    return this.httClient.put(environment.services.baseUrlTraducciones+"/"+idTraduccion,edicion);
  }


  eliminarTraduccion(id:string){
    return this.httClient.delete(environment.services.baseUrlTraducciones+"/"+id);
   };

}
