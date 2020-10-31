import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TraduccionService {

  constructor(private httClient:HttpClient) { }

  uploadFile(formData){
    let urlApi='http://localhost:3000/api/subir';
    return this.httClient.post(urlApi,formData);
  }

}
