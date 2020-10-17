import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import{Correos} from '../models/correos.model'

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor(private httClient:HttpClient) { }

  obtenerCorreos(){
    return this.httClient.get(environment.services.baseUrlCorreos);
  }

  guardarCorreo(correo:Correos){
    return this.httClient.post(environment.services.baseUrlCorreos,correo);
  }

  eliminarCorreo(id:string){
    return this.httClient.delete(environment.services.baseUrlCorreos+"/"+id);
  }

  editarCorreo(id:string,correo:Correos){
    return this.httClient.put(environment.services.baseUrlCorreos+"/"+id,correo)
  }
}
