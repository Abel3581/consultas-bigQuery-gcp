package com.medici.app.service;


import com.google.cloud.bigquery.*;
import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BigQueryService2 implements BigQueryService {

    private String   GET_COUNTY_NATALITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 10;";

    private final BigQuery bigquery;

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
        String GET_COUNTY_NATALITY = this.GET_COUNTY_NATALITY;

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(GET_COUNTY_NATALITY).build();
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

            responses.add(this.createResponse(year,countyOfResidence,aveLMPGestationalAgeWks,aveBirthWeightGms,
                    countyOfResidenceFips,aveAgeOfMother,aveOeGestationalAgeWks,avePrePregnancyBmi,aveNumberOfPrenatalWks,
                    births));
        }
        return responses;
    }

    private CountyNatalityResponse createResponse(String year, String countyOfResidence, String aveLMPGestationalAgeWks, String aveBirthWeightGms,
                                                  String countyOfResidenceFips, String aveAgeOfMother,
                                                  String aveOeGestationalAgeWks, String avePrePregnancyBmi,
                                                  String aveNumberOfPrenatalWks, String births) {
        return CountyNatalityResponse.builder()
                .year(year)
                .County_of_Residence(countyOfResidence)
                .Ave_Age_of_Mother(aveAgeOfMother)
                .Ave_Birth_Weight_gms(aveBirthWeightGms)
                .Ave_LMP_Gestational_Age_Wks(aveLMPGestationalAgeWks)
                .Ave_Number_of_Prenatal_Wks(aveNumberOfPrenatalWks)
                .Ave_OE_Gestational_Age_Wks(aveOeGestationalAgeWks)
                .Births(births)
                .Ave_Pre_pregnancy_BMI(avePrePregnancyBmi)
                .County_of_Residence_FIPS(countyOfResidenceFips).build();
    }
}
