import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.validarSesion();
  }

  validarSesion(){
    if(sessionStorage.getItem('email')==null){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes iniciar sesión.'
      });

      window.location.href=environment.urlFront+"/login.component";
    }
  }

}
