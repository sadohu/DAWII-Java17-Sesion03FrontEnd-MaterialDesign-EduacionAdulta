import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-consulta-docente',
  templateUrl: './consulta-docente.component.html',
  styleUrls: ['./consulta-docente.component.css']
})
export class ConsultaDocenteComponent {
  // Docente List
  dataSource:any;
  // Paginator Class
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // Table Header Display
  displayedColumns = ["idDocente","nombre","dni","fecha","hora","ubigeo","estado"];

}
