package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CountyNatalityBaseResponse {

    private Long id;
    private String year;
    private String county_of_Residence;
    private String county_of_Residence_FIPS;
    private String births;
    private String ave_Age_of_Mother;
    private String ave_OE_Gestational_Age_Wks;
    private String ave_LMP_Gestational_Age_Wks;
    private String ave_Birth_Weight_gms;
    private String ave_Pre_pregnancy_BMI;
    private String ave_Number_of_Prenatal_Wks;
    private String abnormalConditionsCheckedDesc;
    private String abnormalConditionsCheckedYN;
}
