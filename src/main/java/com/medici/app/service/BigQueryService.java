package com.medici.app.service;


import com.google.cloud.bigquery.*;
import com.medici.app.dto.*;
import com.medici.app.mapper.BitQueryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BigQueryService implements com.medici.app.service.injectdependency.BigQueryService {
    //county_natality, county_natality_by_abnormal_conditions, county_natality_by_congenital_abnormalities

    private String  GET_COUNTY_NATALITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 10;";
    private String GET_COUNTY_NATALITY_RESIDENCE_AND_BIRTHS = "SELECT County_of_Residence, Births FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 10";
    private String BD_BIGQUERY_NAME = "bigquery-public-data.sdoh_cdc_wonder_natality.county_natality";
    private String GET_ABNORMAL_CONDITIONS = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_abnormal_conditions` LIMIT 10";
    private String GET_ABNORMAL_CONDITIONS_FILTERS = "SELECT County_of_Residence, Births, Abnormal_Conditions_Checked_Desc, Ave_Age_of_Mother FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_abnormal_conditions` LIMIT 10";

    private final BigQuery bigquery;

    private final BitQueryMapper bitQueryMapper;

    public List<String> getConsult() throws Exception {
        List<String> jsonResults = new ArrayList<>();

        String GET_COUNTY_NATALITY = this.GET_COUNTY_NATALITY;
        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(GET_COUNTY_NATALITY).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(
                queryConfig).build());
        queryJob = queryJob.waitFor();
        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();
        for(FieldValueList row : result.iterateAll()){

            String year = row.get("Year").getStringValue();
            String countyOfResidence = row.get("County_of_Residence").getStringValue();

            // Crear un objeto JSON simple con los datos que deseas
            String jsonResult = String.format("{\"Year\": \"%s\", \"County_of_Residence\": \"%s\"}", year, countyOfResidence);
            jsonResults.add(jsonResult);
            System.out.println(jsonResult);



        }
        return jsonResults;

    }

    @Override
    public List<CountyNatalityResponse> getConsultTable() throws Exception {
        List<CountyNatalityResponse> responses = new ArrayList<>();
        String getCountyNatality = this.GET_COUNTY_NATALITY;

        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(getCountyNatality).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).build());

        queryJob = queryJob.waitFor();

        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        //System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();

        for (FieldValueList row: result.iterateAll()){
            String year = row.get("Year").getStringValue();
            String countyOfResidence = row.get("County_of_Residence").getStringValue();
            String aveLMPGestationalAgeWks = row.get("Ave_LMP_Gestational_Age_Wks").getStringValue();
            String aveBirthWeightGms = row.get("Ave_Birth_Weight_gms").getStringValue();
            String countyOfResidenceFips = row.get("County_of_Residence_FIPS").getStringValue();
            String aveAgeOfMother = row.get("Ave_Age_of_Mother").getStringValue();
            String aveOeGestationalAgeWks = row.get("Ave_OE_Gestational_Age_Wks").getStringValue();
            String avePrePregnancyBmi = row.get("Ave_Pre_pregnancy_BMI").getStringValue();
            String aveNumberOfPrenatalWks = row.get("Ave_Number_of_Prenatal_Wks").getStringValue();
            String births = row.get("Births").getStringValue();

            responses.add(bitQueryMapper.mapToCountyNatality(year,countyOfResidence,aveLMPGestationalAgeWks,aveBirthWeightGms,
                    countyOfResidenceFips,aveAgeOfMother,aveOeGestationalAgeWks,avePrePregnancyBmi,aveNumberOfPrenatalWks,
                    births));
        }
        return responses;
    }

    @Override
    public List<CountyNatalityFilterResidenceAndBirths> getCountyNatalityResidenceAndBirths() throws Exception {
        List<CountyNatalityFilterResidenceAndBirths> responses = new ArrayList<>();
        String getResidenceAndBirths = GET_COUNTY_NATALITY_RESIDENCE_AND_BIRTHS;
        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(getResidenceAndBirths).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).build());

        queryJob = queryJob.waitFor();

        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        //System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();

        for (FieldValueList row: result.iterateAll()){
            String residence = row.get("County_of_Residence").getStringValue();
            String births = row.get("Births").getStringValue();
            responses.add(bitQueryMapper.mapTo(residence, births));
        }
        return responses;
    }

    @Override
    public List<AbnormalConditionsResponse> getCountyNatalityByAbnormalConditions() throws Exception {
        List<AbnormalConditionsResponse> responses = new ArrayList<>();
        String getAbnormalConditions = GET_ABNORMAL_CONDITIONS;
        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(getAbnormalConditions).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).build());

        queryJob = queryJob.waitFor();

        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        //System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();
        for (FieldValueList row: result.iterateAll()){
            responses.add(bitQueryMapper.mapToRowAbnormalConditions(row));
        }

        return responses;
    }

    @Override
    public List<AbnormalConditionsFilters> bnormalConditionsFilters() throws Exception {
        List<AbnormalConditionsFilters> responses = new ArrayList<>();
        QueryJobConfiguration configuration = QueryJobConfiguration.newBuilder(GET_ABNORMAL_CONDITIONS_FILTERS).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(configuration).build());
        queryJob = queryJob.waitFor();
        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        //System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();
        for (FieldValueList row: result.iterateAll()){
            responses.add(bitQueryMapper.mapToRowAbnormalConditionsFilters(row));
        }

        return responses;
    }




}
