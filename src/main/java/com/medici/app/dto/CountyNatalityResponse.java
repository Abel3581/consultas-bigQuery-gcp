package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountyNatalityResponse {

    private String year;
    private String County_of_Residence;
    private String County_of_Residence_FIPS;
    private String Births;
    private String Ave_Age_of_Mother;
    private String Ave_OE_Gestational_Age_Wks;
    private String Ave_LMP_Gestational_Age_Wks;
    private String Ave_Birth_Weight_gms;
    private String Ave_Pre_pregnancy_BMI;
    private String Ave_Number_of_Prenatal_Wks;


}
