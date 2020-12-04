import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{Ediciones} from 'src/app/components/models/ediciones.model'
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EdicionesService {

  constructor(private httClient:HttpClient) { }


  guardarEdicion(edicion:Ediciones){
   return this.httClient.post(environment.services.baseUrlEdiciones,edicion);
  }

  obtenerEdiciones(){
   return this.httClient.get(environment.services.baseUrlEdiciones)
  };

  obtenerEdicionesPorUsuario(idUsuario:string){
    return this.httClient.get(environment.services.baseUrlEdiciones+"/"+idUsuario)
   };

  eliminarEdicion(id:string){
    return this.httClient.delete(environment.services.baseUrlEdiciones+"/"+id);
  }

  editarEdicion(id:string,edicion:Ediciones){
    console.log("editarrr "+edicion);
    return this.httClient.put(environment.services.baseUrlEdiciones+"/"+id,edicion)
  }

  obtenerPeriodos(){
    return this.httClient.get(environment.services.baseUrlPeriodos)
   };
}
