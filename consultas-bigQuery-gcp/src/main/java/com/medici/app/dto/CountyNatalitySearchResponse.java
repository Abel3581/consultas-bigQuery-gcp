package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountyNatalitySearchResponse {

   // private String Codigo_FIPS_Del_Condado;
    private String Nacimientos;
    private String Edad_Promedio_de_la_Madre;
    private String Edad_OE_Promedio_Gestacional_Semanas;
    private String Edad_LMP_Promedio_Gestacional_Semanas;
    private String Peso_Promedio_de_Nacimiento_gramos;
    private String IMC_Promedio_Previo_al_Embarazo;
    private String Número_Promedio_de_Semanas_Prenatales;




}
