package com.medici.app.mapper;


import com.medici.app.dto.ConsultRequest;
import com.medici.app.dto.CountyNatalityBaseRequest;
import com.medici.app.entity.CountyNatality;
import com.medici.app.entity.CountyNatalityBase;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConsultMapper {


    public CountyNatalityBase maptoConsultRequest(ConsultRequest request) {
        return CountyNatalityBase.builder()
                .nameUser(request.getNameUser())
                .nameConsult(request.getNameConsult())
                .comment(request.getComment())

                .build();
    }

    public List<CountyNatality> maptoCountyNatalityBaseList(List<CountyNatalityBaseRequest> countyNatalityBaseList) {
        return countyNatalityBaseList.stream()
                .map(this::mapToCountyNatality) // Usa un método auxiliar para realizar el mapeo
                .collect(Collectors.toList());
    }

    private CountyNatality mapToCountyNatality(CountyNatalityBaseRequest request) {
       return CountyNatality.builder()
               .abnormalConditionsCheckedDesc(request.getAbnormalConditionsCheckedDesc())
               .abnormalConditionsCheckedYN(request.getAbnormalConditionsCheckedYN())
               .ave_Age_of_Mother(request.getAve_Age_of_Mother())
               .ave_Birth_Weight_gms(request.getAve_Birth_Weight_gms())
               .county_of_Residence(request.getCounty_of_Residence())
               .county_of_Residence_FIPS(request.getCounty_of_Residence_FIPS())
               .births(request.getBirths())
               .year(request.getYear())
               .ave_LMP_Gestational_Age_Wks(request.getAve_LMP_Gestational_Age_Wks())
               .ave_Number_of_Prenatal_Wks(request.getAve_Number_of_Prenatal_Wks())
               .ave_OE_Gestational_Age_Wks(request.getAve_OE_Gestational_Age_Wks())
               .ave_Pre_pregnancy_BMI(request.getAve_Pre_pregnancy_BMI())

               .build();
    }

}
