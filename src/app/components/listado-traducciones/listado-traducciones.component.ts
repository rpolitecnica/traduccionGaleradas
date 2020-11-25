import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListadoTraduccionesService } from '../listado-traducciones/listado-traducciones.service';

import { Traducciones } from '../models/traducciones.model';
import swal from 'sweetalert2';
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
  

  visualizarDocumentoHTML(xmlDocumento: any) {
    const blob = new Blob([xmlDocumento], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  visualizarDocumento(xmlDocumento: any) {
    const blob = new Blob([xmlDocumento], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  eliminarTraduccion(id: string) {

    console.log("eliminar " + id);
    swal.fire({
      title: 'Estás Seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listadoTraducciones.eliminarTraduccion(id).subscribe((response) =>  {
          this.obtenerTraducciones();
          swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Registro eliminado correctamente'
          });
        });

      }
    })

  }

}
