package com.medici.app.mapper;

import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.dto.response.CountyNatalityResponseId;
import com.medici.app.entity.CountyNatality;
import org.springframework.stereotype.Component;

@Component
public class CountyNatalityMapper {


    public CountyNatalityResponseId mapToCountyNatality(CountyNatality countyNatality) {
        return CountyNatalityResponseId.builder()
                .year(countyNatality.getYear())
                .Ave_Age_of_Mother(Double.valueOf(Double.valueOf(countyNatality.getAve_Age_of_Mother())))
                .Ave_Birth_Weight_gms(Double.valueOf(countyNatality.getAve_Birth_Weight_gms()))
                .County_of_Residence(countyNatality.getCounty_of_Residence())
                .Births(Double.valueOf(countyNatality.getBirths()))
                .Ave_LMP_Gestational_Age_Wks(Double.valueOf(countyNatality.getAve_LMP_Gestational_Age_Wks()))
                .Ave_Number_of_Prenatal_Wks(Double.valueOf(countyNatality.getAve_Number_of_Prenatal_Wks()))
                .Ave_OE_Gestational_Age_Wks(Double.valueOf(countyNatality.getAve_OE_Gestational_Age_Wks()))
                .Ave_Pre_pregnancy_BMI(Double.valueOf(countyNatality.getAve_Pre_pregnancy_BMI()))
                .build();
    }
}
