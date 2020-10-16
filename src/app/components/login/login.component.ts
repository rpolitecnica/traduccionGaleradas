import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../login/login.service'
import { ConstantPool } from '@angular/compiler';
import swal from'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public configObservable = new Subject<boolean>();
  constructor(
    private router: Router,
    private service:LoginService,
    private zone: NgZone
    ) {   
      this.configObservable.subscribe(value => {
        if(value==true){
          console.log("trueee");
          this.goMenu();
        }
      })
  }

  titularAlerta:string="prueba";
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  auth2: any;

  ngOnInit(){
  
    this.googleSDK();
    
  }

  prepareLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        
  
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        this.service.validarUsuarios(profile.getEmail()).subscribe(response=>{
          console.log("response");
          console.log(response);
          this.configObservable.next(true);

          this.zone.run(() => {
            this.router.navigate(['menu']);
        });
        
          }, err => {
            console.log("error")
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario no registrado'
            })
          });
        //YOUR CODE HERE
        
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
        alert(JSON.stringify(error, undefined, 2));
      });

      
  
  }
  googleSDK() {

    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '623902582836-8eia31gv72a0nhtahc33ib999nlhdb32.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
  
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  
  }

  goMenu(){
    console.log("go menu")
    this.router.navigate(['menu']);
  }

}
