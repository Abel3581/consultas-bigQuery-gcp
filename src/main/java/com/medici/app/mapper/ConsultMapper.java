package com.medici.app.mapper;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.entity.CountyNatalityBase;
import org.springframework.stereotype.Component;

@Component
public class ConsultMapper {

    public CountyNatalityBase mapToConsultRequest(ConsultRequest request) {
        return CountyNatalityBase.builder()
                .year(request.getYear())
                .nameConsult(request.getNameConsult())
                .abnormalConditionsCheckedDesc(request.getAbnormalConditionsCheckedDesc())
                .abnormalConditionsCheckedYN(request.getAbnormalConditionsCheckedYN())
                .ave_Age_of_Mother(request.getAve_Age_of_Mother())
                .ave_Birth_Weight_gms(request.getAve_Birth_Weight_gms())
                .ave_LMP_Gestational_Age_Wks(request.getAve_LMP_Gestational_Age_Wks())
                .ave_Number_of_Prenatal_Wks(request.getAve_Number_of_Prenatal_Wks())
                .ave_OE_Gestational_Age_Wks(request.getAve_OE_Gestational_Age_Wks())
                .ave_Pre_pregnancy_BMI(request.getAve_Pre_pregnancy_BMI())
                .births(request.getBirths())
                .comment(request.getComment())
                .county_of_Residence(request.getCounty_of_Residence())
                .county_of_Residence_FIPS(request.getCounty_of_Residence_FIPS())
                .nameUser(request.getNameUser())
                .nameConsult(request.getNameConsult())
                .build();

    }
}
