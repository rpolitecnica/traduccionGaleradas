import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import{TraduccionService} from '../traduccion/traduccion.service'

@Component({
  selector: 'app-traduccion',
  templateUrl: './traduccion.component.html',
  styleUrls: ['./traduccion.component.css']
})
export class TraduccionComponent implements OnInit {


  formTraduccion: FormGroup;
  uploadedFiles: Array<File>;
  file:any;
  constructor(
    private fb: FormBuilder,private traduccionService:TraduccionService
  ) { }

  ngOnInit(): void {

    this.formTraduccion = this.fb.group({
      'id': [null],
      'idEdicion': [null],
      'archivo': [null],
    });
  }

  onUpload(){
    console.log("uploand");
    /*let formData= new FormData();
    for(let i=0;i<this.uploadedFiles.length;i++){
      formData.append("uploads[]",this.uploadedFiles[i],this.uploadedFiles[i].name);
    }
    this.traduccionService.uploadFile(formData).subscribe((res)=>{
      console.log("response ",res);
    })*/
    let fileReader= new FileReader();
    fileReader.onload=(e)=>{
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
  }
  onFileChange(e){
    console.log('FileChange',e);
    this.uploadedFiles=e.target.files;
    this.file=e.target.files[0];
  }



}
