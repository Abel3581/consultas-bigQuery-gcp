import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountyNatalityResponse } from '../model/county-natality-response';
import { Observable, catchError, throwError } from 'rxjs';
import { CountyNatalityFilterResidenceAndBirths } from '../model/county-natality-filter-residence-and-births';
import { AbnormalConditionsResponse } from '../model/abnormal-conditions-response';
import { AbnormalConditionsFilters } from '../model/abnormal-conditions-filters';
import { Consulta } from '../model/consultas';
import { MessageResponse } from '../model/message-response';
import { SavedQueriesResponse } from '../model/saved-queries-response';
import { ConsultaDetalleResponse } from '../model/consulta-detalle-response';
import { CommentRequest } from '../model/comment-request';
import { AdminRequest } from '../model/admin-request';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  urlApi = "http://localhost:8080/data";
  urlConsult = "http://localhost:8080/consults";
  urlComment = "http://localhost:8080/comments";
  urlAdmin = "http://localhost:8080/admin";

  constructor(private http: HttpClient) { }

  public getCountyNatality(): Observable<CountyNatalityResponse[]> {
    return this.http.get<CountyNatalityResponse[]>(`${this.urlApi}/county-natality`) .pipe(
      catchError(this.handleError)
    );
  }

  public getCountyNatalityResidenceAndBirths(): Observable<CountyNatalityFilterResidenceAndBirths[]>{
    return this.http.get<CountyNatalityFilterResidenceAndBirths[]>(`${this.urlApi}/residence-births`).pipe(
      catchError(this.handleError)
    );
  }

  public getCountyNatalityByAbnormalConditions():Observable<AbnormalConditionsResponse[]>{
    return this.http.get<AbnormalConditionsResponse[]>(`${this.urlApi}/abnormal-conditions`).pipe(
      catchError(this.handleError)
    );
  }

  public abnormalConditionsFilters():Observable<AbnormalConditionsFilters[]>{
    return this.http.get<AbnormalConditionsFilters[]>(`${this.urlApi}/abnormal/condition/filters`).pipe(
      catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      // Errores del lado del servidor
      console.error('Error del lado del servidor:', error.status, error.error);
    }
    // Devolver un mensaje observable con información de error
    return throwError('Hubo un problema con la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }

  saveConsulta(nuevaConsulta: Consulta):Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.urlConsult}/create`, nuevaConsulta).pipe(
      catchError(this.handleError)
    );
  }

  getAllConsults():Observable<SavedQueriesResponse[]>{
    return this.http.get<SavedQueriesResponse[]>(`${this.urlConsult}/all`).pipe(
      catchError(this.handleError)
    );
  }

  getConsultaDetails(consultaId: number): Observable<ConsultaDetalleResponse[]> {
    return this.http.get<ConsultaDetalleResponse[]>(`${this.urlConsult}/${consultaId}`).pipe(
      catchError(this.handleError));
  }

  createComment(id:number, comment:CommentRequest): Observable<MessageResponse>{
    const url = `${this.urlComment}/${id}`;
    return this.http.post<MessageResponse>(url, comment).pipe(
      catchError(this.handleError));
  }

  loginAdmin(request: AdminRequest): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(`${this.urlAdmin}`,request).pipe(
      catchError(this.handleError)
    );
  }

}
