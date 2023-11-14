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

    protected String year;
    protected String County_of_Residence;
    protected String County_of_Residence_FIPS;
    protected String Births;
    protected String Ave_Age_of_Mother;
    protected String Ave_OE_Gestational_Age_Wks;
    protected String Ave_LMP_Gestational_Age_Wks;
    protected String Ave_Birth_Weight_gms;
    protected String Ave_Pre_pregnancy_BMI;
    protected String Ave_Number_of_Prenatal_Wks;


}
