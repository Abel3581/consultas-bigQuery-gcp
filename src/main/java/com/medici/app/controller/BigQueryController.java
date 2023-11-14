package com.medici.app.controller;

import com.medici.app.dto.CountyNatalityFilterResidenceAndBirths;
import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.service.BigQueryService2;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("data")
@RequiredArgsConstructor
public class BigQueryController {

    private final BigQueryService2 bigQueryService;
    private final BigQueryService bigQueryServiceInterface;

    @GetMapping
    public ResponseEntity<?> getConsult() throws Exception {
        bigQueryService.getConsult();
        return ResponseEntity.status(HttpStatus.OK).body("respuesta correcta");
    }

    @GetMapping("/county-residence")
    public ResponseEntity<List<CountyNatalityResponse>> getConsultTable() throws Exception {

        List<CountyNatalityResponse> responses = bigQueryServiceInterface.getConsultTable();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/residence-births")
    public ResponseEntity<List<CountyNatalityFilterResidenceAndBirths>> getCountyNatalityResidenceAndBirths() throws Exception {
        List<CountyNatalityFilterResidenceAndBirths> responses = bigQueryServiceInterface.getCountyNatalityResidenceAndBirths();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }


}
