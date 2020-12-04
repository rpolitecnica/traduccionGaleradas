import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EdicionesService } from 'src/app/components/ediciones/ediciones.service'
import { Ediciones } from 'src/app/components/models/ediciones.model'
import { Periodos } from 'src/app/components/models/periodos.model'
import swal from 'sweetalert2';
import { UtilComponent } from '../util/util.component';

declare var $: any;
@Component({
  selector: 'app-ediciones',
  templateUrl: './ediciones.component.html',
  styleUrls: ['./ediciones.component.css']
})
export class EdicionesComponent implements OnInit {

  title = 'appBootstrap';
  ediciones: Array<Ediciones>;
  periodos: Array<Periodos>;
  public edicionEditar: Ediciones;
  banderaEditar: boolean = false;

  closeResult: string;
  formEdicion: FormGroup;
  idPeriodo:string;

  constructor(
    private modalService: NgbModal,
    private edicionesService: EdicionesService,
    private fb: FormBuilder,
    private utilComponent:UtilComponent) {

  }

  ngOnInit() {
    this.utilComponent.validarSesion();
    this.formEdicion = this.fb.group({
      'id': [null],
      'idUsuario':sessionStorage.getItem('idUsuario'),
      'titulo': [null],
      'volumen': [null],
      'numero': [null],
      'idPeriodo': [null],
      'fechaPublicacion': [null]
    });
    

    this.obtenerEdiciones();
    this.obtenerPeriodos();


  }

  openModal() {
    console.log("open")
    $('#exampleModal').modal('show');
  }
  open(content) {
    console.log("open my")
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log("open")
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  obtenerEdiciones() {
    this.edicionesService.obtenerEdicionesPorUsuario(sessionStorage.getItem('idUsuario')).subscribe((data: any) => {
     // console.log("listado " + data[0].titulo);
      this.ediciones = data;
    });
  }

  obtenerPeriodos() {
    this.edicionesService.obtenerPeriodos().subscribe((data: any) => {
      console.log("listado " + data[0].descripcion);
      this.periodos = data;
    });
  }


  eliminarEdicion(id: string) {
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
        this.edicionesService.eliminarEdicion(id).subscribe((response) => {
          this.obtenerEdiciones();
          swal.fire(
            'Eliminado!',
            'Registro eliminado correctamente.',
            'success'
          )
        });

      }
    })
  }

  guardarEditarEdicion() {
    if (this.formEdicion.status == "VALID") {
      if (this.banderaEditar == true) {
        console.log("id editar" + this.formEdicion.controls['id'].value);
        console.log(this.formEdicion.value);
        this.ocultarmodal();
        this.edicionesService.editarEdicion(this.formEdicion.controls['id'].value, this.formEdicion.value).subscribe((response) => {
          console.log(response);
          swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Registro editado correctamente'
          });
  
          this.obtenerEdiciones();
        })
  
      }
    }else{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos'
      });
    }
 
  }


  editarEdicion(id: string,idPeriodo:string) {
    this.banderaEditar = true;
    console.log("editar" + id)
    this.idPeriodo=idPeriodo;
  
    this.edicionEditar = this.ediciones.find(edicion => edicion.idEdicion === id);
    this.formEdicion.patchValue({
      'id': this.edicionEditar.idEdicion,
      'titulo': this.edicionEditar.titulo,
      'volumen': this.edicionEditar.numero,
      'numero': this.edicionEditar.volumen,
      'idPeriodo': this.edicionEditar.idPeriodo,
      'fechaPublicacion': this.edicionEditar.fechaPublicacion
    });
    $('#exampleModal').modal('show');
    console.log(this.edicionEditar);

  }

  ocultarmodal(){
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
  


  borrarCampos(){
    this.formEdicion.controls['id'].patchValue('');
    this.formEdicion.controls['titulo'].patchValue('');
    this.formEdicion.controls['volumen'].patchValue('');
    this.formEdicion.controls['numero'].patchValue('');
    this.formEdicion.controls['idPeriodo'].patchValue('');
    this.formEdicion.controls['fechaPublicacion'].patchValue('');
    this.banderaEditar=false;
  }

  guardarEdicion() {

    if (this.formEdicion.status == "VALID") {

      this.ocultarmodal();
      console.log(this.formEdicion.value);
      this.edicionesService.guardarEdicion(this.formEdicion.value).subscribe((response) => {
        console.log("respuyesta " + response)
        this.borrarCampos();
        swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Registro almacenado correctamente'
        });
  
        this.obtenerEdiciones();
  
  
      });
    }else{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos'
      });
    }


  }

}
