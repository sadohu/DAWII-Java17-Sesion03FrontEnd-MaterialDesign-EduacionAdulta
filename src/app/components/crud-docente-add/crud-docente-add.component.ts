import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-docente-add',
  templateUrl: './crud-docente-add.component.html',
  styleUrls: ['./crud-docente-add.component.css']
})
export class CrudDocenteAddComponent {

  //Para el ubigeo
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

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


  constructor( private ubigeoService : UbigeoService,
               private docenteService: DocenteService){
      this.ubigeoService.listarDepartamento().subscribe(
              x => this.departamentos = x
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

  registra(){
      this.docenteService.inserta(this.docente).subscribe(
            x => {
                  Swal.fire('Mensaje', x.mensaje, 'info'); 
                  this.docente = { 
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
            }
      );
  }


}
