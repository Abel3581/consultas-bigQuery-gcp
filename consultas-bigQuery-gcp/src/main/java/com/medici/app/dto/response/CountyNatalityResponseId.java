package com.medici.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountyNatalityResponseId {

    private String year;
    private String County_of_Residence;
    private double Births;
    private double Ave_Age_of_Mother;
    private double Ave_OE_Gestational_Age_Wks;
    private double Ave_LMP_Gestational_Age_Wks;
    private double Ave_Birth_Weight_gms;
    private double Ave_Pre_pregnancy_BMI;
    private double Ave_Number_of_Prenatal_Wks;


}
