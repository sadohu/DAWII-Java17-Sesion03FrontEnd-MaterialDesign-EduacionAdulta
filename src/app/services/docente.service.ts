import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';
import { AppSettings } from '../app.settings';

const baseUrl =  AppSettings.API_ENDPOINT + "/crudDocente";
const baseUrlConsulta =  AppSettings.API_ENDPOINT + "/consultaDocente";
@Injectable({
  providedIn: 'root'
})
export class DocenteService {
 
  constructor(private http:HttpClient) { }
 
  consultaPorNombre(filtro:string):Observable<Docente[]>{
      return  this.http.get<Docente[]>(baseUrl +"/listaDocentePorNombreLike/"+filtro);
  }

  inserta(obj:Docente):Observable<any>{
      return this.http.post(baseUrl +"/registraDocente", obj);
  }

  actualiza(obj:Docente):Observable<any>{
      return this.http.put(baseUrl + "/actualizaDocente", obj);
  }

  elimina(idDocente:number):Observable<any>{
      return this.http.delete(baseUrl + "/eliminaDocente/"+ idDocente);
  }

  consulta(nombre: string, dni: string, estado: number, idUbigeo: number) : Observable<Docente[]>{
    const params = new HttpParams()
      .set("nombre", nombre)
      .set("dni", dni)
      .set("estado", estado)
      .set("idUbigeo", idUbigeo);

    return this.http.get<Docente[]>(baseUrlConsulta + "/consultaDocentePorParametros" + { params });
  }

}
