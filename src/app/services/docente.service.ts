import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';
import { AppSettings } from '../app.settings';
import { map } from 'rxjs/operators';

const baseUrl = AppSettings.API_ENDPOINT + "/crudDocente";
const baseUrlConsulta = AppSettings.API_ENDPOINT + "/consultaDocente";
@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }

  consultaPorNombre(filtro: string): Observable<Docente[]> {
    return this.http.get<Docente[]>(baseUrl + "/listaDocentePorNombreLike/" + filtro);
  }

  inserta(obj: Docente): Observable<any> {
    return this.http.post(baseUrl + "/registraDocente", obj);
  }

  actualiza(obj: Docente): Observable<any> {
    return this.http.put(baseUrl + "/actualizaDocente", obj);
  }

  elimina(idDocente: number): Observable<any> {
    return this.http.delete(baseUrl + "/eliminaDocente/" + idDocente);
  }

  consulta(nombre: string, dni: string, estado: number, idUbigeo: number): Observable<Docente[]> {
    const params = new HttpParams()
      .set("nombre", nombre)
      .set("dni", dni)
      .set("estado", estado)
      .set("idUbigeo", idUbigeo);

    return this.http.get<Docente[]>(baseUrlConsulta + "/consultaDocentePorParametros", { params });
  }

  generateDocumentReport(nombre: string,
    dni: string,
    estado: number,
    idUbigeo: number): Observable<any> {

    const params = new HttpParams()
      .set("nombre", nombre)
      .set("dni", dni)
      .set("estado", estado)
      .set("idUbigeo", idUbigeo);

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/pdf');
    let requestOptions: any = { headers: headers, responseType: 'blob' };

    return this.http.post(baseUrlConsulta + "/reporteDocentePdf?nombre=" + nombre + "&dni=" + dni + "&estado=" + estado + "&idUbigeo=" + idUbigeo, '', requestOptions).pipe(map((response) => {
      return {
        filename: 'ReporteDocentes.pdf',
        data: new Blob([response], { type: 'application/pdf' })
      };
    }));
  }

  generateDocumentExcel(nombre: string,
    dni: string,
    estado: number,
    idUbigeo: number): Observable<any> {

    const params = new HttpParams()
      .set("nombre", nombre)
      .set("dni", dni)
      .set("estado", estado)
      .set("idUbigeo", idUbigeo);

    let headers = new HttpHeaders();
    headers.append('Accept', 'application/vnd.ms-excel');
    let requestOptions: any = { headers: headers, responseType: 'blob' };

    return this.http.post(baseUrlConsulta + "/reporteDocenteExcel?nombre=" + nombre + "&dni=" + dni + "&estado=" + estado + "&idUbigeo=" + idUbigeo, '', requestOptions).pipe(map((response) => {
      return {
        filename: 'ReporteDocentes.xlsx',
        data: new Blob([response], { type: 'application/vnd.ms-excel' })
      };
    }));
  }

}
