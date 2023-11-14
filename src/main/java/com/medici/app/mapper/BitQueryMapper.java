package com.medici.app.mapper;

import com.medici.app.dto.CountyNatalityFilterResidenceAndBirths;
import com.medici.app.dto.CountyNatalityResponse;
import org.springframework.stereotype.Component;

@Component
public class BitQueryMapper {

    public CountyNatalityFilterResidenceAndBirths mapTo(String residence, String births) {
        return CountyNatalityFilterResidenceAndBirths.builder()
                .County_of_Residence(residence)
                .Births(births)
                .build();
    }


    public CountyNatalityResponse mapToCountyNatality(String year, String countyOfResidence, String aveLMPGestationalAgeWks, String aveBirthWeightGms, String countyOfResidenceFips, String aveAgeOfMother, String aveOeGestationalAgeWks, String avePrePregnancyBmi, String aveNumberOfPrenatalWks, String births) {
        return CountyNatalityResponse.builder()
                .year(year)
                .Births(births)
                .County_of_Residence_FIPS(countyOfResidenceFips)
                .Ave_Age_of_Mother(aveAgeOfMother)
                .County_of_Residence(countyOfResidence)
                .Ave_Pre_pregnancy_BMI(avePrePregnancyBmi)
                .Ave_Number_of_Prenatal_Wks(aveNumberOfPrenatalWks)
                .Ave_OE_Gestational_Age_Wks(aveOeGestationalAgeWks)
                .Ave_Birth_Weight_gms(aveBirthWeightGms)
                .Ave_Pre_pregnancy_BMI(avePrePregnancyBmi)
                .Ave_LMP_Gestational_Age_Wks(aveLMPGestationalAgeWks)
                .build();

    }
}
