import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../usuarios/usuarios.service'
import{Usuarios} from '../models/usuarios.model'
import{Perfil} from '../models/perfil.model'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import {UtilService} from '../util/util.service';
import { Menu } from '../models/menu.model';
import {UtilComponent} from '../util/util.component'


declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {

  usuarios: Array<Usuarios>;
  perfiles: Array<Perfil>;
  formUsuario: FormGroup;
  public usuarioEditar: Usuarios;
  banderaEditar: boolean = false;
  idPerfil:string;
  validacionCorreo:boolean;
  correoOriginal:string;

  menues:Array<Menu>;
  validacionComponente:boolean=false;
  constructor(
    private service:UsuariosService,
    private fb: FormBuilder,
    private router: Router ,
    private utilService:UtilService,
    private utilComponent:UtilComponent
  ) { }

  ngOnInit(): void {
    this.utilComponent.validarSesion();
    this.obtenerUsuarios();
    this.obtenerPerfiles();
    this.validarModulos();
    this.formUsuario = this.fb.group({
      'id': [null],
      'nombres': [null],
      'primerApellido': [null],
      'segundoApellido': [null],
      'correoElectronico':new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'idPerfil': [null],
    });






   
  }

  get getCorreoElectronico(){
    return this.formUsuario.get('correoElectronico')
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

  obtenerUsuarios(){
    this.service.obtenerUsuarios().subscribe((data:any)=>{
      console.log("response usuarios"+data);
     this.usuarios=data;
     
    });
  }


  obtenerPerfiles(){
    this.service.obtenerPerfiles().subscribe((data:any)=>{
      console.log("response usuarios"+data);
     this.perfiles=data;
     
    });
  }


  ocultarmodal(){
    $('#exampleModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  editarUsuario(id: string,idPerfil:string,correoElectronico:string) {
    this.banderaEditar = true;
    console.log("editar" + id)
    this.idPerfil=idPerfil;
    this.correoOriginal=correoElectronico;

    this.usuarioEditar = this.usuarios.find(usuario => usuario.id === id);
    this.formUsuario.patchValue({
      'id': this.usuarioEditar.id,
      'nombres': this.usuarioEditar.nombres,
      'correoElectronico': this.usuarioEditar.correoElectronico,
      'idPerfil': this.usuarioEditar.idPerfil
    });

    $('#exampleModal').modal('show');
    console.log(this.usuarioEditar);

  }


  borrarCampos(){
    this.formUsuario.controls['id'].patchValue('');
    this.formUsuario.controls['nombres'].patchValue('');
    this.formUsuario.controls['correoElectronico'].patchValue('');
    this.formUsuario.controls['idPerfil'].patchValue('');
    
    this.banderaEditar=false;
  }
  guardarUsuario(){
    this.validarCorreoUsuario(this.formUsuario.controls['correoElectronico'].value).subscribe((response)=>{
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo ya se encuentra registrado'
      });
    }, err => {
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
    });
  
    
 

    
  
    
  }



  validarCorreoUsuario(correoElectronico:string){
    return this.service.obtenerUsuarioPorCorreo(correoElectronico);
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
    if(this.correoOriginal==this.formUsuario.controls['correoElectronico'].value){
      this.realizarEdicionUsuario();
    }else{
      this.validarCorreoUsuario(this.formUsuario.controls['correoElectronico'].value).subscribe((response)=>{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo ya se encuentra registrado'
        });
      }, err => {
        this.realizarEdicionUsuario();
      })
    }


  
  }

  realizarEdicionUsuario(){
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
