import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TraduccionService {

  constructor(private httClient:HttpClient) { }

  uploadFile(formData){
    let urlApi='http://localhost:3000/api/subir';
    return this.httClient.post(urlApi,formData);
  }

  traducirFile(){
    let urlApi='http://localhost:3000/api/traducir';
    return this.httClient.post(urlApi,"tra");
  }

  obtenerEdiciones(){
    return this.httClient.get(environment.services.baseUrlEdiciones)
   };

}
