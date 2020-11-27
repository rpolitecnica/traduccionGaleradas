import { Component, OnInit } from '@angular/core';
import { BienvenidaService } from '../bienvenida/bienvenida.service';
import { Usuarios } from '../models/usuarios.model';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})


export class BienvenidaComponent implements OnInit {

  
  usuario:Usuarios;

  
  constructor(private service: BienvenidaService) { }

  
  ngOnInit(): void {
    this.obtenerInformacionUsuario();
  }


  obtenerInformacionUsuario(){
    this.service.obtenerUsuario(sessionStorage.getItem('email')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.usuario=data;
      console.log(this.usuario.primerApellido);
     

    });
  }
}
