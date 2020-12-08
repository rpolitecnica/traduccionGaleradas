import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ediciones } from '../models/ediciones.model';
import { BodyDocumento, ContenidoCuerpo, Documento } from '../models/documento.model';
import { TraduccionService } from '../traduccion/traduccion.service'

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UtilComponent } from '../util/util.component';

@Component({
  selector: 'app-traduccion',
  templateUrl: './traduccion.component.html',
  styleUrls: ['./traduccion.component.css']
})


export class TraduccionComponent implements OnInit {


  formTraduccion: FormGroup;
  uploadedFiles: Array<File>;
  documento: any;
  file: any;
  doc: any;
  JsonGalerada: any = null;;
  ediciones: Array<Ediciones>;
  jsonPrueba: String;
  edicionSeleccionada: Ediciones;


  objetoDocumento: Array<Documento>;


  JsonDocumento: any = null;;
  bodyDocumento = new Array();
  bodyDocumentoCompleto = new Array();
  pruebaDocumento: Documento;
  contenidoCuerpo = <ContenidoCuerpo>{};
  jsonFinalCuerpo: any;


  constructor(
    private fb: FormBuilder, private traduccionService: TraduccionService, private router: Router,
    private utilComponent: UtilComponent
  ) { }

  ngOnInit(): void {
    this.utilComponent.validarSesion();
    this.formTraduccion = this.fb.group({
      'id': [null],
      'idEdicion': [null],
      'archivo': [null],
    });

    this.obtenerEdiciones();

  }

