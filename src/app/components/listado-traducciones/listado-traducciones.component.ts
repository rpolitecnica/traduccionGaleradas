import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListadoTraduccionesService } from '../listado-traducciones/listado-traducciones.service';
import { TraduccionService } from '../traduccion/traduccion.service'
import { Traducciones } from '../models/traducciones.model';
import swal from 'sweetalert2';
import { Ediciones } from '../models/ediciones.model';
import { UtilComponent } from '../util/util.component';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-listado-traducciones',
  templateUrl: './listado-traducciones.component.html',
  styleUrls: ['./listado-traducciones.component.css']
})
export class ListadoTraduccionesComponent implements OnInit {
  JsonEdiciones: any = null;;
  formTraduccion: FormGroup;
  traducciones: Array<Traducciones>;
  ediciones: Array<Ediciones>;
  edicionesAnio: Array<Ediciones>;
  edicionSeleccionada: Ediciones;
  idTraduccion: string;
  idEdicion: string;
  arrayEdicionesRecorrer:any;
  constructor(private fb: FormBuilder,
    private listadoTraducciones: ListadoTraduccionesService,
    private traduccionService: TraduccionService,
    private utilComponent: UtilComponent,
    private router: Router,) { }

  ngOnInit(): void {
    this.utilComponent.validarSesion();
    this.formTraduccion = this.fb.group({
      'id': [null],
      'idEdicion': [null],
      'titulo': [null],
    });
    this.obtenerTraduccionesPorUsuarioAnio();
    this.obtenerEdiciones();
  }
  obtenerTraduccionesPorUsuarioAnio() {
   
    this.listadoTraducciones.obtenerTraduccionesPorUsuarioAnio(sessionStorage.getItem('idUsuario')).subscribe((data: any) => {

      this.traducciones = data;
     
      var arrayEdicionesCompleto=[]
      
      for(let traduccion of data){
       
        console.log("fechaPublicacion " + traduccion.fechaPublicacion);
       
        this.listadoTraducciones.obtenerTraduccionesPorUsuarioAnioIdEdicion(sessionStorage.getItem('idUsuario')+"-"+traduccion.fechaPublicacion).subscribe((data2: any) => {
          var JsonEdicionesCompleto={anio:"",ediciones:[]};
          JsonEdicionesCompleto.anio=traduccion.fechaPublicacion;
          console.log("data 2");
          console.log(data2);
          //this.edicionesAnio = data2;
          JsonEdicionesCompleto.ediciones=data2;
          console.log("JsonEdicionesCompleto");
          console.log(JsonEdicionesCompleto);
          arrayEdicionesCompleto.push(JsonEdicionesCompleto);
          console.log("arrayEdicionesCompleto");
          console.log(arrayEdicionesCompleto);
          
        });
        this.arrayEdicionesRecorrer=arrayEdicionesCompleto;
      console.log("ediciones Recorrer");
        console.log(this.arrayEdicionesRecorrer);
      }
     
     
      
    });

    
  }


  obtenerTraducciones() {
    this.listadoTraducciones.obtenerTraduccionesPorUsuario(sessionStorage.getItem('idUsuario')).subscribe((data: any) => {
      console.log("listadoTraducciones " + data[0].titulo);
      this.traducciones = data;
    });
  }

  verTraducciones(idEdicion:string,fechaPublicacion:string,volumen:string,numero:string,periodo:string){
    console.log("ver traducciones");
    sessionStorage.setItem('idEdicion', idEdicion);
    sessionStorage.setItem('fechaPublicacion', fechaPublicacion);
    sessionStorage.setItem('volumen', volumen);
    sessionStorage.setItem('numero', numero);
    sessionStorage.setItem('periodo', periodo);
    this.router.navigate(['listado-articulos']);
  }
  obtenerEdiciones() {
    this.traduccionService.obtenerEdicionesPorUsuario(sessionStorage.getItem('idUsuario')).subscribe((data: any) => {
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

  borrarCampos() {

  }

  obtenerMes(mes: string) {
    switch (mes) {
      case "January":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
        return "Enero";
      case "February":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        return "Febrero";
      case "March":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Marzo";
      case "April":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Abril";
      case "May":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Mayo";
      case "June":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Junio";
      case "July":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Julio";
      case "August":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Agosto";
      case "September":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Septiembre";
      case "October":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Octubre";
        case "November":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Noviembre";
        case "December":
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        return "Diciembre";
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        return ""
    }
  }
  guardarEdicionTraduccion() {
    console.log(this.edicionSeleccionada);
    this.ocultarmodal();
    this.listadoTraducciones.modificarTraduccion(this.idTraduccion, this.edicionSeleccionada).subscribe((response) => {
      console.log(response);
      swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Registro editado correctamente'
      });

      this.obtenerTraducciones();
    })
  }

  editarTraduccion(idTraduccion: string, idEdicion: string) {
    this.idTraduccion = idTraduccion;
    this.idEdicion = idEdicion;
    $('#exampleModal').modal('show');

  }

  ocultarmodal() {
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
        this.listadoTraducciones.eliminarTraduccion(id).subscribe((response) => {
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
