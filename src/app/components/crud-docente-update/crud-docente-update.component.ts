import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-docente-update',
  templateUrl: './crud-docente-update.component.html',
  styleUrls: ['./crud-docente-update.component.css']
})
export class CrudDocenteUpdateComponent {

  //Para el ubigeo
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  //declaracion de las validaciones
    formsActualiza = this.formBuilder.group({ 
      validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] , 
      validaDNI: ['', [Validators.required, Validators.pattern('[0-9]{8}')] ] , 
      validaDepartamento: ['', Validators.min(1)] , 
      validaProvincia: ['', Validators.min(1)] , 
      validaDistrito: ['', Validators.min(1)] , 
  });

    //Json para registrar o actualizar
    docente: Docente = { 
        idDocente:0,
        nombre:"",
        dni:"",
        estado:1,
        ubigeo:{
          idUbigeo: -1,
          departamento:"-1",
          provincia:"-1",
          distrito:"-1",
      }
    };

    constructor( 
                  private formBuilder: FormBuilder,
                  private ubigeoService : UbigeoService,
                  private docenteService: DocenteService,
                  @Inject(MAT_DIALOG_DATA) public data: any
              ){
                this.docente = data;
                console.log(">>> idDocente >> " + this.docente.idDocente);
                console.log(">>> nombre >>  " + this.docente.nombre);
                console.log(">>> dni >>  " + this.docente.dni);
                console.log(">>> estado >>  " + this.docente.estado);
                console.log(">>> idUbigeo >>  " + this.docente.ubigeo?.idUbigeo);
                console.log(">>> departamento >>  " + this.docente.ubigeo?.departamento);
                console.log(">>> provincia >>  " + this.docente.ubigeo?.provincia);
                console.log(">>> distrito >>  " + this.docente.ubigeo?.distrito);
                             
               
                this.ubigeoService.listarDepartamento().subscribe(
                  x => this.departamentos = x
                );
                this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
                  response =>  this.provincias= response
                );
                this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
                  response =>  this.distritos= response
                );   


    }

   cargaProvincia(){
            console.log(">>> departamento >>> "  + this.docente.ubigeo?.departamento);

            this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
                x => this.provincias = x
            );

            this.distritos = [];
            this.docente.ubigeo!.idUbigeo = -1;
            this.docente.ubigeo!.provincia = "-1";
  }

   cargaDistrito(){
          console.log(">>> departamento >>> "  + this.docente.ubigeo?.departamento);
          console.log(">>> provincia >>> "  + this.docente.ubigeo?.provincia);

          this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
              x => this.distritos = x
          );

          this.docente.ubigeo!.idUbigeo = -1;

   }

   actualiza(){
          //Descomentar Para la PC2
          //this.docente.usuarioActualiza = this.objUsuario;

          this.docenteService.actualiza(this.docente).subscribe(
              x =>  Swal.fire('Mensaje', x.mensaje, 'info')
          );
   }
}
