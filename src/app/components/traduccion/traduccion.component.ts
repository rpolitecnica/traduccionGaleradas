import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ediciones } from '../models/ediciones.model';
import { BodyDocumento, ContenidoCuerpo, Documento } from '../models/documento.model';
import { TraduccionService } from '../traduccion/traduccion.service'

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


  objetoDocumento: Array<Documento>;


  JsonDocumento: any = null;;
  bodyDocumento = new Array();
  bodyDocumentoCompleto = new Array();
  pruebaDocumento: Documento;
  contenidoCuerpo = <ContenidoCuerpo>{};
  jsonFinalCuerpo:any;


  constructor(
    private fb: FormBuilder, private traduccionService: TraduccionService
  ) { }

  ngOnInit(): void {

    this.formTraduccion = this.fb.group({
      'id': [null],
      'idEdicion': [null],
      'archivo': [null],
    });

    this.obtenerEdiciones();

  }

  onUpload() {
    console.log("uploand");
    /*let formData= new FormData();
    for(let i=0;i<this.uploadedFiles.length;i++){
      formData.append("uploads[]",this.uploadedFiles[i],this.uploadedFiles[i].name);
    }
    this.traduccionService.uploadFile(formData).subscribe((res)=>{
      console.log("response ",res);
    })*/

    /*this.traduccionService.traducirFile().subscribe((res)=>{
      console.log("response ",res);
    })*/
    this.crearJson();
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.documento = fileReader.result;
      //console.log(fileReader.result);
      this.documento = new DOMParser().parseFromString(this.documento, 'text/html');
      //console.log(this.documento.getElementsByClassName("TituloArticulo"));
      let arrayCuerpos = new Array();
      let bodyCuerpo = { titulo: '', ContenidoCuerpo: arrayCuerpos };

      for (var j = 3; j <= 12; j++) {
        var palabra = this.documento.getElementsByClassName("WordSection" + j);

        let arrayContenidos = new Array();
        let contentBody = { SubtituloSeccion: 's', ContenidoSeccion: arrayContenidos };


        for (var i = 0; i < palabra[0].childNodes.length; i++) {

          let textoPalabra = palabra[0].childNodes[i].innerText;

          if (palabra[0].childNodes[i].className == "TituloSeccion" ||palabra[0].childNodes[i].className =="TituloConclusiones") {
            if (textoPalabra.trim() != "") {
              if(arrayCuerpos.length!=0){
                bodyCuerpo.ContenidoCuerpo=arrayCuerpos;
                let bodyCuerpoTemporal = { titulo: bodyCuerpo.titulo, ContenidoCuerpo: bodyCuerpo.ContenidoCuerpo };
                this.bodyDocumentoCompleto.push(bodyCuerpoTemporal);
                this.jsonFinalCuerpo=JSON.stringify(this.bodyDocumentoCompleto);
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
              if(arrayCuerpos.length==0){
                arrayCuerpos.push(contentBody);
              }
              if(contentBody.SubtituloSeccion!=arrayCuerpos[arrayCuerpos.length-1].SubtituloSeccion){
                arrayCuerpos.push(contentBody);
              }
              
            }
          }



          






        }



      }

      let documentss = this.documento;
      let jsonGalleys = this.JsonGalerada;
      /*Object.keys(this.JsonGalerada).forEach(function (key) {
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

      })*/
      console.log(jsonGalleys);
      this.JsonGalerada = jsonGalleys;
      this.jsonPrueba = JSON.stringify(jsonGalleys);
    }
    fileReader.readAsText(this.file);
  }
  onFileChange(e) {
    console.log('FileChange', e);
    this.uploadedFiles = e.target.files;
    this.file = e.target.files[0];
  }


  obtenerEdiciones() {
    this.traduccionService.obtenerEdiciones().subscribe((data: any) => {
      console.log("listado " + data[0].titulo);
      this.ediciones = data;
    });
  }

  crearJson() {
    this.JsonGalerada = {
      'TituloArticulo': 'ss',
      'Autores': '',
      'InformacionAutores': [],
      'ResumenTitulo': '',
      'ResumenCuerpo': '',
      'PalabrasClavesTituloCar': '',
      'FechasEsp': '',
      'TituloArticuloIngles': '',
      'TituloAbstract': '',
      'Abstract': '',
      'TituloKeywordsCar': '',
      'TItuloIntroduccin': '',
      'ContenidoIntroduccin': '',
      'TituloSeccion': '',
      'SubtituloSeccion': '',
      'ContenidoSeccion': ''
    }

    this.JsonDocumento = {
      'TituloSeccion': '',
      'ContenidoCuerpo': [],
    }




  }

}
