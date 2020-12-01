import { Component, OnInit } from '@angular/core';

import { MenuService } from '../menu/menu.service';
import { Menu } from '../models/menu.model';
import { Usuarios } from '../models/usuarios.model';
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
  constructor(private service: MenuService, private utilService: UtilService) {

  }

  opcionesMenu = [
  ]
  ngOnInit(): void {

    this.obtenerInformacionMenu();
    console.log("menu")
    this.opcionesMenu = this.utilService.opcionesMenu;
  }

  obtenerInformacionMenu() {
    this.service.obtenerUsuario(sessionStorage.getItem('email')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.usuario = data;
      console.log(this.usuario.primerApellido);

      sessionStorage.setItem('idPerfil', this.usuario.idPerfil);


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
