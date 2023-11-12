package com.medici.app.controller;

import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.service.BigQueryService2;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("bigquery")
@RequiredArgsConstructor
public class BigQueryController {

    private final BigQueryService2 bigQueryService;
    private final BigQueryService bigQueryServiceInterface;

    @GetMapping
    public ResponseEntity<?> getConsult() throws Exception {
        bigQueryService.getConsult();
        return ResponseEntity.status(HttpStatus.OK).body("respuesta correcta");
    }

    @GetMapping("/table")
    public ResponseEntity<List<CountyNatalityResponse>> getConsultTable() throws Exception {
        bigQueryService.getConsult();
        List<CountyNatalityResponse> responses = bigQueryServiceInterface.getConsultTable();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }


}
