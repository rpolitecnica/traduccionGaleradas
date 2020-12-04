import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { MenuService } from '../menu/menu.service';
import { Menu } from '../models/menu.model';
import { Usuarios } from '../models/usuarios.model';
import { UtilComponent } from '../util/util.component';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  recargaBandera: boolean = false;
  menues: Array<Menu>;
  usuario: Usuarios;
  constructor(private service: MenuService, 
    private utilService: UtilService, 
    private router: Router,
    private utilComponent:UtilComponent) {

  }

  opcionesMenu = [
  ]
  ngOnInit(): void {
    this.utilComponent.validarSesion();
    this.obtenerInformacionMenu();
    console.log("menu")
    this.opcionesMenu = this.utilService.opcionesMenu;
  }

  cerrarSesion(){
    console.log("cerrar sesion");
    sessionStorage.removeItem("email");
    console.log(environment.urlFront)
    window.location.href=environment.urlFront+"/login.component";
    //this.router.navigate(['login.component']);
  }

  obtenerInformacionMenu() {
    this.service.obtenerUsuario(sessionStorage.getItem('email')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.usuario = data;
      

      sessionStorage.setItem('idPerfil', this.usuario.idPerfil);
      sessionStorage.setItem('idUsuario', this.usuario.id);


      if (sessionStorage.getItem('idPerfil') != null) {
        if(this.opcionesMenu.length==0){
          this.service.obtenerOpciones(sessionStorage.getItem('idPerfil')).subscribe((data: any) => {
            console.log("response usuarios" + data);
            this.menues = data;
            for (let menu of this.menues) {
              var anadir: false;
  
  
              console.log(this.opcionesMenu.includes({ name: menu.modulo, route: menu.ruta, icon: menu.icono }));
                if (!this.opcionesMenu.includes({ name: menu.modulo, route: menu.ruta, icon: menu.icono })) {
                  this.opcionesMenu.push({ name: menu.modulo, route: menu.ruta, icon: menu.icono })
                }
             
              
              
  
  
  
            }
  
  
          });
        }
       
      }

    });



  }

}
