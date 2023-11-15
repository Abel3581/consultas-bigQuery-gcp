package com.medici.app.mapper;

import com.google.cloud.bigquery.FieldValueList;
import com.medici.app.dto.*;
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

    public AbnormalConditionsResponse mapToRowAbnormalConditions(FieldValueList row) {
        AbnormalConditionsResponse response = new AbnormalConditionsResponse();
        response.setAbnormalConditionsCheckedYN(row.get("Abnormal_Conditions_Checked_YN").getStringValue());
        response.setAbnormalConditionsCheckedDesc(row.get("Abnormal_Conditions_Checked_Desc").getStringValue());
        response.setYear(row.get("Year").getStringValue());
        response.setBirths(row.get("Births").getStringValue());
        response.setAve_Age_of_Mother(row.get("Ave_Age_of_Mother").getStringValue());
        response.setAve_Birth_Weight_gms(row.get("Ave_Birth_Weight_gms").getStringValue());
        response.setAve_LMP_Gestational_Age_Wks(row.get("Ave_LMP_Gestational_Age_Wks").getStringValue());
        response.setAve_Number_of_Prenatal_Wks(row.get("Ave_Number_of_Prenatal_Wks").getStringValue());
        response.setAve_OE_Gestational_Age_Wks(row.get("Ave_OE_Gestational_Age_Wks").getStringValue());
        response.setAve_Pre_pregnancy_BMI(row.get("Ave_Pre_pregnancy_BMI").getStringValue());
        response.setCounty_of_Residence(row.get("County_of_Residence").getStringValue());
        response.setCounty_of_Residence_FIPS(row.get("County_of_Residence_FIPS").getStringValue());

        return response;

    }

    public AbnormalConditionsFilters mapToRowAbnormalConditionsFilters(FieldValueList row) {
        return AbnormalConditionsFilters.builder()
                .abnormalConditionsCheckedDesc(row.get("Abnormal_Conditions_Checked_Desc").getStringValue())
                .Ave_Age_of_Mother(row.get("Ave_Age_of_Mother").getStringValue())
                .Births(row.get("Births").getStringValue())
                .County_of_Residence(row.get("County_of_Residence").getStringValue())
                .build();
    }

    public FiltersDto mapToFilters(FieldValueList row) {
        return FiltersDto.builder()
                .year(row.get("Year").getStringValue())
                .ave_Age_of_Mother(row.get("Ave_Age_of_Mother").getStringValue())
                .births(row.get("Births").getStringValue())
                .county_of_Residence(row.get("County_of_Residence").getStringValue())
                .build();
    }



}