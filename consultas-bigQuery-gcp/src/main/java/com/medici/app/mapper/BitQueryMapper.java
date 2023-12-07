package com.medici.app.mapper;

import com.google.cloud.bigquery.FieldValueList;
import com.google.cloud.bigquery.TableResult;
import com.medici.app.dto.*;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.HashMap;

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

        if(row.get("Abnormal_Conditions_Checked_YN") != null && !row.get("Abnormal_Conditions_Checked_YN").isNull()){
            response.setAbnormalConditionsCheckedYN(row.get("Abnormal_Conditions_Checked_YN").getStringValue());
        }else {
            response.setAbnormalConditionsCheckedYN("-");
        }
        if(row.get("Abnormal_Conditions_Checked_Desc") != null && !row.get("Abnormal_Conditions_Checked_Desc").isNull()){
            response.setAbnormalConditionsCheckedDesc(row.get("Abnormal_Conditions_Checked_Desc").getStringValue());
        }else{
            response.setAbnormalConditionsCheckedDesc("-");
        }
        response.setYear(row.get("Year").getStringValue());
        response.setBirths(row.get("Births").getStringValue());
        if(row.get("Ave_Age_of_Mother") != null && !row.get("Ave_Age_of_Mother").isNull()){
            response.setAve_Age_of_Mother(row.get("Ave_Age_of_Mother").getStringValue());
        }else {
            response.setAve_Age_of_Mother("-");
        }
        if(row.get("Ave_Birth_Weight_gms") != null && !row.get("Ave_Birth_Weight_gms").isNull()){
            response.setAve_Birth_Weight_gms(row.get("Ave_Birth_Weight_gms").getStringValue());
        }else {
            response.setAve_Birth_Weight_gms("-");
        }
        if(row.get("Ave_LMP_Gestational_Age_Wks") != null && !row.get("Ave_LMP_Gestational_Age_Wks").isNull()){
            response.setAve_LMP_Gestational_Age_Wks(row.get("Ave_LMP_Gestational_Age_Wks").getStringValue());
        }else {
            response.setAve_LMP_Gestational_Age_Wks("-");
        }
        if(row.get("Ave_Number_of_Prenatal_Wks") != null && !row.get("Ave_Number_of_Prenatal_Wks").isNull()){
            response.setAve_Number_of_Prenatal_Wks(row.get("Ave_Number_of_Prenatal_Wks").getStringValue());
        }else {
            response.setAve_Number_of_Prenatal_Wks("-");
        }
        if(row.get("Ave_OE_Gestational_Age_Wks") != null && !row.get("Ave_OE_Gestational_Age_Wks").isNull()){
            response.setAve_OE_Gestational_Age_Wks(row.get("Ave_OE_Gestational_Age_Wks").getStringValue());
        }else {
            response.setAve_OE_Gestational_Age_Wks("-");
        }
        if (row.get("Ave_Pre_pregnancy_BMI") != null && !row.get("Ave_Pre_pregnancy_BMI").isNull() ){
            response.setAve_Pre_pregnancy_BMI(row.get("Ave_Pre_pregnancy_BMI").getStringValue());
        }else {
            response.setAve_Pre_pregnancy_BMI("-"); // O asigna un valor predeterminado según tu lógica
        }
        if (row.get("County_of_Residence") != null && !row.get("County_of_Residence").isNull()){
            response.setCounty_of_Residence(row.get("County_of_Residence").getStringValue());
        }else {
            response.setCounty_of_Residence("-");
        }
        if (row.get("County_of_Residence_FIPS") != null && !row.get("County_of_Residence_FIPS").isNull()){
            response.setCounty_of_Residence_FIPS(row.get("County_of_Residence_FIPS").getStringValue());
        }else {
            response.setCounty_of_Residence_FIPS("-");
        }

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


    public CountyNatalitySearchResponse mapToSearchRequest(FieldValueList row) {
        return CountyNatalitySearchResponse.builder()
                .Nacimientos(row.get("Births").getStringValue())
                .Edad_Promedio_de_la_Madre(row.get("Ave_Age_of_Mother").getStringValue())
                .IMC_Promedio_Previo_al_Embarazo(row.get("Ave_Pre_pregnancy_BMI").getStringValue())
                //.Codigo_FIPS_Del_Condado(row.get("County_of_Residence_FIPS").getStringValue())
                .Edad_OE_Promedio_Gestacional_Semanas(row.get("Ave_OE_Gestational_Age_Wks").getStringValue())
                .Número_Promedio_de_Semanas_Prenatales(row.get("Ave_Number_of_Prenatal_Wks").getStringValue())
                .Peso_Promedio_de_Nacimiento_gramos(row.get("Ave_Birth_Weight_gms").getStringValue())
                .Edad_LMP_Promedio_Gestacional_Semanas(row.get("Ave_LMP_Gestational_Age_Wks").getStringValue())
                .build();
    }

    private int parseIntOrZero(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            // Si no se puede convertir, devuelve 0 o maneja el error de alguna manera
            return 0;
        }
    }

    public HashMap<String, Integer> mapToRowCountyNatalityResponse(FieldValueList row) {
        return null;
    }
}