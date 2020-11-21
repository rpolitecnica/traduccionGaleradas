import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListadoTraduccionesService } from '../listado-traducciones/listado-traducciones.service';

import { Traducciones } from '../models/traducciones.model';
@Component({
  selector: 'app-listado-traducciones',
  templateUrl: './listado-traducciones.component.html',
  styleUrls: ['./listado-traducciones.component.css']
})
export class ListadoTraduccionesComponent implements OnInit {


  traducciones: Array<Traducciones>;
  constructor(private fb: FormBuilder, private listadoTraducciones: ListadoTraduccionesService) { }

  ngOnInit(): void {
    this.obtenerTraducciones();
  }


  obtenerTraducciones() {
    this.listadoTraducciones.obtenerTraducciones().subscribe((data: any) => {
      console.log("listadoTraducciones " + data[0].titulo);
      this.traducciones = data;
    });
  }

  descargarDocumento(xmlDocumento:any){
    const blob = new Blob([xmlDocumento], { type: 'text/xml' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

}
