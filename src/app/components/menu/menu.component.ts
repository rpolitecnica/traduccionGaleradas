import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

recargaBandera:boolean=false;
  constructor() { 
   
  }

  opcionesMenu=[
    {name:"Inicio",route:"/bienvenida",icon:"fa fa-home"},
    {name:"Usuarios",route:"/usuarios",icon:"fa fa-user"},
    {name:"Traducción Galeradas",route:"/traduccion",icon:"fa fa-book"},
    {name:"Listado Traducciones",route:"/listado-traducciones",icon:"fa fa-history"},
    {name:"Ediciones",route:"/ediciones",icon:"fa fa-list"},
    {name:"Correos",route:"/correos",icon:"fa fa-envelope"},
    {name:"Cerrar Sesión",route:"/login.component",icon:"fa fa-sign-out"},
  ]
  ngOnInit(): void {
    
  }



}
