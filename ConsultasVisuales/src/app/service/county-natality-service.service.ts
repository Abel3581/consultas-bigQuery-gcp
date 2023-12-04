import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ConsultaDetalleResponse } from '../model/consulta-detalle-response';
import { CountySearchIdResponse } from '../model/county-search-id-response';

@Injectable({
  providedIn: 'root'
})
export class CountyNatalityServiceService {

   urlCounty = 'http://localhost:8080/countyNatality';

  constructor(private http: HttpClient) { }


  getByIdCountyNatality(id: number): Observable<CountySearchIdResponse[]>{
    return this.http.get<CountySearchIdResponse[]>(`${this.urlCounty}/${id}`).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente
      console.error('Error del lado del cliente:', error.error.message);
    }
    if(error.status === 401){
      return throwError(error.error.message);
    }
    if(error.status === 409){
      return throwError(error.error.message);
    }
    else {
      // Errores del lado del servidor
      console.error('Error del lado del servidor:', error.status, error.error);
    }
    // Devolver un mensaje observable con información de error
    return throwError('Hubo un problema con la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }

}
