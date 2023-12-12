
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
import { CountyNatalitySearchRequest } from '../model/county-natality-search-request';
import { CountyNatalitySearchResponse } from '../model/county-natality-search-response';
import { CountyNatalityFilter } from '../model/county-natality-filter';
import { AbnormalFiltersResponse } from '../model/abnormal-filters-response';
import { CongenitalResponse } from '../model/congenital-response';
import { CongenitalFilters } from '../model/congenital-filters';
import { FatherRaceResponse } from '../model/father-race-response';
import { FatherRaceFilters } from '../model/father-race-filters';
import { MaternalMorbidityResponse } from '../model/maternal/maternal-morbidity-response';
import { MaternalMorbidityFilters } from '../model/maternal/maternal-morbidity-filters';
import { MotherRaceResponse } from '../model/motherRace/mother-race-response';
import { MotherRaceFilters } from '../model/motherRace/mother-race-filters';
import { PaymentResponse } from '../model/payment/payment-response';
import { PaymentFiltersResponse } from '../model/payment/payment-filters-response';

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

  searchByYearAndResidence(request: CountyNatalitySearchRequest): Observable<CountyNatalitySearchResponse[]>{
    // const params = {
    //   year: request.year,
    //   county_of_Residence: request.county_of_Residence
    // };
    return this.http.post<CountyNatalitySearchResponse[]>(`${this.urlApi}/search`, request).pipe(
      catchError(this.handleError)
    );
  }

  getAllByYearAndBirths(): Observable<CountyNatalityFilter>{
    return this.http.get<CountyNatalityFilter>(`${this.urlApi}/year/births`);
  }

  getAllAbnormalNoCheckedUnknown(): Observable<AbnormalFiltersResponse>{
    return this.http.get<AbnormalFiltersResponse>(`${this.urlApi}/abnormal`);
  }

  getAllCongenitalAbnormalities(): Observable<CongenitalResponse[]>{
    return this.http.get<CongenitalResponse[]>(`${this.urlApi}/congenital`);
  }

  getAllCongenitalFilters(): Observable<CongenitalFilters>{
    return this.http.get<CongenitalFilters>(`${this.urlApi}/congenital/filters`);
  }

  getAllByFatherRace(): Observable<FatherRaceResponse[]>{
    return this.http.get<FatherRaceResponse[]>(`${this.urlApi}/father/race`);
  }

  getFatherRaceFilters(): Observable<FatherRaceFilters>{
    return this.http.get<FatherRaceFilters>(`${this.urlApi}/father/race/filters`);
  }

  getAllMaternalMorbidity(): Observable<MaternalMorbidityResponse[]>{
    return this.http.get<MaternalMorbidityResponse[]>(`${this.urlApi}/maternal`);
  }

  getMaternalMorbidityFilters(): Observable<MaternalMorbidityFilters>{
    return this.http.get<MaternalMorbidityFilters>(`${this.urlApi}/maternal/filters`);
  }

  getAllMotherRace(): Observable<MotherRaceResponse[]>{
    return this.http.get<MotherRaceResponse[]>(`${this.urlApi}/mother/race`);
  }

  getMotherRaceFilters(): Observable<MotherRaceFilters>{
    return this.http.get<MotherRaceFilters>(`${this.urlApi}/mother/filters`)
  }

  getAllPayments(): Observable<PaymentResponse[]>{
    return this.http.get<PaymentResponse[]>(`${this.urlApi}/payment`);
  }

  getPaymentFilters(): Observable<PaymentFiltersResponse>{
    return this.http.get<PaymentFiltersResponse>(`${this.urlApi}/payment/filters`);
  }

}