  onUpload() {
    console.log("uploand");
    if (this.formTraduccion.controls['archivo'].value == null || this.formTraduccion.controls['idEdicion'].value == null) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar todos los campos'
      });
    } else {
      console.log("edicion");
      console.log(this.edicionSeleccionada);

      this.crearJson();
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.documento = fileReader.result;
        var extension = (this.formTraduccion.controls['archivo'].value.substring(this.formTraduccion.controls['archivo'].value.lastIndexOf("."))).toLowerCase();
        if (extension == ".html" || extension == ".htm") {

          this.documento = new DOMParser().parseFromString(this.documento, 'text/html');
          let arrayCuerpos = new Array();
          let bodyCuerpo = { titulo: '', ContenidoCuerpo: arrayCuerpos };
          var limiteSuperior = 0;



          for (var k = 2; k <= 50; k++) {
            var palabra = this.documento.getElementsByClassName("WordSection" + k);

            for (var x = 0; x < palabra[0].childNodes.length; x++) {
              let textoPalabra2 = palabra[0].childNodes[x].innerText;
              if (palabra[0].childNodes[x].className == "TituloConclusiones") {
                limiteSuperior = k;
                k = 50;
                break;
              }
            }
          }
          for (var j = 2; j <= limiteSuperior; j++) {
            var palabra = this.documento.getElementsByClassName("WordSection" + j);

            let arrayContenidos = new Array();
            let contentBody = { SubtituloSeccion: 's', ContenidoSeccion: arrayContenidos };


            for (var i = 0; i < palabra[0].childNodes.length; i++) {

              let textoPalabra = palabra[0].childNodes[i].innerText;

              if (palabra[0].childNodes[i].className == "TituloSeccion" || palabra[0].childNodes[i].className == "TituloConclusiones") {
                if (textoPalabra.trim() != "") {
                  if (arrayCuerpos.length != 0) {
                    bodyCuerpo.ContenidoCuerpo = arrayCuerpos;
                    let bodyCuerpoTemporal = { titulo: bodyCuerpo.titulo, ContenidoCuerpo: bodyCuerpo.ContenidoCuerpo };
                    this.bodyDocumentoCompleto.push(bodyCuerpoTemporal);
                    this.jsonFinalCuerpo = JSON.stringify(this.bodyDocumentoCompleto);
                    this.JsonGalerada['BodyCuerpoCompleto'] = this.bodyDocumentoCompleto;
                  }
                  bodyCuerpo.titulo = palabra[0].childNodes[i].innerText;
                  arrayCuerpos = new Array();

                }
              }


              if (palabra[0].childNodes[i].className == "SubtituloSeccion") {
                if (textoPalabra.trim() != "") {
                  contentBody.SubtituloSeccion = palabra[0].childNodes[i].innerText;
                }
              }

              if (palabra[0].childNodes[i].className == "ContenidoSeccion") {
                if (textoPalabra.trim() != "") {

                  arrayContenidos.push(palabra[0].childNodes[i].innerText);
                  contentBody.ContenidoSeccion = arrayContenidos;
                  if (arrayCuerpos.length == 0) {
                    arrayCuerpos.push(contentBody);
                  }
                  if (contentBody.SubtituloSeccion != arrayCuerpos[arrayCuerpos.length - 1].SubtituloSeccion) {
                    arrayCuerpos.push(contentBody);
                  }

                }
              }


            }
          }

          let documentss = this.documento;
          let jsonGalleys = this.JsonGalerada;
          Object.keys(this.JsonGalerada).forEach(function (key) {
            if (key != 'BodyCuerpoCompleto' && key != 'InformacionEdicion') {
              console.log(key);
              var palabra = documentss.getElementsByClassName(key);

              if (palabra.length > 1) {
                var array = new Array();
                for (var i = 0; i < palabra.length; i++) {
                  if (palabra[i].innerText !== " ") {
                    let texto: String;
                    texto = palabra[i].innerText.trim();
                    if (texto !== "") {
                      array.push(texto);
                    }
                  }
                }
                jsonGalleys[key] = array;
              } else {
                if (palabra[0].innerText !== " ") {
                  var textoPalabra = palabra[0].innerText;
                  jsonGalleys[key] = textoPalabra;
                }
              }

            }

          })
          jsonGalleys['InformacionEdicion'] = this.edicionSeleccionada;
          console.log(jsonGalleys);
          this.JsonGalerada = jsonGalleys;
          this.jsonPrueba = JSON.stringify(jsonGalleys);

          this.traduccionService.traducirFile(this.jsonPrueba).subscribe((res)=>{
            console.log("response ",res);
           
            /*swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: 'Traducción realizada correctamente.'
            });
      
            this.router.navigate(['listado-traducciones']);*/
          }, err => {
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error en la traducción'
            });
          });
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La extensión del archivo debe ser .html o .htm'
          });
        }

      }
      fileReader.readAsText(this.file);
    }


  }
  onFileChange(e) {
    console.log('FileChange', e);
    this.uploadedFiles = e.target.files;
    this.file = e.target.files[0];
  }


  obtenerEdiciones() {
    this.traduccionService.obtenerEdicionesPorUsuario(sessionStorage.getItem('idUsuario')).subscribe((data: any) => {
      console.log("listado " + data[0].titulo);
      this.ediciones = data;
    });
  }

  crearJson() {
    this.JsonGalerada = {
      'DOI': '',
      'TituloArticulo': 'ss',
      'Autores': '',
      'InformacionAutores': [],
      'TituloCorrespondencia': '',
      'ResumenTitulo': '',
      'ResumenCuerpo': '',
      'PalabrasClavesTituloCar': '',
      'PalabrasClavesCar': '',
      'FechasEsp': '',
      'FechaIngles': '',
      'TituloArticuloIngles': '',
      'TituloAbstract': '',
      'Abstract': '',
      'TituloKeywordsCar': '',
      'KeywordsCar': '',
      'TituloIntroduccion': '',
      'ContenidoIntroduccion': '',
      'TituloConclusiones': '',
      'ContenidoConclusiones': '',
      'TituloAgradecimientos': '',
      'ContenidoAgradecimientos': '',
      'TituloReferencias': '',
      'referencias': '',
      'BodyCuerpoCompleto': '',
      'InformacionEdicion': []
    }

    this.JsonDocumento = {
      'TituloSeccion': '',
      'ContenidoCuerpo': [],
    }




  }

}
