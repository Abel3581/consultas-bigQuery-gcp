export interface CountyNatalitySearchResponse {

  Codigo_FIPS_Del_Condado: string;
  Nacimientos: string;
  Edad_Promedio_de_la_Madre: string;
  Edad_OE_Promedio_Gestacional_Semanas: string;
  Edad_LMP_Promedio_Gestacional_Semanas: string;
  Peso_Promedio_de_Nacimiento_gramos: string;
  IMC_Promedio_Previo_al_Embarazo: string;
  Número_Promedio_de_Semanas_Prenatales: string;
  [key: string]: string;
}
