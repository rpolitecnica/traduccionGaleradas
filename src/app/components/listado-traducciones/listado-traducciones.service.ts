import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListadoTraduccionesService {

  constructor(private httClient:HttpClient) { }

  obtenerTraducciones(){
    return this.httClient.get(environment.services.baseUrlTraducciones)
   };

   eliminarTraduccion(id:string){
    return this.httClient.delete(environment.services.baseUrlTraducciones+"/"+id);
   };
}
