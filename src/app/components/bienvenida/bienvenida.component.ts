import { Component, OnInit } from '@angular/core';
import { BienvenidaService } from '../bienvenida/bienvenida.service';
import { Menu } from '../models/menu.model';
import { Usuarios } from '../models/usuarios.model';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})


export class BienvenidaComponent implements OnInit {

  
  usuario:Usuarios;
  perfil:string;
  menues:Array<Menu>;
  
  constructor(private service: BienvenidaService,private utilService:UtilService) { }

  
  ngOnInit(): void {
    console.log("bienvenida")
    this.obtenerInformacionUsuario();
  }


  obtenerInformacionUsuario(){
    this.service.obtenerUsuario(sessionStorage.getItem('email')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.usuario=data;
      console.log(this.usuario.primerApellido);
      
      sessionStorage.setItem('idPerfil', this.usuario.idPerfil);
      if(this.usuario.idPerfil=="1"){
         this.perfil="Administrador";
      }else{
        this.perfil="Editor";
      }

      this.obtenerInformacionMenu();

    });
  }

  obtenerInformacionMenu(){
    this.service.obtenerOpciones(sessionStorage.getItem('idPerfil')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.menues=data;
      for (let menu of this.menues) {
        console.log("llenando opciones menu")
        this.utilService.opcionesMenu.push({name:menu.modulo,route:menu.ruta,icon:menu.icono})
      }
      

    });
  }
}
