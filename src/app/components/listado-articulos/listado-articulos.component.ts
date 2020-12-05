import { Component, OnInit } from '@angular/core';
import { ListadoArticulosService } from '../listado-articulos/listado-articulos.service';
import { Traducciones } from '../models/traducciones.model';
import { UtilComponent } from '../util/util.component';
import swal from 'sweetalert2';
import { Ediciones } from '../models/ediciones.model';
import { TraduccionService } from '../traduccion/traduccion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {saveAs as importedSaveAs} from "file-saver";

declare var $: any;
@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.css']
})
export class ListadoArticulosComponent implements OnInit {

  traducciones: Array<Traducciones>;
  formTraduccion: FormGroup;
  idTraduccion: string;
  idEdicion: string;
  edicionSeleccionada: Ediciones;
  ediciones: Array<Ediciones>;
  volumen:string;
  numero:string;
  periodo:string;
  constructor(private listadoArticulosService: ListadoArticulosService,
    private utilComponent: UtilComponent,private traduccionService: TraduccionService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.utilComponent.validarSesion();
    this.obtenerTraduccionesPorIdEdicionAnio();
    this.obtenerEdiciones();
    this.obtenerTextos();
    this.formTraduccion = this.fb.group({
      'id': [null],
      'idEdicion': [null],
      'titulo': [null],
    });
    this.idEdicion=sessionStorage.getItem('idEdicion');
  }

  ocultarmodal() {
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  obtenerTextos(){
    this.volumen=sessionStorage.getItem('volumen');
    this.numero=sessionStorage.getItem('numero');
    this.periodo=sessionStorage.getItem('periodo');
  }

  obtenerEdiciones() {
    this.traduccionService.obtenerEdicionesPorUsuario(sessionStorage.getItem('idUsuario')).subscribe((data: any) => {
      console.log("listado " + data[0].titulo);
      this.ediciones = data;
    });
  }
  visualizarDocumento(xmlDocumento: any) {
    const blob = new Blob([xmlDocumento], { type: 'text/xml' });
    importedSaveAs(blob, "documento.xml");
    /*const url = window.URL.createObjectURL(blob);
    window.open(url);*/
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
        this.listadoArticulosService.eliminarTraduccion(id).subscribe((response) => {
          
          //location.reload();
          swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Registro eliminado correctamente'
          }).then(function() {
            location.reload();
            //this.obtenerTraduccionesPorIdEdicionAnio();
        });
         
        });
        

      }
    })

  }
  guardarEdicionTraduccion() {
    console.log(this.edicionSeleccionada);
    this.ocultarmodal();
    this.listadoArticulosService.modificarTraduccion(this.idTraduccion, this.edicionSeleccionada).subscribe((response) => {
      console.log(response);
      swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Registro editado correctamente'
      });

      this.obtenerTraduccionesPorIdEdicionAnio();
    })
  }
  editarTraduccion(idTraduccion: string, idEdicion: string) {
    this.idTraduccion = idTraduccion;
    this.idEdicion = idEdicion;
    $('#exampleModal').modal('show');

  }
  obtenerTraduccionesPorIdEdicionAnio() {
    this.listadoArticulosService.obtenerTraduccionesPoridAnio(sessionStorage.getItem('idEdicion'),sessionStorage.getItem('fechaPublicacion')).subscribe((data: any) => {
      console.log("listadoTraducciones " + data[0].titulo);
      this.traducciones = data;
    }, err => {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay artículos traducidos para la edición seleccionada'
      });
    })
  }

}
