import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListadoTraduccionesService } from '../listado-traducciones/listado-traducciones.service';
import { TraduccionService } from '../traduccion/traduccion.service'
import { Traducciones } from '../models/traducciones.model';
import swal from 'sweetalert2';
import { Ediciones } from '../models/ediciones.model';
declare var $: any;
@Component({
  selector: 'app-listado-traducciones',
  templateUrl: './listado-traducciones.component.html',
  styleUrls: ['./listado-traducciones.component.css']
})
export class ListadoTraduccionesComponent implements OnInit {

  formTraduccion: FormGroup;
  traducciones: Array<Traducciones>;
  ediciones: Array<Ediciones>;
  edicionSeleccionada:Ediciones;
  idTraduccion:string;
  idEdicion:string;
  constructor(private fb: FormBuilder, private listadoTraducciones: ListadoTraduccionesService,private traduccionService: TraduccionService,) { }

  ngOnInit(): void {

    this.formTraduccion = this.fb.group({
      'id': [null],
      'idEdicion': [null],
      'titulo': [null],
    });
    this.obtenerTraducciones();
    this.obtenerEdiciones();
  }


  obtenerTraducciones() {
    this.listadoTraducciones.obtenerTraducciones().subscribe((data: any) => {
      console.log("listadoTraducciones " + data[0].titulo);
      this.traducciones = data;
    });
  }
  obtenerEdiciones() {
    this.traduccionService.obtenerEdiciones().subscribe((data: any) => {
      console.log("listado " + data[0].titulo);
      this.ediciones = data;
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

  borrarCampos(){

  }
  guardarEdicionTraduccion(){
    console.log(this.edicionSeleccionada);
    this.ocultarmodal();
    this.listadoTraducciones.modificarTraduccion(this.idTraduccion,this.edicionSeleccionada).subscribe((response) => {
      console.log(response);
      swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Registro editado correctamente'
      });

      this.obtenerTraducciones();
    })
  }

  editarTraduccion(idTraduccion:string,idEdicion:string){
    this.idTraduccion=idTraduccion;
    this.idEdicion=idEdicion;
    $('#exampleModal').modal('show');

  }

  ocultarmodal(){
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
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
