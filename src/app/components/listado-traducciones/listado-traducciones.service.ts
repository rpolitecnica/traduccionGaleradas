import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ediciones } from '../models/ediciones.model';

@Injectable({
  providedIn: 'root'
})
export class ListadoTraduccionesService {

  constructor(private httClient:HttpClient) { }

  obtenerTraducciones(){
    return this.httClient.get(environment.services.baseUrlTraducciones)
   };

   obtenerTraduccionesPorUsuario(idUsuario:string){
    return this.httClient.get(environment.services.baseUrlTraducciones+"/"+idUsuario)
   };


   obtenerTraduccionesPorUsuarioAnio(idUsuario:string){
    return this.httClient.get(environment.services.baseUrlEdicionesYear+"/"+idUsuario)
   };

   obtenerTraduccionesPorUsuarioAnioIdEdicion(Anio:string){
    return this.httClient.get(environment.services.baseUrlEdicionesYearIdEdicion+"/"+Anio)
   };


   eliminarTraduccion(id:string){
    return this.httClient.delete(environment.services.baseUrlTraducciones+"/"+id);
   };


   modificarTraduccion(idTraduccion:string,edicion:Ediciones){
     return this.httClient.put(environment.services.baseUrlTraducciones+"/"+idTraduccion,edicion);
   }
}
