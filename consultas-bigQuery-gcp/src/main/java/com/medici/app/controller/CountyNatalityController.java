package com.medici.app.controller;

import com.medici.app.dto.CountyNatalityBaseResponse;
import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.dto.response.CountyNatalityResponseId;
import com.medici.app.service.injectdependency.CountyNatalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/countyNatality")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CountyNatalityController {

    private final CountyNatalityService countyNatalityService;

    @GetMapping("/{id}")
    public ResponseEntity<CountyNatalityResponseId> getByIdCountyNatality(@PathVariable Long id){
            CountyNatalityResponseId response = countyNatalityService.getById(id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
