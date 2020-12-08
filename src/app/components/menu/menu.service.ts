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


  obtenerUsuario(correoElectronico:string){
    return this.httClient.get(environment.services.baseUrl+"/"+correoElectronico)
   };

   cerrarSesion(){
     return this.httClient.get("https://mail.google.com/mail/u/0/?logout&h1=en");
   }

}
