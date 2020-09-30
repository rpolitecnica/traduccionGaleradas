import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../usuarios/usuarios.service'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private service:UsuariosService,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.service.obtenerUsuarios().subscribe(response=>{
      console.log("response");
      console.log(response);
     
    });
  }
  

  

}
