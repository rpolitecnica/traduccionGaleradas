import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Correos } from '../models/correos.model'
import { CorreosService } from '../correos/correos.service';
import swal from 'sweetalert2';
import { UtilService } from '../util/util.service';
import { Router } from '@angular/router';
import { Menu } from '../models/menu.model';
import { UtilComponent } from '../util/util.component';
declare var $: any;

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.css']
})
export class CorreosComponent implements OnInit {

  correos: Array<Correos>;
  formCorreo: FormGroup;
  public correoEditar: Correos;
  banderaEditar: boolean = false;

  menues:Array<Menu>;
  validacionComponente:boolean=false;
  constructor(private service: CorreosService,
    private fb: FormBuilder,   private router: Router ,
    private utilService:UtilService,
    private utilComponent:UtilComponent) { }

    
  ngOnInit(): void {
    this.utilComponent.validarSesion();
    this.obtenerCorreos();
    this.validarModulos();
    this.formCorreo = this.fb.group({
      'id': [null],
      'asunto': [null],
      'mensaje': [null],
      'fecha': [null],
    });
  }


  obtenerCorreos() {
    this.service.obtenerCorreos().subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.correos = data;

    });
  }


  editarCorreo(id: string) {
    this.banderaEditar = true;
    console.log("editar" + id)

    this.correoEditar = this.correos.find(correo => correo.id === id);
    this.formCorreo.patchValue({
      'id': this.correoEditar.id,
      'asunto': this.correoEditar.asunto,
      'mensaje': this.correoEditar.mensaje,
      'fecha': this.correoEditar.fecha,

    });

    $('#exampleModal').modal('show');
    console.log(this.correoEditar);

  }


  validarModulos(){
    this.utilService.obtenerOpciones(sessionStorage.getItem('idPerfil')).subscribe((data: any) => {
      console.log("response usuarios" + data);
      this.menues=data;
      for (let menu of this.menues) {
       if(this.router.url.replace("/","")==menu.componente){
         this.validacionComponente=true;
       }
      }
      if(!this.validacionComponente){
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes permiso a este módulo'
        });
        this.router.navigate(['bienvenida']);
      }
    });
  }
  validarCampos() {
    if (this.formCorreo.status == "INVALID") {

      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos'
      });

      stop();
    }
  }

  guardarCorreo() {
    if (this.formCorreo.status == "VALID") {
      this.ocultarmodal();
      this.service.guardarCorreo(this.formCorreo.value).subscribe((response) => {
        console.log("respuyesta " + response)
        swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Registro almacenado correctamente'
        });
        this.obtenerCorreos();

      })
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos'
      });
    }

  }

  eliminarCorreo(id: string) {
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
        this.service.eliminarCorreo(id).subscribe((response) => {
          this.obtenerCorreos();
          swal.fire(
            'Eliminado!',
            'Registro eliminado correctamente.',
            'success'
          )
        });

      }
    })
  }

  guardarEditarCorreo() {
    if (this.formCorreo.status == "VALID") {
      if (this.banderaEditar == true) {
        console.log("id editar" + this.formCorreo.controls['id'].value);
        console.log(this.formCorreo.value);
        this.ocultarmodal();
        this.service.editarCorreo(this.formCorreo.controls['id'].value, this.formCorreo.value).subscribe((response) => {
          console.log(response);
  
          this.borrarCampos();
          swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Registro editado correctamente'
          });
  
          this.obtenerCorreos();
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


  borrarCampos() {
    this.formCorreo.controls['id'].patchValue('');
    this.formCorreo.controls['asunto'].patchValue('');
    this.formCorreo.controls['mensaje'].patchValue('');
    this.formCorreo.controls['fecha'].patchValue('');
    this.banderaEditar = false;
  }


  ocultarmodal() {
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

  }

}
