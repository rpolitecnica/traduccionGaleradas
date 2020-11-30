import { Component, OnInit } from '@angular/core';

import { MenuService } from '../menu/menu.service';
import { Menu } from '../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

recargaBandera:boolean=false;
   menues:Array<Menu>;
  constructor(private service: MenuService) { 
   
  }

  opcionesMenu=[
  ]
  ngOnInit(): void {

    this.obtenerInformacionMenu();
    console.log("menu")
  }

  obtenerInformacionMenu(){
    this.service.obtenerOpciones(sessionStorage.getItem('idPerfil')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.menues=data;
      for (let menu of this.menues) {
        this.opcionesMenu.push({name:menu.modulo,route:menu.ruta,icon:menu.icono})
      }
      

    });
  }

}
