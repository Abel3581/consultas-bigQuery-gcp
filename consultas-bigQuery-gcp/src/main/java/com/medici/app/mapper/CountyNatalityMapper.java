package com.medici.app.mapper;

import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.entity.CountyNatality;
import org.springframework.stereotype.Component;

@Component
public class CountyNatalityMapper {


    public CountyNatalityResponse mapToCountyNatality(CountyNatality countyNatality) {
        return CountyNatalityResponse.builder()
                .id(countyNatality.getId())
                .year(countyNatality.getYear())
                .abnormalConditionsCheckedDesc(countyNatality.getAbnormalConditionsCheckedDesc())
                .abnormalConditionsCheckedYN(countyNatality.getAbnormalConditionsCheckedYN())
                .Ave_Age_of_Mother(countyNatality.getAve_Age_of_Mother())
                .Ave_Birth_Weight_gms(countyNatality.getAve_Birth_Weight_gms())
                .County_of_Residence(countyNatality.getCounty_of_Residence())
                .County_of_Residence_FIPS(countyNatality.getCounty_of_Residence_FIPS())
                .Births(countyNatality.getBirths())
                .Ave_LMP_Gestational_Age_Wks(countyNatality.getAve_LMP_Gestational_Age_Wks())
                .Ave_Number_of_Prenatal_Wks(countyNatality.getAve_Number_of_Prenatal_Wks())
                .Ave_OE_Gestational_Age_Wks(countyNatality.getAve_OE_Gestational_Age_Wks())
                .Ave_Pre_pregnancy_BMI(countyNatality.getAve_Pre_pregnancy_BMI())
                .build();
    }
}
