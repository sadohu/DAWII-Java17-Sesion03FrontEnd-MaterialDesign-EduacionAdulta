import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-docente',
  templateUrl: './consulta-docente.component.html',
  styleUrls: ['./consulta-docente.component.css']
})
export class ConsultaDocenteComponent {
  // Docente List
  dataSource: any;

  // Paginator Class
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // Table Header Display
  displayedColumns = ["idDocente", "nombre", "dni", "fecha", "hora", "ubigeo", "estado"];

  // Ubigeo List for Selects
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  // Params to query
  nombre: string = "";
  dni: string = "";
  estado: boolean = true;
  selDepartamento: string = "-1";
  selProvincia: string = "-1";
  selDistrito: number = -1;

  constructor(
    private ubigeoService: UbigeoService,
    private docenteService: DocenteService
  ) {
    this.ubigeoService.listarDepartamento().subscribe(
      x => this.departamentos = x
    );
  }

  cargaProvincia() {
    this.ubigeoService.listaProvincias(this.selDepartamento).subscribe(
      response => this.provincias = response
    );
    this.distritos = [];
    this.selDistrito = -1;
    this.selProvincia = "-1";
  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.selDepartamento, this.selProvincia).subscribe(
      response => this.distritos = response
    );
    this.selDistrito = -1;
  }

  consulta() {
    console.log("nombre", this.nombre);
    console.log("dni", this.dni);
    console.log("estado", this.estado);
    console.log("selDistrito", this.selDistrito);

    this.docenteService.consulta(this.nombre, this.dni, this.estado ? 1 : 0, this.selDistrito).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<Docente>(response);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  exportarPDF() {
    this.docenteService.generateDocumentReport(this.nombre, this.dni, this.estado ? 1 : 0, this.selDistrito).subscribe(
      response => {
        console.log(response);
        var url = window.URL.createObjectURL(response.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
  }
}
