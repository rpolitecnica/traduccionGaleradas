import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Correos} from '../models/correos.model'
import { CorreosService } from '../correos/correos.service';
import swal from 'sweetalert2';
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
  constructor( private service:CorreosService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.obtenerCorreos();
    this.formCorreo = this.fb.group({
      'id': [null],
      'asunto': [null],
      'mensaje': [null],
      'fecha': [null],
    });
  }


  obtenerCorreos(){
    this.service.obtenerCorreos().subscribe((data:any)=>{
      console.log("response usuarios"+data);
     this.correos=data;
     
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

  guardarCorreo(){
    this.ocultarmodal();
    this.service.guardarCorreo(this.formCorreo.value).subscribe((response)=>{
      console.log("respuyesta " + response)
      swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Usuario almacenado correctamente'
      });
      this.obtenerCorreos();

    })
  }

  eliminarCorreo(id: string) {
    console.log("eliminar "+id);
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
    if (this.banderaEditar == true) {
      console.log("id editar" + this.formCorreo.controls['id'].value);
      console.log(this.formCorreo.value);
      this.ocultarmodal();
      this.service.editarCorreo(this.formCorreo.controls['id'].value, this.formCorreo.value).subscribe((response) => {
        console.log(response);
        swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Usuario editada correctamente'
        });

        this.obtenerCorreos();
      })

    }
  }

  ocultarmodal(){
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

}
