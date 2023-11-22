import { ConsultRequest } from "./consult-request";

export interface Consulta{
  
  nameUser: string;
  nameConsult: string;
  comment: string;
  countyNatalityBaseList: ConsultRequest[];

}