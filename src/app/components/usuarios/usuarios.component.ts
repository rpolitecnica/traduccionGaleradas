import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../usuarios/usuarios.service'
import{Usuarios} from '../models/usuarios.model'
import { FormBuilder, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {

  usuarios: Array<Usuarios>;
  formUsuario: FormGroup;
  public usuarioEditar: Usuarios;
  banderaEditar: boolean = false;
  constructor(
    private service:UsuariosService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.formUsuario = this.fb.group({
      'id': [null],
      'nombres': [null],
      'primerApellido': [null],
      'segundoApellido': [null],
      'correoElectronico': [null],
    });
  }

  obtenerUsuarios(){
    this.service.obtenerUsuarios().subscribe((data:any)=>{
      console.log("response usuarios"+data);
     this.usuarios=data;
     
    });
  }


  ocultarmodal(){
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  editarUsuario(id: string) {
    this.banderaEditar = true;
    console.log("editar" + id)

    this.usuarioEditar = this.usuarios.find(usuario => usuario.id === id);
    this.formUsuario.patchValue({
      'id': this.usuarioEditar.id,
      'nombres': this.usuarioEditar.nombres,
      'primerApellido': this.usuarioEditar.primerApellido,
      'segundoApellido': this.usuarioEditar.segundoApellido,
      'correoElectronico': this.usuarioEditar.correoElectronico
    });

    $('#exampleModal').modal('show');
    console.log(this.usuarioEditar);

  }


  borrarCampos(){
    this.formUsuario.controls['id'].patchValue('');
    this.formUsuario.controls['nombres'].patchValue('');
    this.formUsuario.controls['primerApellido'].patchValue('');
    this.formUsuario.controls['segundoApellido'].patchValue('');
    this.formUsuario.controls['correoElectronico'].patchValue('');
    
    this.banderaEditar=false;
  }
  guardarUsuario(){
    if (this.formUsuario.status == "VALID") {
      this.ocultarmodal();
      this.service.guardarUsuario(this.formUsuario.value).subscribe((response)=>{
        console.log("respuyesta " + response)
  
        this.borrarCampos();
        swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Registro almacenado correctamente'
        });
        this.obtenerUsuarios();
  
      })
    }else{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos'
      });
    }
    
  }



 
  eliminarUsuario(id: string) {
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
        this.service.eliminarUsuario(id).subscribe((response) => {
          this.obtenerUsuarios();
          swal.fire(
            'Eliminado!',
            'Registro eliminado correctamente.',
            'success'
          )
        });

      }
    })
  }

  guardarEditarUsuario() {
    if (this.formUsuario.status == "VALID") {
      if (this.banderaEditar == true) {
        console.log("id editar" + this.formUsuario.controls['id'].value);
        console.log(this.formUsuario.value);
        this.ocultarmodal();
        this.service.editarUsuario(this.formUsuario.controls['id'].value, this.formUsuario.value).subscribe((response) => {
          console.log(response);
          swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Registro editado correctamente'
          });
  
          this.obtenerUsuarios();
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
  

  

}
