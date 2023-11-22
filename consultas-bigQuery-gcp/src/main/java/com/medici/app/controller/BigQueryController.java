package com.medici.app.controller;

import com.medici.app.dto.*;
import com.medici.app.service.BigQueryService;
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

    private final BigQueryService bigQueryService;
    private final com.medici.app.service.injectdependency.BigQueryService bigQueryServiceInterface;

    @GetMapping
    public ResponseEntity<?> getConsult() throws Exception {
        bigQueryService.getConsult();
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



}
