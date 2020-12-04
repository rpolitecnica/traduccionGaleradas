import { Component, OnInit } from '@angular/core';
import { BienvenidaService } from '../bienvenida/bienvenida.service';
import { Menu } from '../models/menu.model';
import { Usuarios } from '../models/usuarios.model';
import { UtilComponent } from '../util/util.component';
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
  
  constructor(private service: BienvenidaService,private utilService:UtilService,private utilComponent:UtilComponent) { }

  
  ngOnInit(): void {
    console.log("bienvenida")
    this.utilComponent.validarSesion();
    this.obtenerInformacionUsuario();
  }


  obtenerInformacionUsuario(){
    this.service.obtenerUsuario(sessionStorage.getItem('email')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.usuario=data;
      
      
      sessionStorage.setItem('idPerfil', this.usuario.idPerfil);
      this.perfil=this.usuario.descripcion;


      //this.obtenerInformacionMenu();

    });
  }

  obtenerInformacionMenu(){
    this.service.obtenerOpciones(sessionStorage.getItem('idPerfil')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.menues=data;
      this.utilService.opcionesMenu=[];
      for (let menu of this.menues) {

        this.utilService.opcionesMenu.push({name:menu.modulo,route:menu.ruta,icon:menu.icono})
      }
      

    });
  }
}
