package com.medici.app.controller;

import com.medici.app.dto.*;
import com.medici.app.dto.response.*;
import com.medici.app.service.BigQueryServiceImpl;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("data")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BigQueryController {

    private final BigQueryServiceImpl bigQueryServiceInterface;
    private final BigQueryService bigQueryService;


    @GetMapping
    public ResponseEntity<?> getConsult() throws Exception {
        bigQueryServiceInterface.getConsult();
        return ResponseEntity.status(HttpStatus.OK).body("respuesta correcta");
    }

    @GetMapping("/county-natality")
    public ResponseEntity<List<CountyNatalityResponse>> getCountyNatality() throws Exception {

        List<CountyNatalityResponse> responses = bigQueryServiceInterface.getConsultTable();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/residence-births")
    public ResponseEntity<List<CountyNatalityFilterResidenceAndBirths>> getCountyNatalityResidenceAndBirths() throws Exception {
        List<CountyNatalityFilterResidenceAndBirths> responses = bigQueryServiceInterface.getCountyNatalityResidenceAndBirths();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/abnormal-conditions")
    public ResponseEntity<List<AbnormalConditionsResponse>> getCountyNatalityByAbnormalConditions() throws Exception {
        List<AbnormalConditionsResponse> responses = bigQueryServiceInterface.getCountyNatalityByAbnormalConditions();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/abnormal/condition/filters")
    public ResponseEntity<List<AbnormalConditionsFilters>> abnormalConditionsFilters() throws Exception {
        List<AbnormalConditionsFilters> responses = bigQueryServiceInterface.bnormalConditionsFilters();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @PostMapping("/search")
    public ResponseEntity<List<CountyNatalitySearchResponse>> searchByYearAndResidence(@RequestBody CountyNatalitySearchRequest request) throws Exception {
        List<CountyNatalitySearchResponse> response = bigQueryServiceInterface.searchByYearAndResidence(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/year/births")
    public ResponseEntity<CountyNatalityFilterResponse> getAllByYearAndBirths() throws Exception {
        CountyNatalityFilterResponse response = bigQueryService.getAllByYearAndBirths();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/abnormal")
    public ResponseEntity<AbnormalFiltersResponse> getAllAbnormalNoCheckedUnknown() throws Exception {
        AbnormalFiltersResponse response = bigQueryService.getAllAbnormalNoCheckedUnknown();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/congenital")
    public ResponseEntity<List<CongenitalAbnormalitiesResponse>> getAllCongenitalAbnormalities() throws Exception {
        List<CongenitalAbnormalitiesResponse> responses = bigQueryService.getAllCongenitalAbnormalities();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/congenital/filters")
    public ResponseEntity<CongenitalFiltersResponse> getAllCongenitalFilters() throws Exception {
        CongenitalFiltersResponse response = bigQueryService.getAllCongenitalFilters();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/father/race")
    public ResponseEntity<List<CountyByFatherRaceResponse>> getAllByFatherRace() throws Exception {
        List<CountyByFatherRaceResponse> responses = bigQueryService.getAllByFatherRace();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/father/race/filters")
    public ResponseEntity<FatherRaceFiltersResponse> getFatherRaceFilters() throws Exception {
        FatherRaceFiltersResponse response = bigQueryService.getFatherRaceFilters();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }








}
