package com.medici.app.service;


import com.google.cloud.bigquery.*;
import com.medici.app.config.BigQueryUrlConstants;
import com.medici.app.dto.*;
import com.medici.app.dto.response.*;
import com.medici.app.mapper.BitQueryMapper;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.*;


@Log4j2
@Service
@RequiredArgsConstructor
public class BigQueryServiceImpl implements BigQueryService {

    private String  GET_COUNTY_NATALITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 20;";
    private String GET_COUNTY_NATALITY_RESIDENCE_AND_BIRTHS = "SELECT County_of_Residence, Births FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 20";
    private String GET_ABNORMAL_CONDITIONS = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_abnormal_conditions` LIMIT 3961";
    private String GET_ABNORMAL_CONDITIONS_FILTERS = "SELECT County_of_Residence, Births, Abnormal_Conditions_Checked_Desc, Ave_Age_of_Mother FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_abnormal_conditions` LIMIT 20";

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
        String getCountyNatality = BigQueryUrlConstants.GET_COUNTY_NATALITY;

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
        String getAbnormalConditions = BigQueryUrlConstants.GET_ABNORMAL_CONDITIONS;
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

    @Override
    public List<CountyNatalitySearchResponse> searchByYearAndResidence(CountyNatalitySearchRequest request) throws Exception {
        List<CountyNatalitySearchResponse> responses = new ArrayList<>();
        String GET_COUNTY_NATALITY_SEARCH_BY_YEAR_AND_RESIDENCE = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` " + "WHERE TIMESTAMP(Year) = TIMESTAMP('" + request.getYear() + "') " + "AND County_of_Residence = '" + request.getCounty_of_Residence() + "' " + "LIMIT 10";

        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(GET_COUNTY_NATALITY_SEARCH_BY_YEAR_AND_RESIDENCE).build();
        Job job = bigquery.create(JobInfo.newBuilder(queryJobConfiguration).build());
        job = job.waitFor();
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        //System.out.println("Imprimiento resultados");
        TableResult result = job.getQueryResults();
            for (FieldValueList row: result.iterateAll()){
                log.info("Row" + row.toString());
                responses.add(bitQueryMapper.mapToSearchRequest(row));
            }
        return responses;

    }

    @Override
    public CountyNatalityFilterResponse getAllByYearAndBirths() throws Exception {
        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(BigQueryUrlConstants.GET_BY_YEAR_AND_BIRTHS).build();
        Job job = bigquery.create((JobInfo.newBuilder(queryJobConfiguration).build()));
        job = job.waitFor();
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        TableResult result = job.getQueryResults();
        Integer births2018 = 0;
        Integer births2017 = 0;
        Integer births2016 = 0;

        CountyNatalityFilterResponse response = new CountyNatalityFilterResponse();
        response.setYear20180101("2018-01-01");
        response.setYear20170101("2017-01-01");
        response.setYear20160101("2016-01-01");

        if (result != null) {
            for (FieldValueList row : result.iterateAll()) {
                log.info("Row" + row.toString());
                if (row.get("Year").getStringValue().equals("2018-01-01")) {

                    births2018 += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Year").getStringValue().equals("2017-01-01")) {
                    births2017 += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Year").getStringValue().equals("2016-01-01")) {
                    births2016 += Integer.parseInt(row.get("Births").getStringValue());
                }
            }
        } else {
            log.error("No hay resultados en la consulta de BigQuery.");
        }
        response.setBirths2018(births2018);
        response.setBirths2017(births2017);
        response.setBirths2016(births2016);

        return response;
    }

    @Override
    public AbnormalFiltersResponse getAllAbnormalNoCheckedUnknown() throws Exception {
        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(BigQueryUrlConstants.GET_ABNORMAL_CONDITIONS).build();
        Job job = bigquery.create((JobInfo.newBuilder(queryJobConfiguration).build()));
        job = job.waitFor();
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        TableResult result = job.getQueryResults();
        Integer noneChecked = 0;
        Integer atLeastOneChecked = 0;
        Integer unknownOrNotStated = 0;
        AbnormalFiltersResponse response = new AbnormalFiltersResponse();
        if(result != null){
            for(FieldValueList row: result.iterateAll()){
                log.info(row.toString());
                if (row.get("Abnormal_Conditions_Checked_Desc").getStringValue().equals("None checked")) {
                    noneChecked += Integer.parseInt(row.get("Abnormal_Conditions_Checked_YN").getStringValue());
                }
                if (row.get("Abnormal_Conditions_Checked_Desc").getStringValue().equals("At least one checked")) {
                    atLeastOneChecked += Integer.parseInt(row.get("Abnormal_Conditions_Checked_YN").getStringValue());
                }
                if (row.get("Abnormal_Conditions_Checked_Desc").getStringValue().equals("Unknown or Not Stated")) {
                    unknownOrNotStated += Integer.parseInt(row.get("Abnormal_Conditions_Checked_YN").getStringValue());
                }
            }
        }else {
            log.error("No hay resultados en la consulta de BigQuery.");
        }
        response.setNoneChecked(noneChecked);
        response.setAtLeastOneChecked(atLeastOneChecked);
        response.setUnknownOrNotStated(unknownOrNotStated);
        return response;
    }

    @Override
    public List<CongenitalAbnormalitiesResponse> getAllCongenitalAbnormalities() throws Exception {
        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(BigQueryUrlConstants.GET_BY_CONGENITAL_ABNORMALITIES).build();
        Job job = bigquery.create(JobInfo.newBuilder(queryJobConfiguration).build());
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        TableResult result = job.getQueryResults();
        List<CongenitalAbnormalitiesResponse> responses = new ArrayList<>();
        for (FieldValueList row: result.iterateAll()){
            responses.add(bitQueryMapper.mapToCongenitalAbnormalitiesResponse(row));
        }
        return responses;
    }

    @Override
    public CongenitalFiltersResponse getAllCongenitalFilters() throws Exception {
        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(BigQueryUrlConstants.GET_BY_CONGENITAL_ABNORMALITIES).build();
        Job job = bigquery.create((JobInfo.newBuilder(queryJobConfiguration).build()));
        job = job.waitFor();
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        TableResult result = job.getQueryResults();
        Integer noneChecked = 0;
        Integer atLeastOneChecked = 0;
        Integer unknownOrNotStated = 0;
        CongenitalFiltersResponse response = new CongenitalFiltersResponse();
        if(result != null){
            for(FieldValueList row: result.iterateAll()){
                log.info(row.toString());
                if (row.get("Congenital_Abnormality_Checked_Desc").getStringValue().equals("None checked")) {
                    noneChecked += Integer.parseInt(row.get("Congenital_Abnormality_Checked_YN").getStringValue());
                }
                if (row.get("Congenital_Abnormality_Checked_Desc").getStringValue().equals("At least one checked")) {
                    atLeastOneChecked += Integer.parseInt(row.get("Congenital_Abnormality_Checked_YN").getStringValue());
                }
                if (row.get("Congenital_Abnormality_Checked_Desc").getStringValue().equals("Unknown or Not Stated")) {
                    unknownOrNotStated += Integer.parseInt(row.get("Congenital_Abnormality_Checked_YN").getStringValue());
                }
            }
        }else {
            log.error("No hay resultados en la consulta de BigQuery.");
        }
        response.setNoneChecked(noneChecked);
        response.setAtLeastOneChecked(atLeastOneChecked);
        response.setUnknownOrNotStated(unknownOrNotStated);
        return response;
    }

    @Override
    public List<CountyByFatherRaceResponse> getAllByFatherRace() throws Exception {
        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(BigQueryUrlConstants.Get_BY_FATHER_RACE).build();
        Job job = bigquery.create(JobInfo.newBuilder(queryJobConfiguration).build());
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        TableResult result = job.getQueryResults();
        List<CountyByFatherRaceResponse> responses = new ArrayList<>();
        for(FieldValueList row: result.iterateAll()){
            responses.add(bitQueryMapper.mapToCountyByFatherRaceResponse(row));
        }
        log.info("Tamaño response = " + responses.size());
        return responses;
    }

    @Override
    public FatherRaceFiltersResponse getFatherRaceFilters() throws Exception {
        QueryJobConfiguration queryJobConfiguration = QueryJobConfiguration.newBuilder(BigQueryUrlConstants.Get_BY_FATHER_RACE).build();
        Job job = bigquery.create((JobInfo.newBuilder(queryJobConfiguration).build()));
        job = job.waitFor();
        if(job == null){
            throw new Exception("Job no longer exixts");
        }
        if(job.getStatus().getError() != null){
            throw new Exception(job.getStatus().getError().toString());
        }
        TableResult result = job.getQueryResults();
        Integer white = 0;
        Integer unknownOrNotStated = 0;
        Integer asian = 0;
        Integer moreThanOneRace = 0;
        Integer blackOrAfricanAmerican = 0;
        Integer americanIndianOrAlaskaNative = 0;
        Integer nativeHawaiianOrOtherPacificIslander = 0;
        FatherRaceFiltersResponse response = new FatherRaceFiltersResponse();
        if(result != null){
            for (FieldValueList row: result.iterateAll()){
                if (row.get("Fathers_Single_Race").getStringValue().equals("White")) {
                    white += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Fathers_Single_Race").getStringValue().equals("Unknown or Not Stated")) {
                    unknownOrNotStated += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Fathers_Single_Race").getStringValue().equals("Asian")) {
                    asian += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Fathers_Single_Race").getStringValue().equals("More than one race")) {
                    moreThanOneRace += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Fathers_Single_Race").getStringValue().equals("Black or African American")) {
                    blackOrAfricanAmerican += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Fathers_Single_Race").getStringValue().equals("American Indian or Alaska Native")) {
                    americanIndianOrAlaskaNative += Integer.parseInt(row.get("Births").getStringValue());
                }
                if (row.get("Fathers_Single_Race").getStringValue().equals("Native Hawaiian or Other Pacific Islander")) {
                    nativeHawaiianOrOtherPacificIslander += Integer.parseInt(row.get("Births").getStringValue());
                }
            }
        }else {
            log.error("No hay resultados en la consulta de BigQuery.");
        }
        response.setAsian(asian);
        response.setWhite(white);
        response.setAmericanIndianOrAlaskaNative(americanIndianOrAlaskaNative);
        response.setMoreThanOneRace(moreThanOneRace);
        response.setBlackOrAfricanAmerican(blackOrAfricanAmerican);
        response.setNativeHawaiianOrOtherPacificIslander(nativeHawaiianOrOtherPacificIslander);
        response.setUnknownOrNotStated(unknownOrNotStated);
        return response;
    }
}
